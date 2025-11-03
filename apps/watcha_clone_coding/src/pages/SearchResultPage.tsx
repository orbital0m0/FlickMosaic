import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AppErrorBoundary from '@/components/AppErrorBoundary';
import { SearchResultPageSkeleton } from '@/components/Skeleton';
import Status from '@/components/Status';
import ThemeTab from '@/components/ThemeTab';
import useSearchMovie from '@/hooks/useSearchMovie';
import { useSearchListQuery } from '@/queries/search/useSearchListQuery';
import { useSearchGenresQuery, useSearchMovieQuery } from '@/queries/search/useSearchQuery';
import { TransformedMovie } from '@/types/Movie';
import { buildImageUrl } from '@/utils/transform';

const SearchResultPageContent = () => {
  const { query, genreId } = useSearchMovie();
  const { genresQuery } = useSearchListQuery();
  const { data: keywordData } = useSearchMovieQuery(query);
  const { data: genresData } = useSearchGenresQuery(genreId);

  // 페이지 타이틀 생성
  const getPageTitle = () => {
    if (query) return `"${query}" 검색 결과 - WATCHA`;
    if (genreId) {
      const genreName = genresQuery.data.find((g: { name: string; id?: number }) => g.id?.toString() === genreId)?.name;
      return `${genreName || '장르'} - WATCHA`;
    }
    return '검색 결과 - WATCHA';
  };

  const resultList = (resultData: TransformedMovie[], type: string) => {
    return (
      <>
        <Head>
          <title>{getPageTitle()}</title>
        </Head>
        <div>
          {/* 장르 검색일 때만 장르 탭 표시 */}
          {type === 'genres' && genresQuery.data.length > 0 && (
            <div className="genre-filter-section">
              <h3>장르별 필터</h3>
              <ThemeTab list={genresQuery.data} />
            </div>
          )}

          {/* 검색 결과 헤더 */}
          <div className="search-result-header">
            <h2>
              {type === 'keyword'
                ? `"${query}" 검색 결과`
                : `장르: ${
                    genresQuery.data.find((g: { name: string; id?: number }) => g.id?.toString() === genreId)?.name
                  }`}
            </h2>
            <span className="result-count">{resultData.length}개 작품</span>
          </div>

          <section className="search-result">
            <ul>
              {resultData.map((movie) => (
                <li className="search-result-item" key={movie.id}>
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={buildImageUrl(movie.image)}
                      alt={movie.title}
                      width={300}
                      height={450}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <div className="movie-info">
                      <span>{movie.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  };

  const emptyList = () => {
    return (
      <>
        <Head>
          <title>{getPageTitle()}</title>
        </Head>
        <div className="empty-result">
          <h3>검색 결과가 없습니다.</h3>
          <p>검색하신 작품이 현재 왓챠에 없어요.</p>
          <p>다른 키워드로 검색해보세요.</p>
        </div>
      </>
    );
  };

  if (query) {
    if (keywordData && keywordData.length > 0) {
      return resultList(keywordData, 'keyword');
    } else {
      return emptyList();
    }
  } else if (genreId) {
    if (genresData && genresData.length > 0) {
      return resultList(genresData, 'genres');
    } else {
      return emptyList();
    }
  }

  return <Status.Loading />;
};

const SearchResultPage = () => {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<SearchResultPageSkeleton />}>
        <SearchResultPageContent />
      </React.Suspense>
    </AppErrorBoundary>
  );
};

export default SearchResultPage;
