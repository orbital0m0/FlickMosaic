// utils/api.tsx
import { instance } from '@/utils/axios';
import { transformMovieList, transformMovieData } from '@/utils/transform';

const defaultMovieParams = {
  language: 'ko-KR',
  page: 1,
};

export const fetchPopularMovieList = () =>
  instance
    .get('/movie/popular', { params: defaultMovieParams })
    .then((response) => transformMovieList(response.data.results));

export const fetchTopRatedMovieList = () =>
  instance
    .get('/movie/top_rated', { params: defaultMovieParams })
    .then((response) => transformMovieList(response.data.results));

export const fetchNowPlayingMovieList = () =>
  instance
    .get('/movie/now_playing', { params: defaultMovieParams })
    .then((response) => transformMovieList(response.data.results));

export const fetchMovieDetail = (movieId: string) =>
  instance
    .get(`/movie/${movieId}`, {
      params: {
        language: 'ko-KR',
        append_to_response: 'credits,videos,belongs_to_collection',
      },
    })
    .then((response) => {
      if (!response.data || !response.data.id) {
        throw new Error(`영화 ID ${movieId}에 대한 데이터를 찾을 수 없습니다.`);
      }
      return transformMovieData(response.data);
    });

export const fetchMovieReviews = (movieId: string) =>
  instance
    .get(`/movie/${movieId}/reviews`, {
      params: {
        language: 'en-US',
        page: 1,
      },
    })
    .then((response) => response.data || { results: [] });

export const fetchTodayTrendingMovie = () =>
  instance
    .get('/trending/movie/day', {
      params: { language: 'ko-KR' },
    })
    .then((response) => response.data.results);

export const fetchMovieGenres = () =>
  instance
    .get('/genre/movie/list', {
      params: { language: 'ko' },
    })
    .then((response) => response.data.genres);

export const fetchSearchKeywords = (query: string) =>
  instance
    .get('/search/movie', {
      params: {
        query,
        include_adult: false,
        language: 'ko-KR',
        page: 1,
      },
    })
    .then((response) => transformMovieList(response.data.results, { usePoster: true }));

export const fetchSearchGenres = (genreId: string) =>
  instance
    .get('/discover/movie', {
      params: {
        with_genres: genreId,
        language: 'ko-KR',
        page: 1,
      },
    })
    .then((response) => transformMovieList(response.data.results, { usePoster: true }));
