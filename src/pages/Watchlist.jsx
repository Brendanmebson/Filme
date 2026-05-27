import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Badge, 
  Icon, 
  Center, 
  Link,
  HStack 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useWatchlist } from '../hooks/useWatchlist';
import MovieGrid from '../components/MovieGrid';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const clearWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      watchlist.forEach(movie => removeFromWatchlist(movie.id));
    }
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      pt="120px"
      pb="80px"
    >
      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        {/* Header */}
        <Flex
          as={motion.div}
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          align="flex-end"
          justify="space-between"
          mb={12}
          gap={4}
        >
          <HStack gap={4} align="flex-end">
            <Heading 
              as="h1" 
              fontSize={{ base: '3xl', md: '5xl' }} 
              fontWeight="black"
              color="white"
              letterSpacing="tight"
            >
              MY WATCHLIST
            </Heading>
            <Badge 
              bg="purple.600" 
              color="white" 
              px={3} 
              py={1} 
              rounded="full" 
              fontSize="sm"
              fontWeight="black"
              boxShadow="0 0 15px rgba(120, 100, 255, 0.4)"
            >
              {watchlist.length}
            </Badge>
          </HStack>

          {watchlist.length > 0 && (
            <Button
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearWatchlist}
              variant="outline"
              borderColor="red.500"
              color="red.500"
              rounded="full"
              fontSize="xs"
              fontWeight="black"
              letterSpacing="widest"
              px={6}
              _hover={{ bg: "red.500", color: "white" }}
            >
              CLEAR ALL
            </Button>
          )}
        </Flex>

        {/* Watchlist Content */}
        {watchlist.length === 0 ? (
          <Box
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            textAlign="center"
            py={24}
          >
            <Text fontSize="6xl" mb={4}>🎬</Text>
            <Heading size="lg" mb={4} color="white" fontWeight="black">Your watchlist is empty</Heading>
            <Text color="whiteAlpha.600" mb={8} fontSize="lg">
              Start adding movies to keep track of what you want to watch
            </Text>
            <Button
              as={RouterLink}
              to="/"
              bg="purple.600"
              color="white"
              size="xl"
              px={10}
              py={6}
              rounded="full"
              fontSize="sm"
              fontWeight="black"
              letterSpacing="widest"
              _hover={{ bg: "purple.700", boxShadow: "0 0 20px rgba(120, 100, 255, 0.5)" }}
            >
              BROWSE MOVIES
            </Button>
          </Box>
        ) : (
          <MovieGrid movies={watchlist} loading={false} />
        )}
      </Container>
    </Box>
  );
};

export default Watchlist;