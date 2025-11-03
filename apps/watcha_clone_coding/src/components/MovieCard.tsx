import Link from 'next/link';

import { MovieCardProps } from '@/types/Carousel';

const MovieCard = (props: MovieCardProps) => {
  return (
    <Link href={`/movie/${props.slide.id}`}>
      <div className={`slider-card slider-card-${props.layout}`}>
        <div className="slider-image-container">
          <img
            src={props.slide.image}
            alt={props.slide.title}
            className="slider-image"
            loading={props.priority ? 'eager' : 'lazy'}
          />
        </div>
        <div className={`slider-content slider-content-${props.layout}`}>
          {props.layout !== 'left' && <h3 className="slider-title">{props.slide.title}</h3>}
          {props.slide.description && props.layout !== 'none' && props.layout !== 'left' && (
            <p className="slider-description">{props.slide.description}</p>
          )}
          {props.layout === 'left' && (
            <span className="slider-content-rank" data-rank={props.slide.rank}>
              {props.slide.rank}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
