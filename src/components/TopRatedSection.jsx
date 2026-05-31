import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  Flex,
  Image,
  VStack,
  Icon,
  Button,
  Badge,
  Link
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, ChevronRight, Play } from 'lucide-react';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

const TopRatedCard = ({ movie, index }) => {
  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` 
    : '';
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}/w780${movie.backdrop_path}`
    : '';

  const releaseDate = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'TBA';
  const title = movie.title || movie.name || '';
  const isTv = !movie.title && !!movie.name;

  return (
    <Link as={RouterLink} to={isTv ? `/tv/${movie.id}` : `/movie/${movie.id}`} _hover={{ textDecoration: 'none' }}>
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -8 }}
        position="relative"
        rounded="2xl"
        overflow="hidden"
        cursor="pointer"
        role="group"
        h="280px"
        minW={{ base: '300px', md: '400px' }}
        bg="gray.900"
        border="1px solid"
        borderColor="whiteAlpha.100"
        boxShadow="0 10px 40px rgba(0,0,0,0.4)"
      >
        {/* Background */}
        <Image
          src={backdropUrl || posterUrl}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          position="absolute"
          inset={0}
          transition="transform 0.6s"
          _groupHover={{ transform: 'scale(1.1)' }}
        />

        {/* Overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, blackAlpha.900 20%, blackAlpha.600 50%, blackAlpha.300)"
        />

        {/* Rank Number */}
        <Text
          position="absolute"
          top={4}
          left={5}
          fontSize="5xl"
          fontWeight="black"
          color="whiteAlpha.200"
          lineHeight={1}
          letterSpacing="tighter"
        >
          #{index + 1}
        </Text>

        {/* Rating Badge */}
        <HStack
          position="absolute"
          top={4}
          right={4}
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
          px={3}
          py={1.5}
          rounded="full"
          gap={1.5}
        >
          <Icon as={Star} boxSize={3.5} color="yellow.400" fill="yellow.400" />
          <Text fontSize="sm" fontWeight="black" color="white">
            {movie.vote_average?.toFixed(1)}
          </Text>
        </HStack>

        {/* Content */}
        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={5}
          align="flex-start"
          gap={2}
        >
          <Heading
            fontSize="lg"
            fontWeight="black"
            color="white"
            noOfLines={1}
            textShadow="0 2px 8px rgba(0,0,0,0.5)"
          >
            {title}
          </Heading>

          <HStack gap={3}>
            <Badge
              bg="purple.600"
              color="white"
              px={2}
              py={0.5}
              rounded="full"
              fontSize="2xs"
              fontWeight="black"
            >
              {releaseYear}
            </Badge>
            <Text color="whiteAlpha.600" fontSize="xs" fontWeight="bold">
              {movie.vote_count?.toLocaleString()} votes
            </Text>
          </HStack>
        </VStack>

        {/* Hover Play */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="all 0.3s"
        >
          <Box
            as={motion.div}
            whileHover={{ scale: 1.1 }}
            bg="purple.600"
            rounded="full"
            w="48px"
            h="48px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 30px rgba(120, 100, 255, 0.5)"
          >
            <Icon as={Play} boxSize={5} fill="white" color="white" ml="2px" />
          </Box>
        </Box>

        {/* Hover Glow */}
        <Box
          position="absolute"
          inset={0}
          border="1px solid transparent"
          rounded="2xl"
          transition="all 0.3s"
          _groupHover={{
            borderColor: "rgba(120, 100, 255, 0.4)",
            boxShadow: "inset 0 0 30px rgba(120, 100, 255, 0.08)"
          }}
        />
      </Box>
    </Link>
  );
};

const TopRatedSection = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  const topMovies = movies.slice(0, 10);

  return (
    <Box py={24} position="relative" overflow="hidden">
      {/* Background Glow */}
      <Box
        position="absolute"
        bottom="-20%"
        left="30%"
        w="500px"
        h="500px"
        bg="purple.600"
        filter="blur(200px)"
        opacity={0.04}
        pointerEvents="none"
      />

      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        <Flex justify="space-between" align="center" mb={10}>
          <HStack gap={4}>
            <Icon as={TrendingUp} boxSize={6} color="purple.400" />
            <Heading
              fontSize="3xl"
              fontWeight="black"
              color="white"
              letterSpacing="tight"
            >
              TOP RATED THIS WEEK
            </Heading>
          </HStack>
          <Button
            as={RouterLink}
            to="/trending"
            variant="link"
            color="purple.400"
            fontWeight="black"
            fontSize="sm"
            letterSpacing="widest"
            rightIcon={<ChevronRight size={16} />}
            _hover={{ color: 'purple.300' }}
          >
            SEE ALL
          </Button>
        </Flex>

        {/* Horizontal Scroll */}
        <Box
          overflowX="auto"
          mx={-6}
          px={6}
          pb={4}
          css={{
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(120, 100, 255, 0.3)', borderRadius: '10px' },
          }}
        >
          <HStack gap={6} align="stretch" w="max-content">
            {topMovies.map((movie, i) => (
              <TopRatedCard key={movie.id} movie={movie} index={i} />
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedSection;
