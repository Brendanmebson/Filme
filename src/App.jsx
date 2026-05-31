import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Trending from './pages/Trending';
import BestOfTheMonth from './pages/BestOfTheMonth';
import Recommended from './pages/Recommended';
import { HelpCenter, TermsOfService, PrivacyPolicy, CookieSettings } from './pages/SupportPages';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import StickyNav from './components/StickyNav';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Box minH="100vh" bg="#050505" color="white" position="relative" overflowX="hidden">
      {/* Global Cinematic Glow */}
      <Box
        position="fixed"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w="100%"
        h="800px"
        bgGradient="radial(circle at 50% 0%, rgba(120, 100, 255, 0.05), transparent 70%)"
        pointerEvents="none"
        zIndex={0}
      />

      <StickyNav />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <Box
                  as={motion.div}
                  key="home"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </Box>
              } 
            />
            <Route 
              path="/movie/:id" 
              element={
                <Box
                  as={motion.div}
                  key="movie-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieDetail />
                </Box>
              } 
            />
            <Route 
              path="/tv/:id" 
              element={
                <Box
                  as={motion.div}
                  key="tv-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieDetail />
                </Box>
              } 
            />
            <Route 
              path="/trending" 
              element={
                <Box
                  as={motion.div}
                  key="trending"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Trending />
                </Box>
              } 
            />
            <Route 
              path="/recommended" 
              element={
                <Box
                  as={motion.div}
                  key="recommended"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Recommended />
                </Box>
              } 
            />
            <Route 
              path="/search" 
              element={
                <Box
                  as={motion.div}
                  key="search"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search />
                </Box>
              } 
            />
            <Route 
              path="/best-of-month" 
              element={
                <Box
                  as={motion.div}
                  key="best-of-month"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <BestOfTheMonth />
                </Box>
              } 
            />
            <Route 
              path="/watchlist" 
              element={
                <Box
                  as={motion.div}
                  key="watchlist"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Watchlist />
                </Box>
              } 
            />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookieSettings />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </Box>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;