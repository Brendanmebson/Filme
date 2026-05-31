import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import StickyNav from './components/StickyNav';

// Lazy-load all pages — only the current page's bundle is downloaded
const Home = lazy(() => import('./pages/Home'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Search = lazy(() => import('./pages/Search'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Trending = lazy(() => import('./pages/Trending'));
const BestOfTheMonth = lazy(() => import('./pages/BestOfTheMonth'));
const Recommended = lazy(() => import('./pages/Recommended'));
const SupportPages = lazy(() => import('./pages/SupportPages'));

const PageLoader = () => (
  <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="#050505">
    <Spinner color="purple.400" size="xl" />
  </Box>
);

const AppContent = () => {
  const location = useLocation();

  return (
    <Box minH="100vh" bg="#050505" color="white" position="relative" overflowX="hidden">
      <StickyNav />

      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<MovieDetail />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/search" element={<Search />} />
          <Route path="/best-of-month" element={<BestOfTheMonth />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/help" element={<SupportPages page="help" />} />
          <Route path="/terms" element={<SupportPages page="terms" />} />
          <Route path="/privacy" element={<SupportPages page="privacy" />} />
          <Route path="/cookies" element={<SupportPages page="cookies" />} />
        </Routes>
      </Suspense>

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