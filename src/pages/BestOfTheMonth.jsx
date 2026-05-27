import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Flex,
  Badge,
  Icon,
  Link,
  SimpleGrid,
  Circle,
  Center,
  Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Star, Calendar, ArrowRight, TrendingUp, Award } from 'lucide-react';
import { useMonthlyBest } from '../hooks/useMonthlyBest';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';
import { Link as RouterLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const TomatoRating = ({ rating }) => {
  // Simulate Rotten Tomatoes score based on TMDB rating
  const tomatoScore = Math.min(100, Math.round(rating * 10 + (Math.random() * 10 - 5)));
  const isFresh = tomatoScore >= 60;

  return (
    <HStack gap={1.5} bg="blackAlpha.600" backdropFilter="blur(10px)" px={3} py={1} rounded="full" border="1px solid" borderColor="whiteAlpha.100">
      <Box
        as="span"
        fontSize="lg"
        filter={isFresh ? "drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))" : "grayscale(1)"}
      >
        {isFresh ? '🍅' : '🤢'}
      </Box>
      <Text fontSize="sm" fontWeight="black" color="white">{tomatoScore}%</Text>
    </HStack>
  );
};

const MonthSection = ({ monthData, index }) => {
  const { monthName, year, movie, tv } = monthData;

  return (
    <Box position="relative" mb={32}>
      {/* Timeline Marker */}
      <VStack position="absolute" left={{ base: "-20px", md: "-40px" }} top={0} h="100%" gap={0}>
        <Circle size="12px" bg="purple.500" boxShadow="0 0 15px rgba(120, 100, 255, 0.8)" zIndex={2} />
        <Box w="2px" flex={1} bgGradient="linear(to-b, purple.500, transparent)" opacity={0.3} />
      </VStack>

      <VStack align="flex-start" gap={8} pl={{ base: 4, md: 8 }}>
        <HStack gap={4}>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="black"
            color="white"
            letterSpacing="tighter"
            textTransform="uppercase"
          >
            {monthName}
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color="whiteAlpha.400" pt={2}>{year}</Text>
        </HStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} w="100%">
          {/* Best Movie */}
          {movie && (
            <VStack align="flex-start" gap={4}>
              <HStack color="purple.400" gap={2}>
                <Icon as={Award} size={20} />
                <Text fontWeight="black" letterSpacing="widest" fontSize="xs">BEST MOVIE</Text>
              </HStack>
              <Link 
                as={RouterLink} 
                to={`/movie/${movie.id}`} 
                w="100%"
                display="block"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  role="group"
                  as={motion.div}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                  position="relative"
                  w="100%"
                  h="400px"
                  rounded="3xl"
                  overflow="hidden"
                  boxShadow="0 20px 50px rgba(0,0,0,0.6)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Image
                    src={`${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${movie.backdrop_path}`}
                    w="100%" h="100%" objectFit="cover"
                  />
                  <Box position="absolute" inset={0} bgGradient="linear(to-t, black, transparent 60%)" opacity={0.6} />

                  <Flex
                    position="absolute"
                    bottom={0}
                    left={0}
                    p={8}
                    direction="column"
                    gap={3}
                    w="100%"
                    bg="blackAlpha.600"
                    backdropFilter="blur(20px)"
                    transition="all 0.4s ease-in-out"
                    transform="translateY(80px)"
                    _groupHover={{ 
                      transform: "translateY(0)",
                      height: "100%",
                      justifyContent: "center",
                      bg: "blackAlpha.800"
                    }}
                  >
                    <HStack gap={3}>
                      <TomatoRating rating={movie.vote_average} />
                      <HStack bg="whiteAlpha.100" backdropFilter="blur(10px)" px={3} py={1} rounded="full" border="1px solid" borderColor="whiteAlpha.100">
                        <Icon as={Star} size={14} color="yellow.400" fill="yellow.400" />
                        <Text fontSize="sm" fontWeight="black" color="white">{movie.vote_average.toFixed(1)}</Text>
                      </HStack>
                    </HStack>

                    <Heading size="xl" color="white" fontWeight="black" noOfLines={1}>{movie.title}</Heading>

                    <Box
                      overflow="hidden"
                      transition="all 0.4s ease"
                      maxH="0"
                      opacity={0}
                      _groupHover={{ maxH: "200px", opacity: 1, mt: 2 }}
                    >
                      <Text color="whiteAlpha.700" fontSize="sm" noOfLines={4} maxW="500px">
                        {movie.overview}
                      </Text>
                    </Box>

                    <Button
                      mt={4}
                      opacity={0}
                      transform="translateY(10px)"
                      transition="all 0.4s ease"
                      _groupHover={{ opacity: 1, transform: "translateY(0)", mt: 4 }}
                      bg="white"
                      color="black"
                      rounded="full"
                      size="sm"
                      fontWeight="black"
                      _hover={{ bg: "purple.500", color: "white" }}
                    >
                      VIEW DETAILS <Icon as={ArrowRight} ml={2} size={16} />
                    </Button>
                  </Flex>
                </Box>
              </Link>
            </VStack>
          )}

          {/* Best TV Show */}
          {tv && (
            <VStack align="flex-start" gap={4}>
              <HStack color="blue.400" gap={2}>
                <Icon as={TrendingUp} size={20} />
                <Text fontWeight="black" letterSpacing="widest" fontSize="xs">BEST SERIES</Text>
              </HStack>
              <Link 
                as={RouterLink} 
                to={`/tv/${tv.id}`} 
                w="100%"
                display="block"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  role="group"
                  as={motion.div}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                  position="relative"
                  w="100%"
                  h="400px"
                  rounded="3xl"
                  overflow="hidden"
                  boxShadow="0 20px 50px rgba(0,0,0,0.6)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Image
                    src={`${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${tv.backdrop_path}`}
                    w="100%" h="100%" objectFit="cover"
                  />
                  <Box position="absolute" inset={0} bgGradient="linear(to-t, black, transparent 60%)" opacity={0.6} />

                  <Flex
                    position="absolute"
                    bottom={0}
                    left={0}
                    p={8}
                    direction="column"
                    gap={3}
                    w="100%"
                    bg="blackAlpha.600"
                    backdropFilter="blur(20px)"
                    transition="all 0.4s ease-in-out"
                    transform="translateY(80px)"
                    _groupHover={{ 
                      transform: "translateY(0)",
                      height: "100%",
                      justifyContent: "center",
                      bg: "blackAlpha.800"
                    }}
                  >
                    <HStack gap={3}>
                      <TomatoRating rating={tv.vote_average} />
                      <HStack bg="whiteAlpha.100" backdropFilter="blur(10px)" px={3} py={1} rounded="full" border="1px solid" borderColor="whiteAlpha.100">
                        <Icon as={Star} size={14} color="yellow.400" fill="yellow.400" />
                        <Text fontSize="sm" fontWeight="black" color="white">{tv.vote_average.toFixed(1)}</Text>
                      </HStack>
                    </HStack>

                    <Heading size="xl" color="white" fontWeight="black" noOfLines={1}>{tv.name}</Heading>

                    <Box
                      overflow="hidden"
                      transition="all 0.4s ease"
                      maxH="0"
                      opacity={0}
                      _groupHover={{ maxH: "200px", opacity: 1, mt: 2 }}
                    >
                      <Text color="whiteAlpha.700" fontSize="sm" noOfLines={4} maxW="500px">
                        {tv.overview}
                      </Text>
                    </Box>

                    <Button
                      mt={4}
                      opacity={0}
                      transform="translateY(10px)"
                      transition="all 0.4s ease"
                      _groupHover={{ opacity: 1, transform: "translateY(0)", mt: 4 }}
                      bg="white"
                      color="black"
                      rounded="full"
                      size="sm"
                      fontWeight="black"
                      _hover={{ bg: "blue.500", color: "white" }}
                    >
                      VIEW DETAILS <Icon as={ArrowRight} ml={2} size={16} />
                    </Button>
                  </Flex>
                </Box>
              </Link>
            </VStack>
          )}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

const BestOfTheMonth = () => {
  const { data, backgroundPosters, loading, error } = useMonthlyBest();

  if (loading) return <Center h="100vh"><LoadingSpinner size="xl" /></Center>;
  if (error) return <Center h="100vh" color="red.400">{error}</Center>;

  return (
    <Box pt={10} pb={20} minH="100vh">
      {/* Background Aesthetic */}
      <Box position="fixed" top={0} right={0} w="600px" h="600px" bg="purple.500" filter="blur(250px)" opacity={0.05} pointerEvents="none" />
      <Box position="fixed" bottom={0} left={0} w="400px" h="400px" bg="blue.500" filter="blur(200px)" opacity={0.03} pointerEvents="none" />

      {/* Hero Section with Collage Background */}
      <Box
        w="100%"
        minH="60vh"
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        px={{ base: 6, md: 12 }}
        mb={24}
      >
        {/* Cinematic Movie Collage Background */}
        <Box position="absolute" inset={0} zIndex={0} overflow="hidden">
          <SimpleGrid
            columns={{ base: 3, md: 6, lg: 8 }}
            gap={4}
            transform="rotate(-5deg) scale(1.2) translateY(-10%)"
            opacity={0.35}
          >
            {backgroundPosters.map((post, idx) => (
              <Box
                key={idx}
                aspectRatio={2 / 3}
                bg="whiteAlpha.100"
                rounded="xl"
                overflow="hidden"
                filter="grayscale(100%)"
                boxShadow="xl"
              >
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.poster}${post.poster_path}`}
                  w="100%" h="100%" objectFit="cover"
                  loading="lazy"
                />
              </Box>
            ))}
          </SimpleGrid>

          {/* Overlays for smooth integration and readability */}
          <Box position="absolute" inset={0} bgGradient="linear(to-b, transparent, black)" />
          <Box position="absolute" inset={0} bgGradient="linear(to-r, black, transparent 70%)" />
          <Box position="absolute" inset={0} backdropFilter="blur(5px)" />
        </Box>

        <Container maxW="container.2xl" p={0} zIndex={1} position="relative">
          <VStack align="flex-start" gap={6}>
            <Badge bg="purple.600" color="white" px={4} py={1} rounded="full" fontSize="xs" fontWeight="black" letterSpacing="widest">
              ANNUAL SELECTION
            </Badge>
            <Heading fontSize={{ base: "3xl", md: "6xl" }} fontWeight="black" color="white" letterSpacing="tighter" lineHeight={0.9}>
              BEST OF <br />
              <Text as="span" bgGradient="linear(to-r, purple.400, blue.400)" bgClip="text">THE MONTH</Text>
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800" maxW="700px">
              The ultimate cinematic leaderboard. Every month, we crown the champions of the big and small screen based on global critics and audiences.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>

        <Box ml={{ base: 0, md: 10 }}>
          {data.map((month, i) => (
            <MonthSection key={`${month.monthName}-${month.year}`} monthData={month} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BestOfTheMonth;
