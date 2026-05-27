import React, { useState, useEffect } from 'react';
import { Flex, HStack, Text, Box, IconButton, Button, Icon, Badge } from '@chakra-ui/react';
import { Search, Bookmark, User, Film, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicHeader = ({ movie }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    if (!movie?.releaseDate) return;

    const calculateStatus = () => {
      const releaseDate = new Date(movie.releaseDate);
      const now = new Date();
      const difference = releaseDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsReleased(true);
      } else {
        setIsReleased(false);
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    calculateStatus();
    const timer = setInterval(calculateStatus, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [movie?.releaseDate]);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      px={10}
      py={6}
    >
      <Flex align="center" justify="space-between">
        {/* Release Status */}
        <Box display={{ base: 'none', md: 'block' }}>
          <AnimatePresence mode="wait">
            {isReleased ? (
              <motion.div
                key="released"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <HStack gap={4}>
                  <Badge 
                    bgGradient="linear(to-r, purple.600, blue.600)" 
                    color="white" 
                    px={4} 
                    py={1.5} 
                    rounded="full" 
                    fontSize="xs" 
                    fontWeight="black" 
                    letterSpacing="widest"
                    boxShadow="0 0 20px rgba(120, 100, 255, 0.4)"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={Film} size={12} />
                    NOW IN CINEMAS
                  </Badge>
                  <Text color="whiteAlpha.600" fontSize="2xs" fontWeight="bold" letterSpacing="widest">
                    GLOBAL RELEASE
                  </Text>
                </HStack>
              </motion.div>
            ) : (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <VStack align="flex-start" gap={0}>
                  <Text color="purple.400" fontSize="2xs" fontWeight="black" letterSpacing="widest" mb={1}>
                    ONLINE PREMIER IN
                  </Text>
                  <HStack gap={4}>
                    <Box>
                      <Text color="white" fontSize="lg" fontWeight="black" lineHeight={1}>{countdown.days}</Text>
                      <Text color="whiteAlpha.400" fontSize="3xs" fontWeight="bold">DAYS</Text>
                    </Box>
                    <Box>
                      <Text color="white" fontSize="lg" fontWeight="black" lineHeight={1}>{countdown.hours}</Text>
                      <Text color="whiteAlpha.400" fontSize="3xs" fontWeight="bold">HOURS</Text>
                    </Box>
                    <Box>
                      <Text color="white" fontSize="lg" fontWeight="black" lineHeight={1}>{countdown.minutes}</Text>
                      <Text color="whiteAlpha.400" fontSize="3xs" fontWeight="bold">MINS</Text>
                    </Box>
                  </HStack>
                </VStack>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Actions */}
        <HStack gap={4}>
          <IconButton
            aria-label="Search"
            variant="ghost"
            color="whiteAlpha.700"
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            icon={<Search size={20} />}
          />
          <IconButton
            aria-label="Favorites"
            variant="ghost"
            color="whiteAlpha.700"
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            icon={<Bookmark size={20} />}
          />
          <Button
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            variant="ghost"
            color="whiteAlpha.700"
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            fontSize="sm"
            fontWeight="bold"
          >
             <Icon as={User} mr={2} size={18} /> Login
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

// Simple VStack replacement
const VStack = ({ children, align, gap, ...props }) => (
  <Flex direction="column" align={align} gap={gap} {...props}>
    {children}
  </Flex>
);

export default CinematicHeader;
