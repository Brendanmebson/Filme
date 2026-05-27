import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Button, 
  Center 
} from '@chakra-ui/react';
import { useMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import CinematicHero from '../components/CinematicHero';
import RecommendedSection from '../components/RecommendedSection';
import SocialDashboard from '../components/SocialDashboard';
import TopRatedSection from '../components/TopRatedSection';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useMovies(activeCategory, page);
  const { movies: recommendedRaw } = useMovies('top_rated', 1);

  const recommendedMovies = recommendedRaw.map(m => ({
    id: m.id,
    title: m.title,
    poster: `${TMDB_IMAGE_BASE_URL}/w500${m.poster_path}`,
    year: new Date(m.release_date).getFullYear(),
    rating: m.vote_average.toFixed(1),
  }));

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Center flexDirection="column">
          <Heading size="lg" color="red.500" mb={4}>Error</Heading>
          <Text color="gray.400">{error}</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      pb={8}
    >
      {/* Cinematic Hero Section */}
      <CinematicHero />

      {/* Premium Recommended Carousel */}
      <RecommendedSection movies={recommendedMovies} />

      {/* Discover Movies */}
      <Box position="relative">
        <Container maxW="container.2xl" px={{ base: 6, md: 12 }} pt={12}>
          <Heading
            as="h3"
            fontSize="3xl"
            fontWeight="black"
            color="white"
            mb={10}
            letterSpacing="tight"
          >
            DISCOVER MOVIES
          </Heading>

          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

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
                LOAD MORE MOVIES
              </Button>
            </Center>
          )}

          {loading && page > 1 && <LoadingSpinner />}
        </Container>
      </Box>

      {/* Social Dashboard */}
      <SocialDashboard />

      {/* Top Rated This Week */}
      <TopRatedSection movies={recommendedRaw} />
    </Box>
  );
};

export default Home;