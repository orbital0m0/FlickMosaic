import { useRouter } from 'next/router';
import { useEffect, type KeyboardEvent } from 'react';

import useSearchKeywordStore from '@/stores/useSearchKeywordStore';

const useSearchMovie = () => {
  const { pathname } = useRouter();
  const { query, setQuery, genreId, setGenreId } = useSearchKeywordStore();

  // 검색 페이지에서 벗어날 때 초기화
  useEffect(() => {
    const currentPath = pathname;

    // 검색 페이지가 아닐 때 초기화
    if (currentPath !== '/search') {
      setQuery('');
      setGenreId('');
    }
  }, [pathname]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setQuery(trimmed); // 검색 실행
    setGenreId(''); // 장르 검색 초기화
  };

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const searchByGenre = (genreId: string) => {
    setGenreId(genreId);
    setQuery(''); // 키워드 검색 초기화
  };

  return {
    query,
    setQuery,
    handleSubmit,
    handleEnterKeyDown,
    searchByGenre,
    genreId,
  };
};

export default useSearchMovie;
