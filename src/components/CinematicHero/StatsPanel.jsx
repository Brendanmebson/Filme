import React from 'react';
import { VStack, Text, Icon, Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Eye, Star, ThumbsUp } from 'lucide-react';

const StatItem = ({ icon, value, delay }) => (
  <Flex
    as={motion.div}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    align="center"
    gap={3}
    px={3}
    py={2}
    rounded="full"
    bg="whiteAlpha.50"
    backdropFilter="blur(10px)"
    border="1px solid"
    borderColor="whiteAlpha.100"
    _hover={{ bg: 'whiteAlpha.200', transform: 'scale(1.05)' }}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSize="32px"
      rounded="full"
      border="1px solid"
      borderColor="whiteAlpha.200"
      color="whiteAlpha.800"
      boxShadow="0 0 15px rgba(255,255,255,0.05)"
    >
      <Icon as={icon} size={14} />
    </Box>
    <Text color="whiteAlpha.900" fontWeight="medium" fontSize="xs">
      {value}
    </Text>
  </Flex>
);

const StatsPanel = ({ stats }) => {
  return (
    <VStack
      position="absolute"
      left="40px"
      top="50%"
      transform="translateY(-50%)"
      gap={6}
      align="start"
      zIndex={10}
      display={{ base: 'none', md: 'flex' }}
    >
      <StatItem icon={Eye} value={stats.views} delay={0.8} />
      <StatItem icon={Star} value={stats.rating} delay={1.0} />
      <StatItem icon={ThumbsUp} value={stats.likes} delay={1.2} />
    </VStack>
  );
};

export default StatsPanel;
