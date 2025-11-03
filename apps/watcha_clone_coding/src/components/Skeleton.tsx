import React, { memo } from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = memo(
  ({ width = '100%', height = '20px', borderRadius = '4px', className = '', style = {} }) => {
    return (
      <div
        className={`skeleton ${className}`}
        style={{
          width,
          height,
          borderRadius,
          ...style,
        }}
        aria-hidden="true"
        role="presentation"
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

// 오버레이 레이아웃 영화 카드 스켈레톤
const OverlayMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-movie-card skeleton-movie-card-overlay">
      <Skeleton height="642px" borderRadius="8px" />
      <div className="skeleton-overlay-content">
        <Skeleton width="60%" height="32px" style={{ marginBottom: '12px' }} />
        <Skeleton width="80%" height="20px" style={{ marginBottom: '8px' }} />
        <Skeleton width="40%" height="16px" />
      </div>
    </div>
  );
});

OverlayMovieCardSkeleton.displayName = 'OverlayMovieCardSkeleton';

// 상단 레이아웃 영화 카드 스켈레톤
const TopMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-movie-card skeleton-movie-card-top">
      <Skeleton height="289px" borderRadius="8px" />
      <div className="skeleton-top-content">
        <Skeleton width="90%" height="20px" style={{ marginBottom: '8px' }} />
        <Skeleton width="70%" height="16px" />
      </div>
    </div>
  );
});

TopMovieCardSkeleton.displayName = 'TopMovieCardSkeleton';

// 좌측 레이아웃 영화 카드 스켈레톤
const LeftMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-movie-card skeleton-movie-card-left">
      <Skeleton width="80px" height="120px" borderRadius="4px" />
      <div className="skeleton-left-content">
        <Skeleton width="24px" height="24px" borderRadius="50%" />
      </div>
    </div>
  );
});

LeftMovieCardSkeleton.displayName = 'LeftMovieCardSkeleton';

// 콘텐츠 없는 영화 카드 스켈레톤
const NoneMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-movie-card skeleton-movie-card-none">
      <Skeleton height="164px" borderRadius="8px" />
    </div>
  );
});

NoneMovieCardSkeleton.displayName = 'NoneMovieCardSkeleton';

// 캐러셀용 스켈레톤
const CarouselSkeleton: React.FC<{
  height: number;
  articleWidth: number;
  layout?: 'overlay' | 'top' | 'left' | 'none';
  count?: number;
}> = memo(({ height, articleWidth, layout = 'top', count = 5 }) => {
  // 레이아웃에 따라 적절한 스켈레톤 컴포넌트를 렌더링하는 함수
  const renderMovieCardSkeleton = () => {
    switch (layout) {
      case 'overlay':
        return <OverlayMovieCardSkeleton />;
      case 'left':
        return <LeftMovieCardSkeleton />;
      case 'none':
        return <NoneMovieCardSkeleton />;
      case 'top':
      default:
        return <TopMovieCardSkeleton />;
    }
  };

  return (
    <div className="skeleton-carousel" style={{ height: `${height}px` }}>
      <div className="skeleton-carousel-track" style={{ width: `${articleWidth * count}px` }}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="skeleton-carousel-article" style={{ width: `${articleWidth}px` }}>
            {renderMovieCardSkeleton()}
          </div>
        ))}
      </div>
    </div>
  );
});

CarouselSkeleton.displayName = 'CarouselSkeleton';

