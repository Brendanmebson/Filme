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
      bg="rgba(255, 255, 255, 0.03)"
      rounded="2xl"
      p={5}
      border="1px solid"
      borderColor="whiteAlpha.100"
      _hover={{ bg: "rgba(255, 255, 255, 0.05)", transform: "translateY(-2px)" }}
      transitionProperty="all"
      transitionDuration="0.3s"
    >
      <Flex align="flex-start" justify="space-between" mb={4}>
        <HStack gap={3}>
          <Avatar size="sm" src={user.avatar} name={user.name} />
          <VStack align="flex-start" gap={0}>
            <HStack gap={1.5}>
              <Text fontWeight="black" fontSize="sm" color="white">{user.name}</Text>
              <Text color="whiteAlpha.500" fontSize="xs">{type}</Text>
            </HStack>
            <Text color="whiteAlpha.400" fontSize="2xs">{timestamp}</Text>
          </VStack>
        </HStack>
        <IconButton
          aria-label="More"
          variant="ghost"
          size="xs"
          rounded="full"
          color="whiteAlpha.600"
          icon={<MoreVertical size={16} />}
        />
      </Flex>

      <Text color="whiteAlpha.800" fontSize="sm" mb={4} lineHeight="relaxed">
        {content}
      </Text>

      {media && (
        <Box
          rounded="xl"
          overflow="hidden"
          position="relative"
          aspectRatio={16 / 9}
          mb={4}
          border="1px solid"
          borderColor="whiteAlpha.100"
        >
          <Image src={media.url} alt="Activity" w="100%" h="100%" objectFit="cover" />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.800, transparent)"
          />
          {media.title && (
            <VStack position="absolute" bottom={3} left={4} align="flex-start" gap={0}>
              <Text fontSize="xs" fontWeight="black" color="purple.400" letterSpacing="widest">TRENDING</Text>
              <Text fontSize="sm" fontWeight="bold" color="white">{media.title}</Text>
            </VStack>
          )}
        </Box>
      )}

      <HStack gap={6}>
        <HStack gap={1.5} cursor="pointer" color="whiteAlpha.600" _hover={{ color: 'red.400' }}>
          <Icon as={Heart} size={14} />
          <Text fontSize="xs" fontWeight="bold">24</Text>
        </HStack>
        <HStack gap={1.5} cursor="pointer" color="whiteAlpha.600" _hover={{ color: 'blue.400' }}>
          <Icon as={MessageCircle} size={14} />
          <Text fontSize="xs" fontWeight="bold">12</Text>
        </HStack>
        <HStack gap={1.5} cursor="pointer" color="whiteAlpha.600" _hover={{ color: 'purple.400' }}>
          <Icon as={Share2} size={14} />
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
    <Box w="100%">
      <Flex justify="space-between" align="center" mb={10}>
        <HStack gap={6}>
          <Heading size="xl" color="white" fontWeight="black" letterSpacing="tight">LAST FEED</Heading>
          <HStack gap={2} bg="rgba(255,255,255,0.03)" p={1} rounded="full" border="1px solid" borderColor="whiteAlpha.100">
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
              >
                {tab}
              </Button>
            ))}
          </HStack>
        </HStack>
        <Button
          variant="link"
          size="sm"
          color="whiteAlpha.500"
          fontWeight="bold"
          _hover={{ color: 'white' }}
        >
          SHOW ALL
        </Button>
      </Flex>

      <VStack gap={6} align="stretch">
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
