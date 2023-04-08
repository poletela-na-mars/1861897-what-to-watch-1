import {useState} from 'react';

import {FilmCard} from '../film-card/film-card';

import FilmType from '../../types/film-type';

type FilmListProps = {
  films: FilmType[];
};

export const FilmList = (props: FilmListProps): JSX.Element => {
  const [activeFilmCard, setActiveFilmCard] = useState<number>(NaN);
  return (
    <>
      {
        props.films.map((film) => (
          <FilmCard key={film.id} film={film} setActiveFilmCard={setActiveFilmCard} isActive={activeFilmCard === film.id} />
        ))
      }
    </>);
};
