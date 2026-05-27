import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { IconButton, Icon } from '@chakra-ui/react';
import { useWatchlist } from '../hooks/useWatchlist';
import { toaster } from './ui/toaster';

const WatchlistButton = ({ movie }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
    
    toaster.create({
      title: inWatchlist ? "Removed from Wishlist" : "Added to Wishlist",
      type: inWatchlist ? "info" : "success",
      duration: 3000,
    });
  };

  return (
    <IconButton
      as={motion.button}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      aria-label={inWatchlist ? 'Remove from wishlist' : 'Add to wishlist'}
      variant={inWatchlist ? "solid" : "outline"}
      colorPalette="pink"
      borderRadius="full"
      boxShadow={inWatchlist ? "0 0 20px rgba(213, 63, 140, 0.4)" : "none"}
      border="1px solid"
      borderColor={inWatchlist ? "transparent" : "whiteAlpha.300"}
      bg={inWatchlist ? "pink.600" : "transparent"}
      color={inWatchlist ? "white" : "whiteAlpha.800"}
      _hover={{ 
        bg: inWatchlist ? "pink.500" : "whiteAlpha.100",
        borderColor: "pink.400",
        color: "pink.400"
      }}
    >
      <Icon 
        as={Heart} 
        boxSize={5}
        fill={inWatchlist ? "pink.500" : "transparent"} 
        color={inWatchlist ? "pink.500" : "white"}
        strokeWidth={inWatchlist ? 1 : 2}
      />
    </IconButton>
  );
};

export default WatchlistButton;