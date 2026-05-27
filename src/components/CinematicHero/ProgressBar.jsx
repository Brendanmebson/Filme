import { Box, HStack, Text } from '@chakra-ui/react';

const ProgressBar = ({ progress }) => {
  const { currentTime, duration } = progress;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      position="absolute"
      bottom="40px"
      right="40px"
      zIndex={10}
      bg="rgba(20, 20, 20, 0.6)"
      backdropFilter="blur(20px)"
      px={6}
      py={3}
      rounded="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      minW="320px"
    >
      <HStack gap={4} w="100%">
        <Text color="white" fontSize="xs" fontWeight="bold" fontFamily="mono">
          {formatTime(currentTime)}
        </Text>
        
        <Box flex="1" position="relative" h="20px" display="flex" alignItems="center">
          <Box w="100%" h="4px" bg="whiteAlpha.200" rounded="full" overflow="hidden">
            <Box 
              w={`${progressPercent}%`} 
              h="100%" 
              bg="white" 
              boxShadow="0 0 10px rgba(255,255,255,0.8)"
              transition="width 0.1s linear"
            />
          </Box>
        </Box>

        <Text color="whiteAlpha.500" fontSize="xs" fontWeight="bold" fontFamily="mono">
          {formatTime(duration)}
        </Text>
      </HStack>
    </Box>
  );
};

export default ProgressBar;
