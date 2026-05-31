import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Flex, 
  HStack, 
  VStack, 
  Text, 
  IconButton, 
  Icon, 
  Heading, 
  Button,
  Image
} from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { MoreVertical, Heart, MessageCircle, Share2 } from 'lucide-react';
import { tmdbApi } from '../../services/tmdbApi';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../../utils/constants';

const ActivityCard = React.forwardRef(function ActivityCard({ user, type, content, timestamp, media, delay }, ref) {
  return (
    <Box
      ref={ref}
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      w="100%"
      maxW="100%"
      bg="rgba(255, 255, 255, 0.03)"
      rounded="2xl"
      p={{ base: 3, md: 5 }}
      border="1px solid"
      borderColor="whiteAlpha.100"
      _hover={{ bg: "rgba(255, 255, 255, 0.05)", transform: "translateY(-2px)" }}
      transitionProperty="all"
      transitionDuration="0.3s"
    >
      <Flex align="flex-start" justify="space-between" mb={{ base: 3, md: 4 }}>
        <HStack gap={{ base: 2, md: 3 }} align="flex-start" maxW={{ base: "90%", md: "85%" }} flex={1}>
          <Box mt={1} flexShrink={0}><Avatar size={{ base: "xs", md: "sm" }} src={user.avatar} name={user.name} /></Box>
          <VStack align="flex-start" gap={0.5} maxW="100%" overflow="hidden">
            <Flex direction={{ base: 'column', sm: 'row' }} align={{ base: 'flex-start', sm: 'center' }} gap={{ base: 0, sm: 1.5 }} wrap="wrap" maxW="100%">
              <Text fontWeight="black" fontSize={{ base: "xs", md: "sm" }} color="white" lineHeight="1.2" noOfLines={1}>{user.name}</Text>
              <Text color="whiteAlpha.500" fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" lineHeight="1.2" noOfLines={1}>{type}</Text>
            </Flex>
            <Text color="whiteAlpha.400" fontSize="3xs">{timestamp}</Text>
          </VStack>
        </HStack>
        <IconButton
          aria-label="More"
          variant="ghost"
          size="xs"
          rounded="full"
          color="whiteAlpha.600"
          icon={<MoreVertical size={16} />}
          flexShrink={0}
        />
      </Flex>

      <Text color="whiteAlpha.800" fontSize={{ base: "xs", md: "sm" }} mb={{ base: 3, md: 4 }} lineHeight="relaxed" w="100%" wordBreak="break-word">
        {content}
      </Text>

      {media && (
        <Box
          w="100%"
          maxW="100%"
          rounded="xl"
          overflow="hidden"
          position="relative"
          aspectRatio={{ base: 4 / 3, md: 16 / 9 }}
          mb={{ base: 3, md: 4 }}
          border="1px solid"
          borderColor="whiteAlpha.100"
        >
          <Image src={media.url} alt="Activity" w="100%" h="100%" objectFit="cover" objectPosition="center" />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.800, transparent)"
          />
          {media.title && (
            <VStack position="absolute" bottom={{ base: 2, md: 3 }} left={{ base: 3, md: 4 }} right={{ base: 3, md: 4 }} align="flex-start" gap={0} pr={4}>
              <Text fontSize="4xs" fontWeight="black" color="purple.400" letterSpacing="widest">TRENDING</Text>
              <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="white" noOfLines={2}>{media.title}</Text>
            </VStack>
          )}
        </Box>
      )}

      <HStack gap={{ base: 4, md: 6 }}>
        <HStack gap={1.5} cursor="pointer" color="whiteAlpha.600" _hover={{ color: 'red.400' }}>
          <Icon as={Heart} boxSize={{ base: 3, md: 4 }} />
          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold">24</Text>
        </HStack>
        <HStack gap={1.5} cursor="pointer" color="whiteAlpha.600" _hover={{ color: 'blue.400' }}>
          <Icon as={MessageCircle} boxSize={{ base: 3, md: 4 }} />
          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold">12</Text>
        </HStack>
        <HStack gap={1.5} cursor="pointer" color="whiteAlpha.600" _hover={{ color: 'purple.400' }}>
          <Icon as={Share2} boxSize={{ base: 3, md: 4 }} />
        </HStack>
      </HStack>
    </Box>
  );
});

