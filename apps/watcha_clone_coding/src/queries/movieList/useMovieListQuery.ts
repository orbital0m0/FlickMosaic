import { useSuspenseQueries } from '@tanstack/react-query';

import { movieListKeys } from '@/queries/movieList/queryKeys';
import { fetchNowPlayingMovieList, fetchPopularMovieList, fetchTopRatedMovieList } from '@/utils/api';

export const useMovieListQuery = () => {
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: movieListKeys.popular(),
        queryFn: fetchPopularMovieList,
      },
      {
        queryKey: movieListKeys.top_rated(),
        queryFn: fetchTopRatedMovieList,
      },
      {
        queryKey: movieListKeys.now_playing(),
        queryFn: fetchNowPlayingMovieList,
      },
    ],
  });

  const [popularQuery, topRatedQuery, nowPlayingQuery] = results;

  return { popularQuery, topRatedQuery, nowPlayingQuery };
};
