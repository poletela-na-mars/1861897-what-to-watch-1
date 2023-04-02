import {Link} from 'react-router-dom';

import FilmType from '../../types/film-type';

type FilmCardProps = {
  film: FilmType;
  setActiveFilmCard: (id: number) => void;
};

export const FilmCard = (props: FilmCardProps): JSX.Element => (
  <article
    className="small-film-card catalog__films-card"
    onMouseEnter={() => props.setActiveFilmCard(props.film.id)}
    onMouseLeave={() => props.setActiveFilmCard(NaN)}
  >
    <div className="small-film-card__image">
      <img src={props.film.posterImage} alt={props.film.name} width="280" height="175" />
    </div>
    <h3 className="small-film-card__title">
      <Link to={`/films/${props.film.id}`} className="small-film-card__link">{props.film.name}</Link>
    </h3>
  </article>
);
