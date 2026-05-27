import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundPlayer = ({ videoId, backdrop, isMuted, isPlaying, onToggleMute, onProgress, onVideoEnd }) => {
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsReady(false); // Reset ready state when videoId changes

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let interval;

    const createPlayer = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: isMuted ? 1 : 0,
          controls: 0,
          loop: 0, // Disable internal looping to use our callback
          playlist: videoId,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setIsReady(true);

            interval = setInterval(() => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                if (duration > 0) {
                  onProgress({ currentTime, duration });
                }
              }
            }, 1000);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (onVideoEnd) onVideoEnd();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existingHandler = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingHandler) existingHandler();
        createPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
      if (interval) clearInterval(interval);
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.mute) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo && playerRef.current.pauseVideo) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  return (
    <Box position="absolute" inset={0} overflow="hidden" bg="black">
      <Box
        ref={containerRef}
        w="100%"
        h="100%"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%) scale(1.4)"
        pointerEvents="none"
        filter="brightness(1.3) contrast(1.1) saturate(1.1)"
      />

      <AnimatePresence>
        {!isReady && (
          <Box
            as={motion.div}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            position="absolute"
            inset={0}
            zIndex={1}
            bg="black"
          >
            <Image
              src={backdrop}
              alt="Backdrop"
              w="100%"
              h="100%"
              objectFit="cover"
              filter="brightness(0.6)"
            />
          </Box>
        )}
      </AnimatePresence>

      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at center, transparent 30%, rgba(0,0,0,0.2) 100%)"
        pointerEvents="none"
        zIndex={2}
      />
      
      {/* Top and Bottom Masks to hide YouTube UI artifacts during load/transitions */}
      <Box 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        h="150px" 
        bgGradient="linear(to-b, black, transparent)" 
        pointerEvents="none" 
        zIndex={3}
      />
      <Box 
        position="absolute" 
        bottom={0} 
        left={0} 
        right={0} 
        h="150px" 
        bgGradient="linear(to-t, black, transparent)" 
        pointerEvents="none" 
        zIndex={3}
      />

      <Box
        position="absolute"
        inset={0}
        bgGradient="to-t"
        gradientFrom="rgba(0,0,0,0.8)"
        gradientTo="transparent"
        gradientStop="50%"
        pointerEvents="none"
        zIndex={4}
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="to-r"
        gradientFrom="rgba(0,0,0,0.5)"
        gradientTo="transparent"
        gradientStop="30%"
        pointerEvents="none"
        zIndex={4}
      />

      <IconButton
        position="absolute"
        bottom="120px"
        right="40px"
        aria-label="Toggle Mute"
        variant="ghost"
        color="whiteAlpha.600"
        _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
        onClick={onToggleMute}
        rounded="full"
        zIndex={10}
        icon={isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      />
    </Box>
  );
};

export default BackgroundPlayer;
