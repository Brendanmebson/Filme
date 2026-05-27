import React, { useState } from 'react';
import { Box, Container, Heading, Center, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Recommended = () => {
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useMovies('top_rated', page);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (error && page === 1) {
    return (
      <Center h="100vh" bg="black" flexDirection="column">
        <Heading size="lg" color="red.500" mb={4}>Error</Heading>
        <Text color="gray.400">{error}</Text>
      </Center>
    );
  }

  return (
    <Box pt="120px" pb="80px" minH="100vh">
      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        <Heading 
          color="white" 
          mb={12} 
          fontSize={{ base: "3xl", md: "5xl" }} 
          fontWeight="black"
          letterSpacing="tight"
        >
          RECOMMENDED FOR YOU
        </Heading>
        
        <MovieGrid movies={movies} loading={loading && page === 1} />

        {!loading && movies.length > 0 && page < totalPages && (
          <Center mt={24}>
            <Button
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              size="xl"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              rounded="full"
              px={12}
              py={8}
              fontSize="sm"
              fontWeight="black"
              letterSpacing="widest"
              _hover={{ bg: "purple.600", borderColor: "purple.500", boxShadow: "0 0 20px rgba(120, 100, 255, 0.4)" }}
            >
              LOAD MORE
            </Button>
          </Center>
        )}

        {loading && page > 1 && <LoadingSpinner />}
      </Container>
    </Box>
  );
};

export default Recommended;
