import Head from 'next/head';

import SearchHomePage from './SearchHomePage';
import SearchResultPage from './SearchResultPage';

import useSearchMovie from '@/hooks/useSearchMovie';

const SearchPage = () => {
  const { query, genreId } = useSearchMovie();

  if (query || genreId) {
    return <SearchResultPage />;
  }

  return (
    <>
      <Head>
        <title>검색 - WATCHA</title>
      </Head>
      <SearchHomePage />
    </>
  );
};

export default SearchPage;
