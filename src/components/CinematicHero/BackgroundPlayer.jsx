import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundPlayer = ({ videoId, backdrop, isMuted, isPlaying, onToggleMute, onProgress, onVideoEnd }) => {
  const [isReady, setIsReady] = useState(false);
  // Index 0 = ambient blur layer (always muted), index 1 = main foreground player
  const playerRefs = useRef([null, null]);
  const containerRefs = useRef([null, null]);

  const makePlayerVars = (muted) => ({
    autoplay: 1,
    mute: muted ? 1 : 0,
    controls: 0,
    loop: 0,
    playlist: videoId,
    showinfo: 0,
    rel: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    enablejsapi: 1,
    origin: window.location.origin,
  });

  useEffect(() => {
    setIsReady(false);
    let interval;

    const createPlayers = () => {
      // Ambient player — always silent, just visuals
      playerRefs.current[0] = new window.YT.Player(containerRefs.current[0], {
        videoId,
        playerVars: makePlayerVars(true),
        events: {
          onReady: (e) => e.target.playVideo(),
        },
      });

      // Main foreground player
      playerRefs.current[1] = new window.YT.Player(containerRefs.current[1], {
        videoId,
        playerVars: makePlayerVars(isMuted),
        events: {
          onReady: (e) => {
            e.target.playVideo();
            setIsReady(true);
            interval = setInterval(() => {
              const p = playerRefs.current[1];
              if (p && p.getCurrentTime) {
                const currentTime = p.getCurrentTime();
                const duration = p.getDuration();
                if (duration > 0) onProgress({ currentTime, duration });
              }
            }, 1000);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED && onVideoEnd) onVideoEnd();
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.getElementsByTagName('script')[0].parentNode.insertBefore(
        tag,
        document.getElementsByTagName('script')[0]
      );
    }

    if (window.YT && window.YT.Player) {
      createPlayers();
    } else {
      const existing = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existing) existing();
        createPlayers();
      };
    }

    return () => {
      playerRefs.current.forEach((p) => p?.destroy?.());
      playerRefs.current = [null, null];
      if (interval) clearInterval(interval);
    };
  }, [videoId]);

  // Sync mute to foreground player only
  useEffect(() => {
    const p = playerRefs.current[1];
    if (!p) return;
    isMuted ? p.mute?.() : p.unMute?.();
  }, [isMuted]);

  // Sync play/pause to both players
  useEffect(() => {
    playerRefs.current.forEach((p) => {
      if (!p) return;
      isPlaying ? p.playVideo?.() : p.pauseVideo?.();
    });
  }, [isPlaying]);

  return (
    <Box position="absolute" inset={0} overflow="hidden" bg="black">

      {/* ── Ambient blurred video layer — same video, scaled 220% + blurred ── */}
      {/* Fills the black letterbox bars with live, moving video colour */}
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        overflow="hidden"
        pointerEvents="none"
      >
        <Box
          ref={(el) => { containerRefs.current[0] = el; }}
          position="absolute"
          top="50%"
          left="50%"
          w="100%"
          h="100%"
          transform="translate(-50%, -50%) scale(2.5)"
          filter="blur(55px) brightness(0.5) saturate(1.6)"
          style={{ willChange: 'transform' }}
        />
      </Box>

      {/* ── Main crisp foreground video ── */}
      <Box
        ref={(el) => { containerRefs.current[1] = el; }}
        w="100%"
        h="100%"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%) scale(1.4)"
        pointerEvents="none"
        filter="brightness(1.3) contrast(1.1) saturate(1.1)"
        zIndex={1}
      />

      {/* Loading backdrop — fades out when player is ready */}
      <AnimatePresence>
        {!isReady && (
          <Box
            as={motion.div}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            position="absolute"
            inset={0}
            zIndex={2}
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

      {/* Vignette */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at center, transparent 30%, rgba(0,0,0,0.15) 100%)"
        pointerEvents="none"
        zIndex={3}
      />

      {/* Top fade — lighter because blur layer now fills it with colour */}
      <Box
        position="absolute"
        top={0} left={0} right={0}
        h="140px"
        bgGradient="linear(to-b, rgba(0,0,0,0.65), transparent)"
        pointerEvents="none"
        zIndex={3}
      />
      {/* Bottom fade */}
      <Box
        position="absolute"
        bottom={0} left={0} right={0}
        h="140px"
        bgGradient="linear(to-t, rgba(0,0,0,0.65), transparent)"
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
