import { 
  Box, 
  Image, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Icon,
  Circle,
  Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const DiscoveryCard = ({ movie, delay = 0 }) => {
  // Random platform logos for demo purposes
  const platforms = [
    { name: 'HBO', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg' },
    { name: 'NETFLIX', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'PRIME', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' }
  ];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];

  return (
    <Box
      as={motion.div}
      whileHover={{ y: -10, scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut"
      }}
      position="relative"
      minW={{ base: "240px", md: "280px" }}
      h="420px"
      rounded="3xl"
      overflow="hidden"
      cursor="pointer"
      role="group"
      boxShadow="0 20px 40px rgba(0,0,0,0.4)"
      _after={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bgGradient: 'linear(to-t, blackAlpha.900, transparent, transparent)',
        transition: 'opacity 0.3s',
        opacity: 0.8,
        _groupHover: { opacity: 0.9 }
      }}
    >
      {/* Poster Image */}
      <Image
        src={movie.poster}
        alt={movie.title}
        w="100%"
        h="100%"
        objectFit="cover"
        transition="transform 0.5s"
        _groupHover={{ transform: 'scale(1.1)' }}
      />

      {/* Top Badges */}
      <Flex
        position="absolute"
        top={5}
        left={5}
        right={5}
        justify="space-between"
        align="center"
        zIndex={2}
      >
        <Box
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
          px={3}
          py={1.5}
          rounded="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image 
            src={platform.logo} 
            alt={platform.name} 
            h={platform.name === 'PRIME' ? "20px" : "14px"}
            objectFit="contain" 
            filter={platform.name === 'HBO' ? "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.5))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))"}
          />
        </Box>
        
        <HStack bg="blackAlpha.600" backdropFilter="blur(10px)" px={2} py={1} rounded="lg" gap={1}>
          <Text color="white" fontWeight="black" fontSize="md">{movie.rating}</Text>
          <Icon as={Star} color="yellow.400" fill="yellow.400" boxSize={3} />
        </HStack>
      </Flex>

      {/* Content Overlay */}
      <VStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={6}
        align="flex-start"
        zIndex={2}
        gap={3}
      >
        <Text
          color="white"
          fontSize="2xl"
          fontWeight="black"
          noOfLines={2}
          lineHeight="1.2"
          textShadow="0 2px 10px rgba(0,0,0,0.5)"
        >
          {movie.title}
        </Text>

        <HStack gap={2}>
          <Badge
            bg="whiteAlpha.100"
            color="white"
            variant="outline"
            borderColor="whiteAlpha.300"
            backdropFilter="blur(10px)"
            px={3}
            py={1}
            rounded="full"
            fontSize="3xs"
            fontWeight="bold"
          >
            {movie.year}
          </Badge>
          <Badge
            bg="whiteAlpha.100"
            color="white"
            variant="outline"
            borderColor="whiteAlpha.300"
            backdropFilter="blur(10px)"
            px={3}
            py={1}
            rounded="full"
            fontSize="3xs"
            fontWeight="bold"
          >
            {movie.runtime || "148 min"}
          </Badge>
        </HStack>
      </VStack>

      {/* Hover Glow Edge */}
      <Box
        position="absolute"
        inset={0}
        border="2px solid transparent"
        rounded="3xl"
        transition="all 0.3s"
        _groupHover={{
          borderColor: "rgba(120, 100, 255, 0.4)",
          boxShadow: "inset 0 0 20px rgba(120, 100, 255, 0.2), 0 0 30px rgba(120, 100, 255, 0.1)"
        }}
      />
    </Box>
  );
};

export default DiscoveryCard;
