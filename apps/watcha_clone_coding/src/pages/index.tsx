import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Carousel } from '@watcha/carousel';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import AppErrorBoundary from '@/components/AppErrorBoundary';
import MovieCard from '@/components/MovieCard';
import { PageSkeleton } from '@/components/Skeleton';
import ThemeTab from '@/components/ThemeTab';
import { movieListKeys } from '@/queries/movieList/queryKeys';
import { useMovieListQuery } from '@/queries/movieList/useMovieListQuery';
import { CarouselProps } from '@/types/Carousel';
import { fetchPopularMovieList, fetchTopRatedMovieList, fetchNowPlayingMovieList } from '@/utils/api';

const TAB_BUTTONS = [
  {
    name: '추천',
  },
  {
    name: '#완전한 발견',
  },
  {
    name: '#한국',
  },
  {
    name: '#애니메이션',
  },
  {
    name: '성인+',
  },
];

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    // 기존 hook과 동일한 queryKey, queryFn 사용
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: movieListKeys.popular(),
        queryFn: fetchPopularMovieList,
      }),
      queryClient.prefetchQuery({
        queryKey: movieListKeys.top_rated(),
        queryFn: fetchTopRatedMovieList,
      }),
      queryClient.prefetchQuery({
        queryKey: movieListKeys.now_playing(),
        queryFn: fetchNowPlayingMovieList,
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

const ListPageContent = () => {
  const { popularQuery, topRatedQuery, nowPlayingQuery } = useMovieListQuery();

  return (
    <div>
      <ThemeTab list={TAB_BUTTONS} />
      {/* 메인 슬라이드 */}
      <section style={{ marginBottom: '40px' }}>
        <Carousel.Root height={642} articleWidth={1140} slides={popularQuery.data ?? []}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={1140}>
            <Carousel.Article articleWidth={1140} layout="overlay">
              {(slide: any) => {
                return <MovieCard slide={slide as CarouselProps} layout="overlay" type="movie" priority={true} />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
      {/* 추천1 */}
      <section style={{ marginBottom: '40px' }}>
        <Carousel.Root height={289} articleWidth={421} slides={popularQuery.data ?? []}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={421}>
            <Carousel.Article articleWidth={421} layout="top">
              {(slide: any) => {
                return <MovieCard slide={slide as CarouselProps} layout="top" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
      <section style={{ marginBottom: '40px' }}>
        <h2>개별 구매 Top 20</h2>
        <Carousel.Root height={200} articleWidth={400} slides={topRatedQuery.data ?? []}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={400}>
            <Carousel.Article articleWidth={400} layout="left">
              {(slide: any) => {
                return <MovieCard slide={slide as CarouselProps} layout="left" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
      <section style={{ marginBottom: '40px' }}>
        <h2>새로 올라온 콘텐츠</h2>
        <Carousel.Root height={164} articleWidth={290} slides={nowPlayingQuery.data ?? []}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={290}>
            <Carousel.Article articleWidth={290} layout="none">
              {(slide: any) => {
                return <MovieCard slide={slide as CarouselProps} layout="none" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
    </div>
  );
};

const ListPage = () => {
  return (
    <>
      <Head>
        <title>WATCHA - 영화 추천</title>
      </Head>
      <AppErrorBoundary>
        <React.Suspense fallback={<PageSkeleton />}>
          <ListPageContent />
        </React.Suspense>
      </AppErrorBoundary>
    </>
  );
};

export default ListPage;
