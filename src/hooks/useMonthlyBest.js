import { useState, useEffect, useCallback } from 'react';
import { tmdbApi } from '../services/tmdbApi';

export const useMonthlyBest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonthlyData = useCallback(async () => {
    try {
      setLoading(true);
      const months = [];
      const now = new Date();
      
      // Fetch popular posters for background collage
      const popularRes = await tmdbApi.getPopularMovies(1);
      const backgroundPosters = popularRes.data.results.slice(0, 24);

      // Fetch for the last 6 months (including current)
      for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const monthName = d.toLocaleString('default', { month: 'long' });
        
        const nextMonth = new Date(year, month, 1);
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const endDate = nextMonth.toISOString().split('T')[0];

        // Fetch top movie
        const movieRes = await tmdbApi.discoverMovies({
          'primary_release_date.gte': startDate,
          'primary_release_date.lte': endDate,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 100, // Ensure it's a significant movie
          page: 1
        });

        // Fetch top series
        const tvRes = await tmdbApi.discoverTV({
          'first_air_date.gte': startDate,
          'first_air_date.lte': endDate,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 50, // TV shows usually have fewer votes
          page: 1
        });

        months.push({
          monthName,
          year,
          movie: movieRes.data.results[0],
          tv: tvRes.data.results[0]
        });
      }

      setData({ months, backgroundPosters });
    } catch (err) {
      console.error('Error fetching monthly best:', err);
      setError('Failed to load monthly best content');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthlyData();
  }, [fetchMonthlyData]);

  return { 
    data: data.months || [], 
    backgroundPosters: data.backgroundPosters || [],
    loading, 
    error, 
    refetch: fetchMonthlyData 
  };
};
