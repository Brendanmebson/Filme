import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Center, 
  VStack, 
  Button 
} from '@chakra-ui/react';
import { useSearchMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useSearchMovies(query, page);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
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
        {/* Search Header */}
        <VStack mb={12} gap={8} align="flex-start">
          <Heading 
            as="h1" 
            fontSize={{ base: '3xl', md: '5xl' }} 
            fontWeight="black"
            color="white"
            letterSpacing="tight"
          >
            SEARCH MOVIES
          </Heading>
          <Box width="full" maxW="lg">
            <SearchBar />
          </Box>
        </VStack>

        {/* Search Results */}
        {query && (
          <Box mb={8}>
            <Text color="whiteAlpha.600" fontSize="lg" fontWeight="medium">
              {loading && page === 1 ? (
                'Searching...'
              ) : (
                <>
                  {movies.length > 0 
                    ? `Found ${movies.length} result${movies.length !== 1 ? 's' : ''} for "${query}"`
                    : `No results found for "${query}"`
                  }
                </>
              )}
            </Text>
          </Box>
        )}

        {error && (
          <Center flexDirection="column" py={20}>
            <Heading size="lg" color="red.500" mb={4}>Error</Heading>
            <Text color="whiteAlpha.600">{error}</Text>
          </Center>
        )}

        {!query && !loading && (
          <Center py={24} flexDirection="column">
            <Text fontSize="6xl" mb={4}>🔍</Text>
            <Heading size="lg" mb={4} color="white" fontWeight="black">Start searching</Heading>
            <Text color="whiteAlpha.600" fontSize="lg">Enter a movie title to get started</Text>
          </Center>
        )}

        {query && <MovieGrid movies={movies} loading={loading && page === 1} />}

        {/* Load More Button */}
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
              LOAD MORE RESULTS
            </Button>
          </Center>
        )}

        {/* Loading More */}
        {loading && page > 1 && <LoadingSpinner />}
      </Container>
    </Box>
  );
};

export default Search;