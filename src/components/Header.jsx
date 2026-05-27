import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Home, Bookmark, Search } from 'lucide-react';
import { 
  Box, 
  Flex, 
  HStack, 
  Link, 
  IconButton, 
  Container, 
  Text,
  Icon,
  Heading,
  Image
} from '@chakra-ui/react';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from './ui/menu';
import { Menu } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      as={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      bg="rgba(10, 10, 15, 0.7)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      position="sticky"
      top="0"
      zIndex="50"
      py={3}
    >
      <Container maxW="container.2xl">
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <Link 
            as={RouterLink} 
            to="/" 
            _hover={{ textDecoration: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Box 
              w="32px" 
              h="32px" 
              bg="purple.600" 
              rounded="lg" 
              p={1.5}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 20px rgba(120, 100, 255, 0.4)"
            >
              <Image src="/src/assets/video-player.png" alt="Filme" />
            </Box>
            <Heading
              fontSize="2xl"
              fontWeight="black"
              letterSpacing="tighter"
              color="white"
            >
              Filme
            </Heading>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <Box display={{ base: 'none', md: 'block' }} flex="1" maxW="md" mx={8}>
            <SearchBar />
          </Box>

          {/* Navigation - Hidden on Mobile */}
          <HStack gap={6} display={{ base: 'none', lg: 'flex' }}>
            <Link
              as={RouterLink}
              to="/"
              px={4}
              py={2}
              rounded="full"
              fontSize="xs"
              fontWeight="black"
              letterSpacing="widest"
              bg={isActive('/') ? 'purple.600' : 'transparent'}
              color="white"
              boxShadow={isActive('/') ? '0 0 15px rgba(120, 100, 255, 0.4)' : 'none'}
              _hover={{ 
                bg: isActive('/') ? 'purple.700' : 'whiteAlpha.100',
                textDecoration: 'none'
              }}
            >
              HOME
            </Link>
            
            <Link
              as={RouterLink}
              to="/watchlist"
              px={4}
              py={2}
              rounded="full"
              fontSize="xs"
              fontWeight="black"
              letterSpacing="widest"
              bg={isActive('/watchlist') ? 'purple.600' : 'transparent'}
              color="white"
              boxShadow={isActive('/watchlist') ? '0 0 15px rgba(120, 100, 255, 0.4)' : 'none'}
              _hover={{ 
                bg: isActive('/watchlist') ? 'purple.700' : 'whiteAlpha.100',
                textDecoration: 'none'
              }}
            >
              WATCHLIST
            </Link>

            {/* Mobile Search Button */}
            <IconButton 
              display={{ base: 'flex', md: 'none' }}
              aria-label="Search"
              variant="ghost"
              color="gray.300"
              _hover={{ color: 'white', bg: 'gray.800' }}
              onClick={() => navigate('/search')}
              icon={<Search />}
            />
          </HStack>

          {/* Mobile Hamburger Menu */}
          <Box display={{ base: 'block', lg: 'none' }}>
            <MenuRoot>
              <MenuTrigger asChild>
                <IconButton variant="ghost" color="white" aria-label="Menu" rounded="full" _hover={{ bg: "whiteAlpha.200" }}>
                  <Menu />
                </IconButton>
              </MenuTrigger>
              <MenuContent bg="gray.900" color="white" borderColor="whiteAlpha.100" minW="200px" boxShadow="xl">
                <MenuItem value="home" _hover={{ bg: "purple.600" }} onClick={() => navigate('/')}>Home</MenuItem>
                <MenuItem value="trending" _hover={{ bg: "purple.600" }} onClick={() => navigate('/trending')}>Trending</MenuItem>
                <MenuItem value="watchlist" _hover={{ bg: "purple.600" }} onClick={() => navigate('/watchlist')}>Watchlist</MenuItem>
                <MenuItem value="search" _hover={{ bg: "purple.600" }} onClick={() => navigate('/search')}>Search Movies</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </Flex>

        {/* Mobile Search Bar */}
        <Box display={{ base: 'block', md: 'none' }} mt={4}>
          <SearchBar />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;