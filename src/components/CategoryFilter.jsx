import React from 'react';
import { motion } from 'framer-motion';
import { HStack, Box, Text } from '@chakra-ui/react';
import { MOVIE_CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <HStack 
      gap={{ base: 3, md: 6 }} 
      mb={12} 
      bg="rgba(255,255,255,0.03)" 
      p={2} 
      rounded="full" 
      border="1px solid" 
      borderColor="whiteAlpha.100"
      backdropFilter="blur(10px)"
      w={{ base: "100%", md: "fit-content" }}
      overflowX={{ base: "auto", md: "unset" }}
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none'
      }}
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
          flexShrink={0}
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