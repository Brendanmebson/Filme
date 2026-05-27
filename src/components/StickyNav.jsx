import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import StreamingToolbar from './StreamingToolbar';

const StickyNav = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isSticky, setIsSticky] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsSticky(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight - 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <AnimatePresence>
      {isSticky && (
        <Box
          as={motion.div}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          position="fixed"
          top={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={100}
          w="100%"
          maxW="container.2xl"
          px={{ base: 4, md: 8 }}
        >
          <StreamingToolbar />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;
