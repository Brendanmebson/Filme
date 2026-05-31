import React from 'react';
import { Box, Heading, Text, Flex, IconButton, Circle, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const ContentArea = ({ movie }) => {
  return (
    <Box
      position="absolute"
      bottom={{ base: '90px', md: '80px' }}
      left={{ base: 4, md: '40px' }}
      right={{ base: 4, md: 'auto' }}
      zIndex={10}
      maxW={{ base: '100%', md: '600px' }}
    >
      <motion.div
        key={movie.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="900"
          color="white"
          lineHeight="1.1"
          mb={1}
          textShadow="0 10px 30px rgba(0,0,0,0.5)"
        >
          {movie.title}
        </Heading>
        
        <Flex align="center" gap={2} mb={4}>
          <Text color="whiteAlpha.600" fontSize="xs" fontWeight="bold">
            YEAR
          </Text>
          <Text color="white" fontSize="md" fontWeight="medium">
            {movie.year}
          </Text>
          <Box boxSize="2px" rounded="full" bg="whiteAlpha.400" />
          <Text color="whiteAlpha.800" fontSize="xs">
            {movie.genre}
          </Text>
        </Flex>
      </motion.div>
    </Box>
  );
};

export default ContentArea;
