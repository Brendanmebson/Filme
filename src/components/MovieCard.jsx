import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Eye } from 'lucide-react';
import { 
  Box, 
  Image, 
  Heading, 
  Text, 
  HStack, 
  Badge, 
  Icon, 
  VStack,
  Link
} from '@chakra-ui/react';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';
import WatchlistButton from './WatchlistButton';

const MovieCard = ({ movie, index = 0 }) => {
  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.poster}${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const releaseDate = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDate 
    ? new Date(releaseDate).getFullYear()
    : 'TBA';

  const title = movie.title || movie.name || '';
  const isTv = !movie.title && !!movie.name;

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.05 }}
      position="relative"
      rounded="2xl"
      overflow="hidden"
      cursor="pointer"
      role="group"
      bg="gray.900"
      boxShadow="0 10px 30px rgba(0,0,0,0.5)"
    >
      <Link as={RouterLink} to={isTv ? `/tv/${movie.id}` : `/movie/${movie.id}`} _hover={{ textDecoration: 'none' }}>
        {/* Poster */}
        <Box position="relative" aspectRatio={2/3}>
          <Image
            src={posterUrl}
            alt={title}
            width="full"
            height="full"
            objectFit="cover"
            transition="transform 0.5s"
            _groupHover={{ scale: 1.1 }}
            loading="lazy"
          />
          
          {/* Overlay */}
          <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-t, blackAlpha.800, transparent 60%)"
            transition="all 0.3s"
            opacity={0.8}
            _groupHover={{ opacity: 1 }}
          />

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <HStack 
              position="absolute"
              top={3}
              left={3}
              bg="blackAlpha.600"
              backdropFilter="blur(10px)"
              px={2}
              py={1}
              rounded="lg"
              gap={1}
              zIndex={2}
            >
              <Icon as={Star} boxSize={3} color="yellow.400" fill="yellow.400" />
              <Text fontSize="xs" fontWeight="black" color="white">
                {movie.vote_average.toFixed(1)}
              </Text>
            </HStack>
          )}

          {/* Watchlist Button Overlay */}
          <Box position="absolute" top={3} right={3} zIndex={5}>
            <WatchlistButton movie={movie} />
          </Box>
        </Box>

        {/* Content */}
        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={4}
          align="flex-start"
          gap={2}
          zIndex={2}
        >
          <Heading
            size="sm"
            color="white"
            noOfLines={1}
            fontWeight="black"
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
          >
            {title}
          </Heading>
          
          <HStack gap={2}>
            <Badge
              bg="whiteAlpha.100"
              color="whiteAlpha.800"
              variant="outline"
              borderColor="whiteAlpha.300"
              backdropFilter="blur(10px)"
              px={2}
              py={0.5}
              rounded="full"
              fontSize="10px"
              fontWeight="bold"
            >
              {releaseYear}
            </Badge>
            {movie.vote_count > 0 && (
              <Badge
                bg="whiteAlpha.100"
                color="whiteAlpha.800"
                variant="outline"
                borderColor="whiteAlpha.300"
                backdropFilter="blur(10px)"
                px={2}
                py={0.5}
                rounded="full"
                fontSize="10px"
                fontWeight="bold"
              >
                {movie.vote_count} votes
              </Badge>
            )}
          </HStack>
        </VStack>

        {/* Hover Glow */}
        <Box
          position="absolute"
          inset={0}
          border="1px solid transparent"
          rounded="2xl"
          transition="all 0.3s"
          _groupHover={{
            borderColor: "rgba(120, 100, 255, 0.4)",
            boxShadow: "inset 0 0 20px rgba(120, 100, 255, 0.1)"
          }}
        />
      </Link>
    </Box>
  );
};

export default MovieCard;