const ActivityFeed = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['ALL', 'MOVIES / TV SHOW', 'FRIENDS ACTIVITY'];

  React.useEffect(() => {
    const fetchRealMedia = async () => {
      try {
        const response = await tmdbApi.getTrendingMovies('week');
        const trendingMovies = response.data.results.slice(0, 3);

        const mockUsers = [
          { name: 'The Guardian', avatar: 'https://avatars.githubusercontent.com/u/10183412?v=4' },
          { name: 'Sofia Thomas', avatar: 'https://i.pravatar.cc/150?u=sofia' },
          { name: 'Entertainment Weekly', avatar: 'https://avatars.githubusercontent.com/u/152345?v=4' }
        ];

        const types = ['posted a recommendation', 'started watching', 'trending now'];
        const timestamps = ['15 MIN AGO', '1 HOUR AGO', '2 HOURS AGO'];

        const mappedActivities = trendingMovies.map((movie, index) => ({
          user: mockUsers[index],
          type: types[index],
          timestamp: timestamps[index],
          content: index === 0
            ? `Breaking: "${movie.title}" is breaking box office records globally this week.`
            : index === 1
              ? `Just started "${movie.title}". The atmosphere is incredible!`
              : `"${movie.title}" is currently the most discussed title on MovieSpot.`,
          media: {
            url: `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${movie.backdrop_path}`,
            title: movie.title.toUpperCase()
          }
        }));

        setActivities(mappedActivities);
      } catch (err) {
        console.error("Error fetching social media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRealMedia();
  }, []);

  return (
    <Box w="100%" maxW="100%" overflow="hidden">
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={4} mb={{ base: 6, md: 10 }} w="100%">
        <VStack align="flex-start" gap={{ base: 4, md: 6 }} w="100%" maxW="100%" overflow="hidden">
          <Heading size={{ base: "lg", md: "xl" }} color="white" fontWeight="black" letterSpacing="tight">LAST FEED</Heading>
          <HStack 
            gap={2} 
            bg="rgba(255,255,255,0.03)" 
            p={1} 
            rounded="full" 
            border="1px solid" 
            borderColor="whiteAlpha.100"
            maxW="100%"
            w={{ base: "100%", sm: "auto" }}
            overflowX="auto"
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
          >
            {tabs.map((tab, i) => (
              <Button
                key={tab}
                size="xs"
                variant={activeTab === i ? 'solid' : 'ghost'}
                bg={activeTab === i ? 'purple.600' : 'transparent'}
                color={activeTab === i ? 'white' : 'whiteAlpha.500'}
                rounded="full"
                px={4}
                onClick={() => setActiveTab(i)}
                _hover={activeTab === i ? {} : { color: 'white', bg: 'whiteAlpha.100' }}
                fontSize="2xs"
                fontWeight="black"
                letterSpacing="widest"
                flexShrink={0}
              >
                {tab}
              </Button>
            ))}
          </HStack>
        </VStack>
        <Button
          variant="link"
          size="sm"
          color="whiteAlpha.500"
          fontWeight="bold"
          _hover={{ color: 'white' }}
          display={{ base: 'none', md: 'inline-flex' }}
          flexShrink={0}
        >
          SHOW ALL
        </Button>
      </Flex>

      <VStack gap={6} align="stretch" w="100%" maxW="100%">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, i) => (
            <ActivityCard key={i} {...activity} delay={i * 0.15} />
          ))}
        </AnimatePresence>
      </VStack>
    </Box>
  );
};

export default ActivityFeed;
