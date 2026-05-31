import React, { useState, useEffect } from 'react';
import { Flex, HStack, Text, Box, IconButton, Button, Icon, Badge } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { Film, User } from 'lucide-react';
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
    const timer = setInterval(calculateStatus, 60000);
    return () => clearInterval(timer);
  }, [movie?.releaseDate]);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      px={{ base: 4, md: 10 }}
      py={{ base: 3, md: 6 }}
    >
      <Flex align="center" justify="space-between">

        {/* ── Left: Logo + Brand name ── */}
        <HStack gap={2} align="center">
          <Box
            w={{ base: '28px', md: '32px' }}
            h={{ base: '28px', md: '32px' }}
            bgGradient="linear(to-br, purple.500, blue.500)"
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 16px rgba(120,100,255,0.5)"
          >
            <Icon as={Film} color="white" boxSize={{ base: 3.5, md: 4 }} />
          </Box>
          <Text
            color="white"
            fontWeight="black"
            fontSize={{ base: 'lg', md: 'xl' }}
            letterSpacing="tight"
            lineHeight={1}
          >
            Filme
          </Text>

          {/* PC-only countdown — hidden on mobile */}
          <Box display={{ base: 'none', md: 'block' }} ml={6}>
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
                      <Icon as={Film} boxSize={3} />
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
        </HStack>

        {/* ── Right: Profile avatar ── */}
        <Box
          as={motion.div}
          whileHover={{ scale: 1.08 }}
          cursor="pointer"
        >
          <Avatar
            size="sm"
            name="Guest User"
            src=""
            bg="whiteAlpha.200"
            border="2px solid rgba(255,255,255,0.25)"
            boxShadow="0 0 12px rgba(120,100,255,0.35)"
            fallback={<Icon as={User} color="whiteAlpha.800" boxSize={4} />}
          />
        </Box>
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
