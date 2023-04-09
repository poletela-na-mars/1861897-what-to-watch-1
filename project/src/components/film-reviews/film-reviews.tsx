import {ReviewCard} from '../review-card/review-card';

import ReviewType from '../../types/review-type';

type FilmReviewsProps = {
  reviews: ReviewType[];
};


export const FilmReviews = (props: FilmReviewsProps) => {
  const middleReviewsList = (props.reviews.length + props.reviews.length % 2) / 2;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {props.reviews.slice(0, middleReviewsList).map((review) => <ReviewCard key={review.id} review={review} />)}
      </div>


      <div className="film-card__reviews-col">
        {props.reviews.slice(middleReviewsList).map((review) => <ReviewCard key={review.id} review={review} />)}
      </div>
    </div>
  );
};
