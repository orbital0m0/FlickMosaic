import { useSuspenseQuery } from '@tanstack/react-query';

import { searchListKeys } from '@/queries/search/queryKeys';
import { fetchSearchKeywords, fetchSearchGenres } from '@/utils/api';

export const useSearchMovieQuery = (keyword: string) => {
  return useSuspenseQuery({
    queryKey: searchListKeys.searchMovie(keyword),
    queryFn: () => fetchSearchKeywords(keyword),
  });
};

export const useSearchGenresQuery = (genreId: string) => {
  return useSuspenseQuery({
    queryKey: searchListKeys.searchGenres(genreId),
    queryFn: () => fetchSearchGenres(genreId),
  });
};
