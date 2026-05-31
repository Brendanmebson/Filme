import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';

export const useMovieDetail = (id, type = 'movie') => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = type === 'tv'
          ? await tmdbApi.getTVDetails(id)
          : await tmdbApi.getMovieDetails(id);
          
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, type]);

  return { movie, loading, error };
};