import { 
  Box, 
  Flex, 
  HStack, 
  Text, 
  Input, 
  Icon,
  Circle,
  IconButton,
  Image
} from '@chakra-ui/react';
import { InputGroup } from './ui/input-group';
import { Avatar } from './ui/avatar';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from './ui/menu';
import { Search, Bell, Plus, Play, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const StreamingToolbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['DISCOVER', 'TRENDING', 'BEST SELECTIONS', 'NEWS FEED', 'WATCHLIST'];
  const streamingLogos = [
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'HBO', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg' },
    { name: 'Prime', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' },
  ];

  const handleTabClick = (tab) => {
    if (tab === 'DISCOVER') navigate('/');
    if (tab === 'TRENDING') navigate('/trending');
    if (tab === 'BEST SELECTIONS') navigate('/best-of-month');
    if (tab === 'WATCHLIST') navigate('/watchlist');
    if (tab === 'NEWS FEED') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('social-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Box
      w="100%"
      h="70px"
      bg="rgba(15, 15, 20, 0.4)"
      backdropFilter="blur(30px)"
      rounded="full"
      px={8}
      border="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)"
    >
      <Flex h="100%" align="center" justify="space-between">
        {/* Brand */}
        <HStack gap={3} mr={8} cursor="pointer" onClick={() => navigate('/')}>
          <Box
            w="30px"
            h="30px"
            bg="purple.600"
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 15px rgba(120, 100, 255, 0.5)"
          >
            <Image src="/src/assets/video-player.png" alt="Filme" w="18px" />
          </Box>
          <Text fontWeight="black" letterSpacing="widest" fontSize="md" color="white" textTransform="uppercase">
            Filme
          </Text>
        </HStack>

        {/* Tabs */}
        <HStack gap={10} display={{ base: 'none', lg: 'flex' }}>
          {tabs.map((tab) => (
            <Text
              key={tab}
              fontSize="xs"
              fontWeight="bold"
              color="whiteAlpha.600"
              cursor="pointer"
              transition="all 0.2s"
              onClick={() => handleTabClick(tab)}
              _hover={{ color: 'white' }}
              letterSpacing="widest"
            >
              {tab}
            </Text>
          ))}
        </HStack>

        {/* Search */}
        <InputGroup 
          flex="1" 
          maxW="300px" 
          mx={8} 
          display={{ base: 'none', md: 'block' }}
          startElement={<Search size={18} color="rgba(255,255,255,0.4)" />}
        >
          <Input
            bg="whiteAlpha.50"
            border="none"
            rounded="full"
            placeholder="Search..."
            _placeholder={{ color: 'whiteAlpha.400' }}
            color="white"
            fontSize="sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            _focus={{ bg: 'whiteAlpha.100', boxShadow: '0 0 0 1px rgba(120, 100, 255, 0.3)' }}
          />
        </InputGroup>

        {/* Icons & Profile */}
        <HStack gap={{ base: 2, md: 4 }}>
          {/* Mobile Hamburger Menu */}
          <Box display={{ base: 'block', lg: 'none' }} mr={2}>
            <MenuRoot>
              <MenuTrigger asChild>
                <IconButton variant="ghost" color="white" aria-label="Menu" rounded="full" _hover={{ bg: "whiteAlpha.200" }}>
                  <Menu size={20} />
                </IconButton>
              </MenuTrigger>
              <MenuContent bg="gray.900" color="white" borderColor="whiteAlpha.100" minW="200px" boxShadow="xl">
                <MenuItem value="movies" _hover={{ bg: "purple.600" }} onClick={() => handleTabClick('MOVIES/TV SHOWS')}>Movies/TV Shows</MenuItem>
                <MenuItem value="news" _hover={{ bg: "purple.600" }} onClick={() => handleTabClick('NEWS FEED')}>News Feed</MenuItem>
                <MenuItem value="watchlist" _hover={{ bg: "purple.600" }} onClick={() => handleTabClick('WATCHLIST')}>Watchlist</MenuItem>
                <MenuItem value="search" _hover={{ bg: "purple.600" }} onClick={() => navigate('/search')}>Search TMDB</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>

          {/* Service Shortcuts */}
          <HStack gap={2} mr={4} display={{ base: 'none', xl: 'flex' }}>
            {streamingLogos.map((service) => (
              <Box
                key={service.name}
                w="32px"
                h="32px"
                rounded="full"
                overflow="hidden"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-2px)', bg: 'whiteAlpha.200' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="6px"
              >
                <Image 
                  src={service.logo} 
                  alt={service.name} 
                  w="100%" 
                  h="100%" 
                  objectFit="contain"
                  transform={service.name === 'Prime' ? 'scale(1.4)' : 'none'}
                  filter={service.name === 'HBO' ? 'brightness(0) invert(1)' : 'none'}
                />
              </Box>
            ))}
            <IconButton
              aria-label="Add"
              size="xs"
              rounded="full"
              variant="outline"
              borderColor="whiteAlpha.300"
              icon={<Plus size={14} />}
            />
          </HStack>

          <IconButton
            aria-label="Notifications"
            variant="ghost"
            color="whiteAlpha.700"
            rounded="full"
            icon={<Bell size={20} />}
          />
          <Avatar 
            size="sm" 
            src="https://avatars.githubusercontent.com/u/47269112?v=4" 
            border="2px solid" 
            borderColor="orange.400"
            cursor="pointer"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default StreamingToolbar;
