import React, { useState, useCallback, useEffect } from 'react';
import { Box, Circle, IconButton, Spinner, Center } from '@chakra-ui/react';
import { Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import BackgroundPlayer from './BackgroundPlayer';
import StatsPanel from './StatsPanel';
import ContentArea from './ContentArea';
import ThumbnailGallery from './ThumbnailGallery';
import CinematicHeader from './CinematicHeader';
import ProgressBar from './ProgressBar';

import { tmdbApi } from '../../services/tmdbApi';
import { TMDB_IMAGE_BASE_URL, GENRES } from '../../utils/constants';

const CinematicHero = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        // 1. Get trending movies
        const trendingRes = await tmdbApi.getTrendingMovies();
        const trendingMovies = trendingRes.data.results.slice(0, 15);

        // 2. For each movie, fetch details to get trailers
        const movieDetails = await Promise.all(
          trendingMovies.map(async (m) => {
            const detailRes = await tmdbApi.getMovieDetails(m.id);
            const videos = detailRes.data.videos.results;
            const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos[0];
            
            return {
              id: m.id,
              title: m.title,
              year: new Date(m.release_date).getFullYear(),
              genre: m.genre_ids.map(id => GENRES[id]).slice(0, 2).join(' / '),
              views: `${(m.popularity / 10).toFixed(1)}k`,
              rating: m.vote_average.toFixed(2),
              likes: `${(m.vote_count / 100).toFixed(1)}k`,
              videoId: trailer?.key,
              releaseDate: m.release_date,
              thumbnail: `${TMDB_IMAGE_BASE_URL}/w500${m.poster_path}`,
              backdrop: `${TMDB_IMAGE_BASE_URL}/w1280${m.backdrop_path}`,
            };
          })
        );

        setMovies(movieDetails);
      } catch (error) {
        console.error("Failed to fetch cinematic hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const activeMovie = movies[currentIndex];
  const containerRef = React.useRef(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying]);

  const handleProgress = useCallback((val) => {
    setProgress(val);
  }, []);

  if (loading || !activeMovie) {
    return (
      <Box w="100%" h="100vh" bg="black">
        <Center h="100%">
          <Spinner color="white" size="xl" />
        </Center>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      position="relative"
      w="100%"
      h="100vh"
      overflow="hidden"
      color="white"
    >
      <CinematicHeader movie={activeMovie} />
      
      <BackgroundPlayer
        videoId={activeMovie.videoId}
        backdrop={activeMovie.backdrop}
        isMuted={isMuted}
        isPlaying={isPlaying}
        onToggleMute={() => setIsMuted(!isMuted)}
        onProgress={handleProgress}
        onVideoEnd={handleNext}
      />

      <StatsPanel stats={activeMovie} />
      
      <ContentArea 
        movie={activeMovie} 
      />

      {/* Central Play Button */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={20}
      >
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <Circle
            size={{ base: "48px", md: "60px" }}
            bg="white"
            cursor="pointer"
            boxShadow="0 0 30px rgba(255,255,255,0.2), inset 0 0 10px rgba(0,0,0,0.1)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={24} fill="black" color="black" />
            ) : (
              <Play size={24} fill="black" color="black" style={{ marginLeft: '4px' }} />
            )}
          </Circle>
        </motion.div>
      </Box>

      <ThumbnailGallery
        movies={movies}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />

      <ProgressBar progress={progress} />

      {/* Bottom Center Expand Button */}
      <Box
        position="absolute"
        bottom="40px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={10}
      >
        <IconButton
          aria-label="Expand"
          variant="outline"
          color="white"
          borderColor="whiteAlpha.300"
          bg="whiteAlpha.100"
          backdropFilter="blur(10px)"
          rounded="2xl"
          px={8}
          py={6}
          icon={
            <Box w="100%" display="flex" flexDirection="column" gap="4px">
              <Box w="20px" h="2px" bg="white" rounded="full" />
              <Box w="12px" h="2px" bg="white" rounded="full" />
            </Box>
          }
          _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
        />
      </Box>
    </Box>
  );
};

export default CinematicHero;
