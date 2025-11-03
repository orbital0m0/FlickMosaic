import { Genre } from '@/types/Movie';

export type CarouselProps = {
  id: number;
  rank?: number;
  image: string;
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
};

export type MovieCardProps = {
  type: 'movie';
  slide: CarouselProps;
  layout: 'overlay' | 'top' | 'left' | 'none';
  priority?: boolean;
};

export type GenredCardProps = { type: 'genres'; slide: Genre; layout: 'overlay' | 'top' | 'left' | 'none' };
