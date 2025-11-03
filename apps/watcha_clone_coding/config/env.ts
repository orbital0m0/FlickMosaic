// config/env.ts
// Next.js 환경변수 설정
export const config = {
  tmdbApiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  tmdbBaseUrl: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  tmdbImageUrl: process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/w1280',
};

// 환경변수 검증 (개발 환경에서만)
if (process.env.NODE_ENV === 'development' && !config.tmdbApiKey) {
  console.warn('NEXT_PUBLIC_TMDB_API_KEY가 설정되지 않았습니다. 개발 환경에서는 API 호출이 제한될 수 있습니다.');
}

// 프로덕션 환경에서는 API 키가 반드시 필요
if (process.env.NODE_ENV === 'production' && !config.tmdbApiKey) {
  throw new Error('NEXT_PUBLIC_TMDB_API_KEY가 설정되지 않았습니다. 프로덕션 배포를 위해 API 키를 설정해주세요.');
}

// 서버 사이드에서 빌드 시 체크
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  if (!process.env.NEXT_PUBLIC_TMDB_API_KEY) {
    throw new Error('NEXT_PUBLIC_TMDB_API_KEY가 설정되지 않았습니다.');
  }
}
