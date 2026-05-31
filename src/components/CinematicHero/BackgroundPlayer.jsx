import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundPlayer = ({ videoId, backdrop, isMuted, isPlaying, onToggleMute, onProgress, onVideoEnd }) => {
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const playerVars = {
    autoplay: 1,
    mute: 1, // always start muted (browser policy)
    controls: 0,
    loop: 0,
    playlist: videoId,
    showinfo: 0,
    rel: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    enablejsapi: 1,
    origin: window.location.origin,
  };

  useEffect(() => {
    setIsReady(false);

    const createPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars,
        events: {
          onReady: (e) => {
            e.target.playVideo();
            setIsReady(true);
            // Apply mute state after ready
            if (!isMuted) {
              try { e.target.unMute(); } catch (_) {}
            }
            // Poll progress every 2s instead of 1s
            intervalRef.current = setInterval(() => {
              const p = playerRef.current;
              if (p && p.getCurrentTime) {
                try {
                  const currentTime = p.getCurrentTime();
                  const duration = p.getDuration();
                  if (duration > 0) onProgress({ currentTime, duration });
                } catch (_) {}
              }
            }, 2000);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED && onVideoEnd) onVideoEnd();
          },
        },
      });
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      const existing = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existing) existing();
        createPlayer();
      };
    } else {
      createPlayer();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      try { playerRef.current?.destroy(); } catch (_) {}
      playerRef.current = null;
    };
  }, [videoId]);

  // Sync mute
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try { isMuted ? p.mute() : p.unMute(); } catch (_) {}
  }, [isMuted]);

  // Sync play/pause
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try { isPlaying ? p.playVideo() : p.pauseVideo(); } catch (_) {}
  }, [isPlaying]);

  return (
    <Box position="absolute" inset={0} overflow="hidden" bg="black">

      {/* Static backdrop shown while video loads — no cost */}
      {backdrop && (
        <Box
          position="absolute"
          inset={0}
          bgImage={`url(${backdrop})`}
          bgSize="cover"
          bgPos="center"
          filter="brightness(0.5)"
          zIndex={0}
        />
      )}

      {/* Single YouTube player — fills container, scaled slightly for cover */}
      <Box
        ref={containerRef}
        position="absolute"
        top="50%"
        left="50%"
        // 16:9 cover trick — uses CSS only, no runtime filter
        style={{
          width: '177.78vh', // 100vh * (16/9)
          height: '56.25vw', // 100vw * (9/16)
          minWidth: '100%',
          minHeight: '100%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
        zIndex={1}
      />

      {/* Fade in when ready */}
      <AnimatePresence>
        {!isReady && (
          <Box
            as={motion.div}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            position="absolute"
            inset={0}
            zIndex={2}
            bg="black"
          >
            {backdrop && (
              <Box
                w="100%"
                h="100%"
                bgImage={`url(${backdrop})`}
                bgSize="cover"
                bgPos="center"
                filter="brightness(0.5)"
              />
            )}
          </Box>
        )}
      </AnimatePresence>

      {/* Vignette — cheap radial gradient, no filter */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at center, transparent 30%, rgba(0,0,0,0.15) 100%)"
        pointerEvents="none"
        zIndex={3}
      />

      {/* Top fade */}
      <Box
        position="absolute"
        top={0} left={0} right={0}
        h="140px"
        bgGradient="linear(to-b, rgba(0,0,0,0.7), transparent)"
        pointerEvents="none"
        zIndex={3}
      />

      {/* Bottom fade */}
      <Box
        position="absolute"
        bottom={0} left={0} right={0}
        h="140px"
        bgGradient="linear(to-t, rgba(0,0,0,0.7), transparent)"
        pointerEvents="none"
        zIndex={3}
      />

      {/* Left cinematic vignette */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-r, rgba(0,0,0,0.5), transparent 40%)"
        pointerEvents="none"
        zIndex={3}
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
