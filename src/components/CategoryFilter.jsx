import React from 'react';
import { motion } from 'framer-motion';
import { HStack, Box, Text } from '@chakra-ui/react';
import { MOVIE_CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <HStack 
      gap={6} 
      mb={12} 
      bg="rgba(255,255,255,0.03)" 
      p={2} 
      rounded="full" 
      border="1px solid" 
      borderColor="whiteAlpha.100"
      backdropFilter="blur(10px)"
      w="fit-content"
    >
      {MOVIE_CATEGORIES.map((category) => (
        <Box
          key={category.id}
          as={motion.button}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          px={8}
          py={3}
          rounded="full"
          position="relative"
          cursor="pointer"
          transition="all 0.3s"
        >
          {activeCategory === category.id && (
            <Box
              as={motion.div}
              layoutId="active-tab"
              position="absolute"
              inset={0}
              bg="purple.600"
              rounded="full"
              boxShadow="0 0 20px rgba(120, 100, 255, 0.4)"
              zIndex={0}
            />
          )}
          <Text
            position="relative"
            zIndex={1}
            fontSize="xs"
            fontWeight="black"
            color={activeCategory === category.id ? "white" : "whiteAlpha.600"}
            letterSpacing="widest"
          >
            {category.name.toUpperCase()}
          </Text>
        </Box>
      ))}
    </HStack>
  );
};

export default CategoryFilter;