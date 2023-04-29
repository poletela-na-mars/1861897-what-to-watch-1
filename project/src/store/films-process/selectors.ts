import { StateType } from '../../types/state-type';
import FilmType from '../../types/film-type';
import { ALL_GENRES, NameSpace } from '../../const';
import { createSelector } from 'reselect';

export const getFilms = (state: StateType): FilmType[] => state[NameSpace.Films].films;
export const getIsFilmsLoading = (state: StateType): boolean => state[NameSpace.Films].isFilmsLoading;
export const getGenre = (state: StateType): string => state[NameSpace.Films].currentGenre;
export const getPromoFilm = (state: StateType): FilmType | null => state[NameSpace.Films].promoFilm;
export const getFilteredFilms = createSelector(
  [getFilms, getGenre],
  (films, currentGenre) => currentGenre === ALL_GENRES ? films : films.filter((film) => film.genre === currentGenre),
);
