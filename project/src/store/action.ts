import {createAction} from '@reduxjs/toolkit';
import FilmType from '../types/film-type';

export const changeGenre = createAction<{newGenre: string}>('changeGenre');
export const filterFilmsByCurrentGenre = createAction('getFilteredFilms');
export const fillFilms = createAction<FilmType[]>('fillFilms');