// 페이지 전체 로딩용 스켈레톤
const PageSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-page">
      {/* 탭 스켈레톤 */}
      <div className="skeleton-tabs">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} width="120px" height="40px" borderRadius="20px" />
        ))}
      </div>

      {/* 메인 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <CarouselSkeleton height={642} articleWidth={1140} layout="overlay" count={3} />
      </section>

      {/* 추천 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <CarouselSkeleton height={289} articleWidth={421} layout="top" count={4} />
      </section>

      {/* Top 20 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <Skeleton width="200px" height="28px" style={{ marginBottom: '16px' }} />
        <CarouselSkeleton height={200} articleWidth={400} layout="left" count={5} />
      </section>

      {/* 새로 올라온 콘텐츠 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <Skeleton width="180px" height="28px" style={{ marginBottom: '16px' }} />
        <CarouselSkeleton height={164} articleWidth={290} layout="none" count={6} />
      </section>
    </div>
  );
});

PageSkeleton.displayName = 'PageSkeleton';

// 상세 페이지용 스켈레톤
const DetailPageSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-detail-page">
      <div className="skeleton-detail-header">
        <div className="skeleton-detail-info">
          {/* 영화 제목 */}
          <div className="skeleton-detail-title">
            <Skeleton width="80%" height="48px" style={{ marginBottom: '16px' }} />
          </div>

          {/* 영화 메타 정보 */}
          <div className="skeleton-detail-meta">
            <Skeleton width="80px" height="20px" />
            <Skeleton width="60px" height="20px" />
            <Skeleton width="100px" height="20px" />
          </div>

          {/* 영화 개요 */}
          <div className="skeleton-detail-overview">
            <Skeleton width="100%" height="66px" style={{ marginTop: '16px' }} />
          </div>

          {/* 평점 정보 */}
          <div className="skeleton-detail-rating">
            <div className="skeleton-vote-average">
              <Skeleton width="60px" height="44px" />
              <Skeleton width="80px" height="20px" style={{ marginTop: '4px' }} />
            </div>
            <div className="skeleton-vote-count">
              <Skeleton width="80px" height="44px" />
              <Skeleton width="60px" height="20px" style={{ marginTop: '4px' }} />
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="skeleton-detail-actions">
            <div className="skeleton-purchase-section">
              <Skeleton width="120px" height="40px" style={{ marginRight: '10px' }} />
              <Skeleton width="120px" height="40px" />
            </div>
            <div className="skeleton-evaluation-section">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} width="120px" height="78px" borderRadius="6px" />
              ))}
            </div>
          </div>
        </div>

        <div className="skeleton-detail-image">
          <Skeleton height="100%" borderRadius="8px" />
        </div>
      </div>

      <div className="skeleton-detail-sections">
        {/* 관련 콘텐츠 섹션 */}
        <section className="skeleton-section">
          <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="skeleton-collection">
            <Skeleton width="200px" height="288px" borderRadius="4px" />
          </div>
        </section>

        {/* 관련 동영상 섹션 */}
        <section className="skeleton-section">
          <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="skeleton-videos">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="skeleton-video-item">
                <Skeleton width="100%" height="20px" style={{ marginBottom: '8px' }} />
                <Skeleton width="60px" height="16px" />
              </div>
            ))}
          </div>
        </section>

        {/* 감독/출연 섹션 */}
        <section className="skeleton-section">
          <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="skeleton-members">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="skeleton-member-item">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <div className="skeleton-member-info">
                  <Skeleton width="100px" height="22px" style={{ marginBottom: '2px' }} />
                  <Skeleton width="80px" height="18px" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 리뷰 섹션 */}
        <section className="skeleton-section">
          <Skeleton width="200px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="skeleton-reviews">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="skeleton-review-item">
                <Skeleton width="38px" height="38px" borderRadius="50%" />
                <div className="skeleton-review-content">
                  <Skeleton width="120px" height="22px" style={{ marginBottom: '8px' }} />
                  <Skeleton width="100%" height="60px" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

DetailPageSkeleton.displayName = 'DetailPageSkeleton';

// 검색 홈 페이지용 스켈레톤
const SearchHomePageSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-search-home">
      {/* 인기 검색어 섹션 */}
      <section className="skeleton-popular-keyword">
        <div className="skeleton-popular-header">
          <Skeleton width="200px" height="32px" style={{ marginBottom: '24px' }} />
        </div>
        <div className="skeleton-popular-content">
          <div className="skeleton-trending-list">
            <div className="skeleton-tabs">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} width="100px" height="36px" borderRadius="18px" />
              ))}
            </div>
            <div className="skeleton-trending-items">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="skeleton-trending-item">
                  <Skeleton width="24px" height="24px" borderRadius="50%" />
                  <Skeleton width="200px" height="20px" />
                </div>
              ))}
            </div>
          </div>
          <div className="skeleton-background-img">
            <Skeleton height="400px" borderRadius="8px" />
          </div>
        </div>
      </section>

      {/* 장르별 영화 섹션 */}
      <section className="skeleton-category">
        <div className="skeleton-category-header">
          <Skeleton width="150px" height="28px" style={{ marginBottom: '8px' }} />
          <Skeleton width="300px" height="20px" />
        </div>
        <CarouselSkeleton height={180} articleWidth={319} layout="overlay" count={4} />
      </section>
    </div>
  );
});

SearchHomePageSkeleton.displayName = 'SearchHomePageSkeleton';

// 검색 결과 페이지용 스켈레톤
const SearchResultPageSkeleton: React.FC = memo(() => {
  return (
    <div className="skeleton-search-result">
      {/* 검색 결과 헤더 */}
      <div className="skeleton-search-header">
        <Skeleton width="300px" height="32px" style={{ marginBottom: '8px' }} />
        <Skeleton width="100px" height="20px" />
      </div>

      {/* 검색 결과 그리드 */}
      <div className="skeleton-search-grid">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="skeleton-search-item">
            <Skeleton height="200px" borderRadius="8px" />
            <Skeleton width="80%" height="16px" style={{ marginTop: '8px' }} />
          </div>
        ))}
      </div>
    </div>
  );
});

SearchResultPageSkeleton.displayName = 'SearchResultPageSkeleton';

const SkeletonComponents = {
  Skeleton,
  OverlayMovieCardSkeleton,
  TopMovieCardSkeleton,
  LeftMovieCardSkeleton,
  NoneMovieCardSkeleton,
  CarouselSkeleton,
  PageSkeleton,
  DetailPageSkeleton,
  SearchHomePageSkeleton,
  SearchResultPageSkeleton,
} as const;

export default SkeletonComponents;
export {
  Skeleton,
  OverlayMovieCardSkeleton,
  TopMovieCardSkeleton,
  LeftMovieCardSkeleton,
  NoneMovieCardSkeleton,
  CarouselSkeleton,
  PageSkeleton,
  DetailPageSkeleton,
  SearchHomePageSkeleton,
  SearchResultPageSkeleton,
};
