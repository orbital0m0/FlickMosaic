import { useSuspenseQueries } from '@tanstack/react-query';

import { searchListKeys } from '@/queries/search/queryKeys';
import { fetchMovieGenres, fetchTodayTrendingMovie } from '@/utils/api';

export const useSearchListQuery = () => {
  const results = useSuspenseQueries({
    queries: [
      { queryKey: searchListKeys.trending(), queryFn: fetchTodayTrendingMovie },
      {
        queryKey: searchListKeys.genres(),
        queryFn: fetchMovieGenres,
      },
    ],
  });

  const [trendingQuery, genresQuery] = results;

  return { trendingQuery, genresQuery };
};
