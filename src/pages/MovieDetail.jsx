import React from 'react';
import { useParams, Navigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, Globe, Play, Users } from 'lucide-react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Badge,
  HStack,
  VStack,
  Icon,
  Button,
  Link,
  SimpleGrid,
  Circle
} from '@chakra-ui/react';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';
import WatchlistButton from '../components/WatchlistButton';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieCard from '../components/MovieCard';

const MovieDetail = () => {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetail(id);

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <LoadingSpinner size="lg" />
      </Box>
    );
  }

  if (error || !movie) {
    return <Navigate to="/" replace />;
  }

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.poster}${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';

  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const director = movie.credits?.crew?.find(c => c.job === 'Director');
  const writers = movie.credits?.crew?.filter(c => ['Writer', 'Screenplay', 'Author'].includes(c.job)).slice(0, 3);
  const producers = movie.credits?.crew?.filter(c => c.job === 'Producer').slice(0, 3);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      minH="100vh"
      pb={20}
    >
      {/* Hero Section */}
      <Box mt={0} position="relative" minH={{ base: "auto", lg: "90vh" }} overflow="hidden">
        {/* Background Backdrop */}
        {backdropUrl && (
          <Box
            position="absolute"
            inset="0"
            bgImage={`url(${backdropUrl})`}
            bgSize="cover"
            bgPos="center"
            filter="brightness(0.4) saturate(1.2)"
            _after={{
              content: '""',
              position: 'absolute',
              inset: 0,
              bgGradient: 'linear(to-t, #050505 10%, transparent, rgba(0,0,0,0.5) 100%)',
            }}
          />
        )}

        {/* Floating Glass Content Container */}
        <Container position="relative" maxW="container.2xl" minH="100%" px={{ base: 6, md: 12 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            minH={{ base: 'auto', lg: '90vh' }}
            align={{ base: 'center', lg: 'flex-end' }}
            pb={{ base: 12, lg: 24 }}
            pt={{ base: 32, lg: 32 }}
            gap={12}
          >
            {/* Poster */}
            <Box
              as={motion.div}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              w={{ base: '260px', lg: '340px' }}
              flexShrink="0"
              rounded="3xl"
              overflow="hidden"
              boxShadow="0 30px 60px rgba(0,0,0,0.8)"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Image src={posterUrl} alt={movie.title} w="100%" />
            </Box>

            {/* Movie Info Glass Panel */}
            <VStack
              as={motion.div}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              align="flex-start"
              gap={6}
              flex="1"
              bg="rgba(255,255,255,0.03)"
              backdropFilter="blur(30px)"
              p={{ base: 6, md: 10 }}
              rounded="4xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              boxShadow="0 20px 50px rgba(0,0,0,0.3)"
            >
              <VStack align="flex-start" gap={3} w="100%">
                <Flex w="100%" justify="space-between" align="center">
                  <HStack gap={4}>
                    {movie.genres?.slice(0, 3).map((genre) => (
                      <Badge
                        key={genre.id}
                        bg="purple.600"
                        color="white"
                        px={3}
                        py={1}
                        rounded="full"
                        fontSize="2xs"
                        fontWeight="black"
                        letterSpacing="widest"
                      >
                        {genre.name.toUpperCase()}
                      </Badge>
                    ))}
                    {movie.status && (
                      <Badge bg="whiteAlpha.200" color="white" px={3} py={1} rounded="full" fontSize="2xs" fontWeight="black">
                        {movie.status.toUpperCase()}
                      </Badge>
                    )}
                  </HStack>
                  <WatchlistButton movie={movie} />
                </Flex>

                <Heading
                  as="h1"
                  fontSize={{ base: '3xl', md: '5xl', xl: '6xl' }}
                  fontWeight="black"
                  color="white"
                  lineHeight="1.1"
                  letterSpacing="tighter"
                >
                  {movie.title.toUpperCase()}
                </Heading>

                {movie.tagline && (
                  <Text fontSize="lg" color="whiteAlpha.600" fontWeight="medium" fontStyle="italic">
                    "{movie.tagline}"
                  </Text>
                )}
              </VStack>

              <HStack gap={8} wrap="wrap">
                <HStack gap={2}>
                  <Icon as={Star} boxSize={5} color="yellow.400" fill="yellow.400" />
                  <Text fontWeight="black" fontSize="xl">{movie.vote_average.toFixed(1)}</Text>
                  <Text color="whiteAlpha.500" fontSize="sm">({movie.vote_count} VOTES)</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Clock} boxSize={5} color="whiteAlpha.600" />
                  <Text fontWeight="bold">{runtime}</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Calendar} boxSize={5} color="whiteAlpha.600" />
                  <Text fontWeight="bold">{releaseYear}</Text>
                </HStack>
              </HStack>

              <Text color="whiteAlpha.800" fontSize="md" lineHeight="relaxed" noOfLines={4} maxW="800px">
                {movie.overview}
              </Text>

              <HStack gap={10} py={2}>
                {director && (
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={1}>DIRECTOR</Text>
                    <Text fontWeight="bold" color="white">{director.name}</Text>
                  </Box>
                )}
                {writers?.length > 0 && (
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={1}>WRITERS</Text>
                    <Text fontWeight="bold" color="white">{writers.map(w => w.name).join(', ')}</Text>
                  </Box>
                )}
              </HStack>

              <HStack gap={4}>
                {trailer && (
                  <Button
                    as="a"
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="white"
                    color="black"
                    size="xl"
                    px={10}
                    py={6}
                    rounded="full"
                    fontSize="sm"
                    fontWeight="black"
                    letterSpacing="widest"
                    leftIcon={<Icon as={Play} fill="black" boxSize={4} />}
                    _hover={{ bg: "whiteAlpha.800", transform: "scale(1.05)" }}
                    transition="all 0.3s"
                  >
                    WATCH TRAILER
                  </Button>
                )}
                {movie.homepage && (
                  <Button
                    as="a"
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    size="xl"
                    px={10}
                    py={6}
                    rounded="full"
                    fontSize="sm"
                    fontWeight="black"
                    letterSpacing="widest"
                    _hover={{ bg: "whiteAlpha.100", transform: "scale(1.05)" }}
                    transition="all 0.3s"
                  >
                    WEBSITE
                  </Button>
                )}
              </HStack>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* Additional Details */}
      <Container maxW="container.2xl" px={{ base: 6, md: 12 }} py={24}>
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={16}>
          <Box>
            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <Box
                as={motion.div}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                mb={24}
              >
                <Heading size="xl" mb={10} color="white" fontWeight="black" letterSpacing="tight">TOP CAST</Heading>
                <SimpleGrid columns={{ base: 2, md: 4, xl: 6 }} gap={6}>
                  {movie.credits.cast.slice(0, 6).map((actor) => (
                    <Box
                      key={actor.id}
                      p={4}
                      textAlign="center"
                      bg="rgba(255,255,255,0.03)"
                      rounded="2xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      transition="all 0.3s"
                      _hover={{ bg: "whiteAlpha.100", transform: "translateY(-5px)" }}
                    >
                      {actor.profile_path ? (
                        <Image
                          src={`${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.profile}${actor.profile_path}`}
                          alt={actor.name}
                          boxSize="80px"
                          borderRadius="full"
                          mx="auto"
                          mb={4}
                          objectFit="cover"
                          border="2px solid"
                          borderColor="purple.500"
                        />
                      ) : (
                        <Circle size="80px" bg="gray.800" mx="auto" mb={4}>
                          <Icon as={Users} color="gray.500" />
                        </Circle>
                      )}
                      <Text fontWeight="black" fontSize="sm" color="white" mb={1} noOfLines={1}>{actor.name}</Text>
                      <Text fontSize="xs" color="whiteAlpha.500" noOfLines={1}>{actor.character}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}

            {/* Media Gallery */}
            {movie.images?.backdrops?.length > 0 && (
              <Box
                as={motion.div}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                mb={24}
              >
                <Heading size="xl" mb={10} color="white" fontWeight="black" letterSpacing="tight">MEDIA GALLERY</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                  {movie.images.backdrops.slice(0, 6).map((img, idx) => (
                    <Box
                      key={idx}
                      rounded="2xl"
                      overflow="hidden"
                      boxShadow="xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      cursor="pointer"
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.02)" }}
                    >
                      <Image src={`${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${img.file_path}`} w="100%" h="200px" objectFit="cover" />
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}

            {/* User Reviews */}
            {movie.reviews?.results?.length > 0 && (
              <Box
                as={motion.div}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Heading size="xl" mb={10} color="white" fontWeight="black" letterSpacing="tight">USER REVIEWS</Heading>
                <VStack align="stretch" gap={6}>
                  {movie.reviews.results.slice(0, 3).map((review) => (
                    <Box
                      key={review.id}
                      p={8}
                      bg="rgba(255,255,255,0.02)"
                      rounded="3xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                    >
                      <HStack justify="space-between" mb={4}>
                        <HStack gap={3}>
                          <Circle size="40px" bg="purple.600" color="white" fontWeight="black">
                            {review.author[0].toUpperCase()}
                          </Circle>
                          <VStack align="flex-start" gap={0}>
                            <Text fontWeight="black" color="white">{review.author}</Text>
                            <Text fontSize="xs" color="whiteAlpha.500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </Text>
                          </VStack>
                        </HStack>
                        {review.author_details?.rating && (
                          <Badge bg="yellow.400" color="black" px={3} py={1} rounded="full" fontWeight="black">
                            {review.author_details.rating}/10
                          </Badge>
                        )}
                      </HStack>
                      <Text color="whiteAlpha.800" fontSize="sm" lineHeight="relaxed" noOfLines={6}>
                        {review.content}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>

          {/* Sidebar Stats */}
          <GridItem
            as={motion.div}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VStack align="stretch" gap={10}>
              <Box>
                <Heading size="md" mb={8} color="white" fontWeight="black" letterSpacing="widest">PRODUCTION</Heading>
                <VStack
                  align="stretch"
                  gap={6}
                  p={8}
                  bg="rgba(255,255,255,0.02)"
                  rounded="2xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={1}>BUDGET</Text>
                    <Text color="white" fontWeight="bold">{movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}</Text>
                  </Box>
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={1}>REVENUE</Text>
                    <Text color="white" fontWeight="bold">{movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}</Text>
                  </Box>
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={2}>STUDIOS</Text>
                    <VStack align="flex-start" gap={2}>
                      {movie.production_companies?.slice(0, 3).map((company) => (
                        <Text key={company.id} color="white" fontSize="sm" fontWeight="medium">{company.name}</Text>
                      ))}
                    </VStack>
                  </Box>
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={2}>COUNTRIES</Text>
                    <Text color="white" fontSize="sm" fontWeight="medium">
                      {movie.production_countries?.map(c => c.name).join(', ') || 'N/A'}
                    </Text>
                  </Box>
                  <Box>
                    <Text color="whiteAlpha.500" fontSize="xs" fontWeight="black" mb={2}>LANGUAGES</Text>
                    <Text color="white" fontSize="sm" fontWeight="medium">
                      {movie.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A'}
                    </Text>
                  </Box>
                </VStack>
              </Box>

              {producers?.length > 0 && (
                <Box>
                  <Heading size="sm" mb={6} color="white" fontWeight="black" letterSpacing="widest">PRODUCERS</Heading>
                  <VStack align="flex-start" gap={4}>
                    {producers.map(p => (
                      <Box key={p.id}>
                        <Text color="white" fontWeight="bold" fontSize="sm">{p.name}</Text>
                        <Text color="whiteAlpha.500" fontSize="xs">{p.job}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>

        {/* Similar Movies */}
        {(movie.recommendations?.results?.length > 0 || movie.similar?.results?.length > 0) && (
          <Box
            as={motion.div}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            mt={32}
          >
            <Heading size="xl" mb={12} color="white" fontWeight="black" letterSpacing="tight">RECOMMENDED FOR YOU</Heading>
            <MovieGrid
              movies={(movie.recommendations?.results || movie.similar?.results).slice(0, 10)}
              loading={false}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetail;
