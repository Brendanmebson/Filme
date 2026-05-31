import React from 'react';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Flex, 
  Icon, 
  Button,
  Circle,
  Badge
} from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { motion } from 'framer-motion';
import { ChevronRight, MessageSquare, PlayCircle } from 'lucide-react';

const FriendItem = ({ name, avatar, status, activity, isLive, delay }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.02 }}
      w="100%"
      p={3}
      rounded="xl"
      cursor="pointer"
      role="group"
      bg={isLive ? "rgba(120, 100, 255, 0.08)" : "transparent"}
      _hover={{ bg: "whiteAlpha.100" }}
    >
      <Flex align="center" justify="space-between">
        <HStack gap={3}>
          <Box position="relative">
            <Avatar size="sm" src={avatar} name={name} />
            <Circle 
              size="10px" 
              bg={status === 'online' ? 'green.500' : 'gray.500'} 
              position="absolute"
              bottom="0"
              right="0"
              border="2px solid #050505"
              zIndex={2}
            />
            {isLive && (
              <Circle 
                size="8px" 
                bg="red.500" 
                position="absolute" 
                top="0" 
                right="0" 
                border="2px solid #050505"
              />
            )}
          </Box>
          <VStack align="flex-start" gap={0}>
            <Text fontSize="sm" fontWeight="bold" color="white">{name}</Text>
            <Text fontSize="2xs" color="whiteAlpha.500" noOfLines={1} maxW="120px">
              {activity}
            </Text>
          </VStack>
        </HStack>
        
        <Box 
          opacity={0} 
          _groupHover={{ opacity: 1 }} 
          transition="all 0.2s"
        >
          <Icon as={ChevronRight} boxSize={4} color="whiteAlpha.400" />
        </Box>
      </Flex>

      {/* Hover Actions Bar (Hidden by default) */}
      <HStack 
        mt={2} 
        gap={2} 
        display="none" 
        _groupHover={{ display: 'flex' }}
        as={motion.div}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button size="2xs" variant="ghost" colorScheme="purple" leftIcon={<MessageSquare size={12}/>}>Chat</Button>
        <Button size="2xs" variant="ghost" colorScheme="purple" leftIcon={<PlayCircle size={12}/>}>Watch</Button>
      </HStack>
    </Box>
  );
};

const FriendsSidebar = () => {
  const friends = [
    { name: 'Sofia Thomas', status: 'online', activity: 'Watching The Batman', isLive: true, avatar: 'https://i.pravatar.cc/150?u=sofia' },
    { name: 'Emma Kim', status: 'online', activity: 'Rating Inception', isLive: false, avatar: 'https://i.pravatar.cc/150?u=emma' },
    { name: 'Lucas Wilson', status: 'offline', activity: 'Last seen 2h ago', isLive: false, avatar: 'https://i.pravatar.cc/150?u=lucas' },
    { name: 'Chloe Chen', status: 'online', activity: 'Browsing Sci-Fi', isLive: false, avatar: 'https://i.pravatar.cc/150?u=chloe' },
    { name: 'Noah Miller', status: 'online', activity: 'Watching Interstellar', isLive: true, avatar: 'https://i.pravatar.cc/150?u=noah' },
  ];

  return (
    <Box
      w="100%"
      h="100%"
      bg="rgba(255, 255, 255, 0.02)"
      backdropFilter="blur(20px)"
      rounded="3xl"
      p={{ base: 4, md: 6 }}
      border="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 20px 40px rgba(0,0,0,0.4)"
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" mb={{ base: 4, md: 10 }}>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest">FRIENDS</Heading>
        <Button 
          variant="link" 
          size="xs" 
          color="purple.500" 
          rightIcon={<ChevronRight size={14} />}
          _hover={{ color: 'purple.400' }}
        >
          SEE ALL
        </Button>
      </Flex>

      {/* Mobile & Tablet: Horizontal scrolling avatar list (Instagram/Facebook Stories style) */}
      <Box
        display={{ base: 'flex', lg: 'none' }}
        overflowX="auto"
        gap={5}
        pb={2}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}
      >
        {friends.map((friend) => (
          <VStack key={friend.name} gap={1} minW="70px" align="center" flexShrink={0}>
            <Box position="relative">
              <Avatar size="md" src={friend.avatar} name={friend.name} />
              <Circle 
                size="12px" 
                bg={friend.status === 'online' ? 'green.500' : 'gray.500'} 
                position="absolute"
                bottom="0"
                right="0"
                border="2px solid #050505"
                zIndex={2}
              />
              {friend.isLive && (
                <Circle 
                  size="10px" 
                  bg="red.500" 
                  position="absolute" 
                  top="0" 
                  right="0" 
                  border="2px solid #050505"
                />
              )}
            </Box>
            <Text fontSize="2xs" fontWeight="bold" color="white" noOfLines={1} textAlign="center" maxW="70px">
              {friend.name.split(' ')[0]}
            </Text>
            {friend.isLive && (
              <Badge bg="red.500" color="white" fontSize="3xs" px={1.5} py={0} rounded="full" transform="scale(0.85)">
                LIVE
              </Badge>
            )}
          </VStack>
        ))}
      </Box>

      {/* Desktop: Vertical list */}
      <VStack gap={4} align="stretch" display={{ base: 'none', lg: 'flex' }}>
        {friends.map((friend, i) => (
          <FriendItem key={friend.name} {...friend} delay={i * 0.1} />
        ))}
      </VStack>

      {/* Aesthetic Accents */}
      <Box 
        position="absolute" 
        top="-50px" 
        left="-50px" 
        w="100px" 
        h="100px" 
        bg="purple.500" 
        filter="blur(80px)" 
        opacity={0.1}
        pointerEvents="none"
      />
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default FriendsSidebar;
