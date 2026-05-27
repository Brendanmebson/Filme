import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
import MovieGrid from '../components/MovieGrid';
import { tmdbApi } from '../services/tmdbApi';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await tmdbApi.getTrendingMovies();
        setMovies(res.data.results);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) {
    return (
      <Center h="100vh" bg="black">
        <Spinner color="white" size="xl" />
      </Center>
    );
  }

  return (
    <Box pt="120px" pb="80px">
      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        <Heading 
          color="white" 
          mb={12} 
          fontSize={{ base: "3xl", md: "5xl" }} 
          fontWeight="black"
          letterSpacing="tight"
        >
          TRENDING NOW
        </Heading>
        <MovieGrid movies={movies} loading={loading} />
      </Container>
    </Box>
  );
};

export default Trending;
