import React, {MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';

import { getFilms, getGenre } from '../../store/films-process/selectors';
import { changeGenre } from '../../store/films-process/films-process';

import {ALL_GENRES} from '../../const';

type GenresListProps = {
  buttonClickHandler: () => void;
}

export const GenresList = (props: GenresListProps): JSX.Element => {
  const currentGenre = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);

  const genres = [ALL_GENRES, ...Array.from(new Set([ ...films.map((film) => film.genre)].sort()))];
  const dispatch = useAppDispatch();

  const handleGenreChange = (event: MouseEvent<HTMLAnchorElement>, genre: string) => {
    event.preventDefault();
    dispatch(changeGenre(genre));
    props.buttonClickHandler();
  };

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`}>
          <a href='#' className='catalog__genres-link' onClick={(event) => handleGenreChange(event, genre)}>{genre}</a>
        </li>
      ))}
    </ul>
  );
};
