export const TMDB_API_KEY = '48f5889aa1d3977e979ff1b16405fa4d'; // Replace with your actual API key
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: '/w500',
  backdrop: '/w1280',
  profile: '/w185',
};

export const MOVIE_CATEGORIES = [
  { id: 'popular', name: 'Popular', endpoint: '/movie/popular' },
  { id: 'top_rated', name: 'Top Rated', endpoint: '/movie/top_rated' },
  { id: 'upcoming', name: 'Upcoming', endpoint: '/movie/upcoming' },
  { id: 'now_playing', name: 'Now Playing', endpoint: '/movie/now_playing' },
  { id: 'movies', name: 'Movies', endpoint: '/movie/popular' },
  { id: 'series', name: 'Series', endpoint: '/tv/popular' },
];

export const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};