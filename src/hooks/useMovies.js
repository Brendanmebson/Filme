import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';

export const useMovies = (category = 'popular', page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        if (category === 'popular') {
          const [movieRes, tvRes] = await Promise.all([
            tmdbApi.getPopularMovies(page),
            tmdbApi.getPopularTV(page)
          ]);
          const merged = [...movieRes.data.results, ...tvRes.data.results].sort((a, b) => b.popularity - a.popularity);
          response = {
            data: {
              results: merged,
              total_pages: Math.max(movieRes.data.total_pages, tvRes.data.total_pages)
            }
          };
        } else if (category === 'top_rated') {
          const [movieRes, tvRes] = await Promise.all([
            tmdbApi.getTopRatedMovies(page),
            tmdbApi.getTopRatedTV(page)
          ]);
          const merged = [...movieRes.data.results, ...tvRes.data.results].sort((a, b) => b.vote_average - a.vote_average);
          response = {
            data: {
              results: merged,
              total_pages: Math.max(movieRes.data.total_pages, tvRes.data.total_pages)
            }
          };
        } else {
          switch (category) {
            case 'upcoming':
              response = await tmdbApi.getUpcomingMovies(page);
              break;
            case 'now_playing':
              response = await tmdbApi.getNowPlayingMovies(page);
              break;
            case 'movies':
              response = await tmdbApi.getPopularMovies(page);
              break;
            case 'series':
              response = await tmdbApi.getPopularTV(page);
              break;
            default:
              response = await tmdbApi.getPopularMovies(page);
          }
        }
        
        setMovies(page === 1 ? response.data.results : prev => [...prev, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  return { movies, loading, error, totalPages };
};

export const useSearchMovies = (query, page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await tmdbApi.searchMovies(query, page);
        setMovies(page === 1 ? response.data.results : prev => [...prev, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, page]);

  return { movies, loading, error, totalPages };
};