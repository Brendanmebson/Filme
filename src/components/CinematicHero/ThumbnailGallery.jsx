import React, { useMemo } from 'react';
import { Box, VStack, Text, HStack, Image, Button, IconButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ThumbnailGallery = ({ movies, currentIndex, onSelect }) => {
  const navigate = useNavigate();
  const VISIBLE_COUNT = 5;

  // Calculate the subset of movies to display
  const visibleMovies = useMemo(() => {
    if (!movies.length) return [];
    
    const count = movies.length;
    let indices = [];
    
    // We want the currentIndex to be ideally in the middle of the 5 visible items
    let startIdx = currentIndex - Math.floor(VISIBLE_COUNT / 2);
    
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      let idx = (startIdx + i) % count;
      if (idx < 0) idx += count;
      indices.push({ index: idx, data: movies[idx] });
    }
    
    return indices;
  }, [movies, currentIndex]);

  const handlePrev = () => {
    const newIdx = (currentIndex - 1 + movies.length) % movies.length;
    onSelect(newIdx);
  };

  const handleNext = () => {
    const newIdx = (currentIndex + 1) % movies.length;
    onSelect(newIdx);
  };

  return (
    <Box
      position="absolute"
      right="40px"
      top="50%"
      transform="translateY(-50%)"
      zIndex={10}
      textAlign="right"
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="column"
      alignItems="flex-end"
      gap={8}
      maxW="600px"
    >
      <VStack align="flex-end" gap={0}>
        <Text
          color="white"
          fontSize="lg"
          fontWeight="bold"
          lineHeight="1.2"
          letterSpacing="tight"
        >
          Unlimited Movies,
        </Text>
        <Text
          color="whiteAlpha.700"
          fontSize="lg"
          fontWeight="bold"
          lineHeight="1.2"
          letterSpacing="tight"
        >
          Endless Adventure
        </Text>
      </VStack>

      <HStack gap={3} position="relative" px={10}>
        {/* Navigation Arrows */}
        <IconButton
          icon={<ChevronLeft size={20} />}
          variant="ghost"
          color="whiteAlpha.600"
          _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
          onClick={handlePrev}
          position="absolute"
          left={0}
          rounded="full"
          zIndex={11}
          aria-label="Previous Movie"
        />

        <HStack gap={3}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleMovies.map(({ index, data }) => (
              <Box
                key={`${data.id}-${index}`}
                as={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: index === currentIndex ? 1.15 : 1,
                  y: index === currentIndex ? -10 : 0
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: index === currentIndex ? 1.2 : 1.1 }}
                cursor="pointer"
                onClick={() => onSelect(index)}
                position="relative"
                rounded="xl"
                overflow="hidden"
                border="2px solid"
                borderColor={index === currentIndex ? "white" : "transparent"}
                boxShadow={index === currentIndex ? "0 10px 30px rgba(255,255,255,0.3)" : "none"}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <Image
                  src={data.thumbnail}
                  alt={data.title}
                  boxSize="85px"
                  objectFit="cover"
                  filter={index === currentIndex ? "brightness(1.1)" : "brightness(0.5) contrast(1.2)"}
                />
              </Box>
            ))}
          </AnimatePresence>
        </HStack>

        <IconButton
          icon={<ChevronRight size={20} />}
          variant="ghost"
          color="whiteAlpha.600"
          _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
          onClick={handleNext}
          position="absolute"
          right={0}
          rounded="full"
          zIndex={11}
          aria-label="Next Movie"
        />
      </HStack>

      <HStack gap={4} mt={3}>
        <Button
          variant="ghost"
          color="whiteAlpha.600"
          fontSize="xs"
          fontWeight="bold"
          _hover={{ color: 'white', bg: 'transparent' }}
          onClick={() => navigate('/trending')}
        >
          See All Trending &rsaquo;
        </Button>
        <Button
          variant="outline"
          color="white"
          borderColor="whiteAlpha.400"
          rounded="full"
          px={4}
          py={1}
          h="auto"
          fontSize="xs"
          _hover={{ bg: 'whiteAlpha.200', borderColor: 'white' }}
          onClick={() => navigate('/best-of-month')}
        >
          Best of the Month
        </Button>
      </HStack>
    </Box>
  );
};

export default ThumbnailGallery;
