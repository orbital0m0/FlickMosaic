import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Carousel } from '@watcha/carousel';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { searchListKeys } from '../queries/search/queryKeys';
import { fetchMovieGenres, fetchTodayTrendingMovie } from '../utils/api';

import AppErrorBoundary from '@/components/AppErrorBoundary';
import GenresCard from '@/components/GenresCard';
import { SearchHomePageSkeleton } from '@/components/Skeleton';
import ThemeTab from '@/components/ThemeTab';
import useSearchMovies from '@/hooks/useSearchMovies';
import { useSearchListQuery } from '@/queries/search/useSearchListQuery';
import { buildImageUrl } from '@/utils/transform';

const TAB_BUTTONS = [
  {
    name: '전체',
  },
  {
    name: '액션',
  },
  {
    name: '로맨스',
  },
  {
    name: '코미디',
  },
  {
    name: '다른 장르 보기 V',
  },
];

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    // 기존 hook과 동일한 queryKey, queryFn 사용
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: searchListKeys.trending(),
        queryFn: fetchTodayTrendingMovie,
      }),
      queryClient.prefetchQuery({
        queryKey: searchListKeys.genres(),
        queryFn: fetchMovieGenres,
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 3600, // 1시간마다 재생성
    };
  } catch (error) {
    console.error('Failed to prefetch movie data:', error);

    // 에러 발생 시 빈 상태로 반환 (클라이언트에서 재시도)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 60,
    };
  }
};

const SearchHomePageContent = () => {
  const { highlightedIndex, handleMouseEnter } = useSearchMovies();
  const { trendingQuery, genresQuery } = useSearchListQuery();

  return (
    <div>
      <section className="popular-keyword">
        <div className="popular-keyword-container">
          <h2>인기 검색어 TOP 10</h2>
          <div className="popular-keyword-content">
            <div className="popular-keyword-list">
              <ThemeTab list={TAB_BUTTONS} />
              <ul className="trending-list">
                {trendingQuery.data?.slice(0, 10).map((movie: any, index: number) => (
                  <li
                    key={movie.id}
                    className={`trending-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <Link href={`/movie/${movie.id}`}>
                      <span className="trending-rank">{index + 1}</span>
                      <span className="trending-title">{movie.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="background-img">
              {trendingQuery.data?.[highlightedIndex] && (
                <Image
                  src={buildImageUrl(trendingQuery.data[highlightedIndex].backdrop_path)}
                  alt={trendingQuery.data[highlightedIndex].title}
                  width={1280}
                  height={720}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="category-type">
        <div className="category-container">
          <div className="category-header">
            <h2>장르별 영화</h2>
            <p className="category-description">원하는 장르를 선택해서 영화를 탐색해보세요</p>
          </div>
          <Carousel.Root height={180} articleWidth={319} slides={genresQuery.data ?? []}>
            <Carousel.LeftButton />
            <Carousel.Track articleWidth={319}>
              <Carousel.Article articleWidth={319} layout="overlay">
                {(slide: any) => {
                  return <GenresCard slide={slide} layout="overlay" type="genres" />;
                }}
              </Carousel.Article>
            </Carousel.Track>
            <Carousel.RightButton />
          </Carousel.Root>
        </div>
      </section>
    </div>
  );
};

const SearchHomePage = () => {
  return (
    <>
      <Head>
        <title>검색 - WATCHA</title>
      </Head>
      <AppErrorBoundary>
        <React.Suspense fallback={<SearchHomePageSkeleton />}>
          <SearchHomePageContent />
        </React.Suspense>
      </AppErrorBoundary>
    </>
  );
};

export default SearchHomePage;
