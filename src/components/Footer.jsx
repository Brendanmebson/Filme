import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Link, 
  Icon, 
  Circle,
  Image,
  SimpleGrid,
  Separator
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <Box bg="#050505" borderTop="1px solid" borderColor="whiteAlpha.100" pt={16} pb={8}>
      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={12} mb={16}>
          {/* Brand & Mission */}
          <VStack align="flex-start" gap={6}>
            <HStack gap={3}>
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
              <Heading fontSize="2xl" fontWeight="black" letterSpacing="tighter">
                Filme
              </Heading>
            </HStack>
            <Text color="whiteAlpha.600" fontSize="sm" lineHeight="relaxed">
              Experience cinema like never before. Filme brings you the most immersive movie discovery platform with premium aesthetics and high-fidelity trailers.
            </Text>
            <HStack gap={4}>
              {[Facebook, Twitter, Instagram, Youtube].map((Social, i) => (
                <Link key={i} href="#" _hover={{ color: 'purple.400', transform: 'translateY(-2px)' }} transition="all 0.2s">
                  <Icon as={Social} boxSize={5} />
                </Link>
              ))}
            </HStack>
          </VStack>

          {/* Quick Links */}
          <VStack align="flex-start" gap={4}>
            <Heading fontSize="sm" fontWeight="black" letterSpacing="widest" color="purple.500">EXPLORE</Heading>
            <VStack align="flex-start" gap={2}>
              <Link as={RouterLink} to="/" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Movies</Link>
              <Link as={RouterLink} to="/trending" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Trending</Link>
              <Link as={RouterLink} to="/watchlist" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>My Watchlist</Link>
              <Link as={RouterLink} to="/search" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Advanced Search</Link>
            </VStack>
          </VStack>

          {/* Support */}
          <VStack align="flex-start" gap={4}>
            <Heading fontSize="sm" fontWeight="black" letterSpacing="widest" color="purple.500">SUPPORT</Heading>
            <VStack align="flex-start" gap={2}>
              <Link as={RouterLink} to="/help" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Help Center</Link>
              <Link as={RouterLink} to="/terms" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Terms of Service</Link>
              <Link as={RouterLink} to="/privacy" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Privacy Policy</Link>
              <Link as={RouterLink} to="/cookies" fontSize="sm" color="whiteAlpha.700" _hover={{ color: 'white' }}>Cookie Settings</Link>
            </VStack>
          </VStack>

          {/* Contact */}
          <VStack align="flex-start" gap={4}>
            <Heading fontSize="sm" fontWeight="black" letterSpacing="widest" color="purple.500">CONTACT</Heading>
            <VStack align="flex-start" gap={4}>
              <HStack gap={3}>
                <Icon as={MapPin} boxSize={4} color="purple.400" />
                <Text fontSize="sm" color="whiteAlpha.700">123 Cinema Plaza, Hollywood, CA</Text>
              </HStack>
              <HStack gap={3}>
                <Icon as={Mail} boxSize={4} color="purple.400" />
                <Text fontSize="sm" color="whiteAlpha.700">hello@filme.com</Text>
              </HStack>
              <HStack gap={3}>
                <Icon as={Phone} boxSize={4} color="purple.400" />
                <Text fontSize="sm" color="whiteAlpha.700">+1 (555) 000-filme</Text>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Separator borderColor="whiteAlpha.100" mb={8} />

        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" gap={4}>
          <Text fontSize="xs" color="whiteAlpha.400">
            &copy; {new Date().getFullYear()} Filme Premium OTT. All rights reserved.
          </Text>
          <HStack gap={6}>
            <Text fontSize="xs" color="whiteAlpha.400" cursor="pointer" _hover={{ color: 'white' }}>English</Text>
            <Text fontSize="xs" color="whiteAlpha.400" cursor="pointer" _hover={{ color: 'white' }}>Status</Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
