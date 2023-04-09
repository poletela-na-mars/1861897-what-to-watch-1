import {FilmList} from '../film-list/film-list';

import FilmType from '../../types/film-type';

type RelatedFilmsProps = {
  films: FilmType[];
  currentFilm: FilmType;
};

export const RelatedFilms = (props : RelatedFilmsProps): JSX.Element => {
  const relatedFilms = props.films
    .filter((currentFilm) => (currentFilm.genre === props.currentFilm.genre && currentFilm.id !== props.currentFilm.id))
    .slice(0, 4);

  return (<FilmList films={relatedFilms} />);
};
