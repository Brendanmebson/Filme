import React, { useRef } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  HStack, 
  Button, 
  Icon, 
  IconButton,
  Container
} from '@chakra-ui/react';
import { Switch } from './ui/switch';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';


import DiscoveryCard from './DiscoveryCard';
import { useNavigate } from 'react-router-dom';

const RecommendedSection = ({ movies }) => {
  const listRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      listRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box 
      w="100%" 
      bg="black" 
      pt={20} 
      pb={32} 
      position="relative"
      overflow="hidden"
    >
      {/* Background Gradients */}
      <Box
        as={motion.div}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        position="absolute"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w="100%"
        h="800px"
        bgGradient="radial(circle at 50% 0%, rgba(120, 100, 255, 0.3), transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        {/* Header Area */}
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between" 
          align={{ base: 'flex-start', md: 'flex-end' }} 
          gap={{ base: 6, md: 0 }}
          mb={10}
        >
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "5xl" }}
            fontWeight="black"
            color="white"
            letterSpacing="tight"
          >
            RECOMMENDED
          </Heading>

          <HStack 
            gap={{ base: 4, md: 8 }} 
            w={{ base: '100%', md: 'auto' }}
            justify={{ base: 'space-between', md: 'flex-end' }}
          >
            <Button
              variant="outline"
              color="whiteAlpha.700"
              borderColor="whiteAlpha.300"
              bg="whiteAlpha.50"
              rounded={{ base: "lg", md: "2xl" }}
              px={{ base: 3, md: 6 }}
              py={{ base: 2, md: 6 }}
              h={{ base: '32px', md: 'auto' }}
              fontSize={{ base: "2xs", md: "sm" }}
              fontWeight="bold"
              onClick={() => navigate('/recommended')}
              rightIcon={<Icon as={ArrowUpRight} boxSize={{ base: 3, md: 4 }} />}
              _hover={{ bg: "whiteAlpha.200", color: "white" }}
            >
              SHOW ALL
            </Button>

            <HStack gap={2}>
              <IconButton
                aria-label="Previous"
                icon={<Icon as={ChevronLeft} boxSize={{ base: 5, md: 6 }} />}
                size={{ base: 'sm', md: 'md' }}
                variant="outline"
                borderColor="whiteAlpha.300"
                rounded="full"
                color="white"
                onClick={() => scroll('left')}
                _hover={{ bg: "whiteAlpha.200" }}
              />
              <IconButton
                aria-label="Next"
                icon={<Icon as={ChevronRight} boxSize={{ base: 5, md: 6 }} />}
                size={{ base: 'sm', md: 'md' }}
                variant="outline"
                borderColor="whiteAlpha.300"
                rounded="full"
                color="white"
                onClick={() => scroll('right')}
                _hover={{ bg: "whiteAlpha.200" }}
              />
            </HStack>
          </HStack>
        </Flex>

        {/* Carousel Container */}
        <Box
          ref={listRef}
          display="flex"
          gap={{ base: 4, md: 8 }}
          overflowX="auto"
          pb={10}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory'
          }}
          sx={{
            '& > div': {
              scrollSnapAlign: 'start'
            }
          }}
        >
          {movies.map((movie, index) => (
            <DiscoveryCard 
              key={movie.id} 
              movie={movie} 
              delay={index * 0.1}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RecommendedSection;
