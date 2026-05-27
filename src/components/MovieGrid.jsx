import React from 'react';
import { SimpleGrid, Center, Heading, Text, VStack } from '@chakra-ui/react';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading }) => {
  if (loading) {
    return (
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
        {[...Array(20)].map((_, index) => (
          <VStack key={index} align="stretch" gap={4}>
            <Skeleton ratio={2/3} borderRadius="xl" />
            <VStack align="stretch" gap={2}>
              <Skeleton height="4" width="full" />
              <Skeleton height="3" width="2/3" />
              <Skeleton height="3" width="1/2" />
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    );
  }

  if (movies.length === 0) {
    return (
      <Center py={24} flexDirection="column">
        <Text fontSize="6xl" mb={6}>🎬</Text>
        <Heading size="lg" mb={4} color="white" fontWeight="black">No movies found</Heading>
        <Text color="whiteAlpha.500" fontSize="lg">Try adjusting your search or filters</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;