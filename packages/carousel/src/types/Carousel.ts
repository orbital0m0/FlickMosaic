import React, { ReactNode } from 'react';

import { Genre } from '../types/Movie';

export type CarouselProps = {
  id: number;
  rank?: number;
  image: string;
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
};

export interface CarouselContextType {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  transitionEnabled: boolean;
  displayIndex: number;
  clonedSlides: (CarouselProps | Genre)[];
  handleTransitionEnd: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export interface RootProps {
  height: number;
  articleWidth: number;
  slides: (CarouselProps | Genre)[];
  children: ReactNode;
}

export interface TrackProps {
  children: ReactNode;
  articleWidth: number;
}

export interface ArticleProps {
  articleWidth: number;
  layout?: 'overlay' | 'top' | 'left' | 'none';
  children: (slide: CarouselProps | Genre, index: number) => ReactNode;
}

export type MovieCardProps = { type: 'movie'; slide: CarouselProps; layout: 'overlay' | 'top' | 'left' | 'none' };

export type GenredCardProps = { type: 'genres'; slide: Genre; layout: 'overlay' | 'top' | 'left' | 'none' };
