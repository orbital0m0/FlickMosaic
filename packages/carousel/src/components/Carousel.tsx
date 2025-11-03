import React, { createContext, useContext } from 'react';

import Button from './Button';
import useCarousel from '../hooks/useCarousel';
import { CarouselContextType, RootProps, TrackProps, ArticleProps } from '../types/Carousel';
import '../styles/Carousel.css';

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

const useCarouselContext = (): CarouselContextType => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within Carousel.Root');
  }
  return context;
};

const Root: React.FC<RootProps> = ({ height, articleWidth, slides = [], children }): React.JSX.Element => {
  const carouselHooks = useCarousel({ articleWidth, slides: slides });

  if (!slides || slides.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <CarouselContext.Provider value={carouselHooks}>
      <div ref={carouselHooks.containerRef} className="slider-container" style={{ height: `${height}px` }}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const LeftButton: React.FC = (): React.JSX.Element => {
  const { handlePrev } = useCarouselContext();

  return (
    <Button onClick={handlePrev} className="slider-button slider-button-prev" aria-label="이전 슬라이드">
      &#8249;
    </Button>
  );
};

const RightButton: React.FC = (): React.JSX.Element => {
  const { handleNext } = useCarouselContext();

  return (
    <Button onClick={handleNext} className="slider-button slider-button-next" aria-label="다음 슬라이드">
      &#8250;
    </Button>
  );
};

const Track: React.FC<TrackProps> = ({ children, articleWidth }): React.JSX.Element => {
  const { trackRef, transitionEnabled, displayIndex, clonedSlides } = useCarouselContext();

  return (
    <div
      ref={trackRef}
      className={`slider-track ${!transitionEnabled ? 'no-transition' : ''}`}
      style={{
        transform: `translateX(-${displayIndex * articleWidth}px)`,
        width: `${clonedSlides.length * articleWidth}px`,
      }}
    >
      {children}
    </div>
  );
};

const Article: React.FC<ArticleProps> = ({ articleWidth, layout = 'overlay', children }): React.JSX.Element => {
  const { clonedSlides, handleTransitionEnd } = useCarouselContext();

  return (
    <>
      {clonedSlides.map((slide, index) => (
        <article
          key={`${slide.id}-${index}`}
          className={`slider-article slider-article-${layout}`}
          style={{ width: `${articleWidth}px` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {children(slide, index)}
        </article>
      ))}
    </>
  );
};

// 컴파운드 컴포넌트 구조
const Carousel = {
  Root,
  LeftButton,
  RightButton,
  Track,
  Article,
};

export default Carousel;
