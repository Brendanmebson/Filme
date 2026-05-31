import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const tmdbApi = {
  // Get popular movies
  getPopularMovies: (page = 1) => 
    api.get('/movie/popular', { params: { page } }),

  // Get top rated movies
  getTopRatedMovies: (page = 1) => 
    api.get('/movie/top_rated', { params: { page } }),

  // Get upcoming movies
  getUpcomingMovies: (page = 1) => 
    api.get('/movie/upcoming', { params: { page } }),

  // Get now playing movies
  getNowPlayingMovies: (page = 1) => 
    api.get('/movie/now_playing', { params: { page } }),

  // Get movie details
  getMovieDetails: (movieId) => 
    api.get(`/movie/${movieId}`, { 
      params: { append_to_response: 'credits,videos,similar,images,reviews,recommendations' } 
    }),

  // Get TV show details
  getTVDetails: (tvId) => 
    api.get(`/tv/${tvId}`, { 
      params: { append_to_response: 'credits,videos,similar,images,reviews,recommendations' } 
    }),

  // Get popular TV shows
  getPopularTV: (page = 1) => 
    api.get('/tv/popular', { params: { page } }),

  // Get top rated TV shows
  getTopRatedTV: (page = 1) => 
    api.get('/tv/top_rated', { params: { page } }),

  // Search movies
  searchMovies: (query, page = 1) => 
    api.get('/search/movie', { params: { query, page } }),

  // Get movies by genre
  getMoviesByGenre: (genreId, page = 1) => 
    api.get('/discover/movie', { params: { with_genres: genreId, page } }),

  // Get movie genres
  getGenres: () => 
    api.get('/genre/movie/list'),

  // Get trending movies
  getTrendingMovies: (timeWindow = 'day') => 
    api.get(`/trending/movie/${timeWindow}`),

  // Discover movies with custom filters
  discoverMovies: (params) => 
    api.get('/discover/movie', { params }),

  // Discover TV shows with custom filters
  discoverTV: (params) => 
    api.get('/discover/tv', { params }),
};

export default tmdbApi;