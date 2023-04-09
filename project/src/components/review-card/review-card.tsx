import ReviewType from '../../types/review-type';

type ReviewProps = {
  review: ReviewType;
};

const getShortDateString = (dateString: string): string => {
  const date = new Date(dateString);

  return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const getLongDateString = (dateString: string): string => {
  const date = new Date(dateString);

  return `${date.toLocaleString('en-US', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`;
};

export const ReviewCard = (props: ReviewProps): JSX.Element => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{props.review.comment}</p>

      <footer className="review__details">
        <cite className="review__author">{props.review.user.name}</cite>
        <time className="review__date" dateTime={getShortDateString(props.review.date)}>{getLongDateString(props.review.date)}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{props.review.rating}</div>
  </div>
);
