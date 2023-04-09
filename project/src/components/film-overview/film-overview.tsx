import FilmType from '../../types/film-type';

type FilmOverviewProps = {
  film: FilmType;
};

const getRatingLevel = (ratingCount: number): string => {
  let ratingLevel;
  if (ratingCount < 3) {
    ratingLevel = 'Bad';
  } else if (ratingCount < 5) {
    ratingLevel = 'Normal';
  } else if (ratingCount < 8) {
    ratingLevel = 'Good';
  } else if (ratingCount < 10) {
    ratingLevel = 'Very good';
  } else {
    ratingLevel = 'Awesome';
  }
  return ratingLevel;
};

export const FilmOverview = (props: FilmOverviewProps): JSX.Element => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{props.film.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{getRatingLevel(props.film.rating)}</span>
        <span className="film-rating__count">{props.film.scoresCount} ratings</span>
      </p>
    </div>

    <div className="film-card__text">
      <p>{props.film.description}</p>

      <p className="film-card__director"><strong>Director: {props.film.director}</strong></p>

      <p className="film-card__starring">
        <strong>Starring: {props.film.starring.join(', ')}</strong>
      </p>
    </div>
  </>
);
