import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/router';

import { useMovieDetailQuery } from '@/queries/detail/useMovieDetailQuery';

const useMovieDetail = () => {
  dayjs.extend(duration);
  // URL에서 movieId 추출
  const {
    query: { id },
  } = useRouter();
  const movieId = typeof id === 'string' ? id : '';

  // movieId가 없으면 에러 처리
  if (!movieId) {
    const error = new Error('Movie ID가 URL에서 찾을 수 없습니다');
    error.name = 'NotFoundError';
    throw error;
  }

  const { detailQuery, reviewsQuery } = useMovieDetailQuery(movieId);

  const getReleaseYear = (date: string): number => {
    if (!date) return 0;
    const newDay = dayjs(date);
    return newDay.year();
  };

  const changeTimeFormat = (time: number): string => {
    if (!time) return '0분';
    const formattedTime = dayjs.duration(time, 'minute').format('HH시간 mm분');
    return formattedTime;
  };

  return {
    movieData: detailQuery.data,
    reviews: reviewsQuery.data || [],
    getReleaseYear,
    changeTimeFormat,
  };
};

export default useMovieDetail;
