import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillFilms, filterFilmsByCurrentGenre, setDataLoading } from './action';

import { ALL_GENRES, DEFAULT_GENRE } from '../const';
import FilmType from '../types/film-type';

const initState: {
  films: FilmType[];
  filteredFilms: FilmType[];
  currentGenre: string;
  isDataLoading: boolean;
} = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  isDataLoading: false,
};

const reducer = createReducer(initState, ((builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload.newGenre;
    })
    .addCase(fillFilms, ((state, action) => {
      state.films = action.payload;
    }))
    .addCase(filterFilmsByCurrentGenre, (state) => {
      state.filteredFilms = state.currentGenre === ALL_GENRES ? state.films :
        state.films.filter((film) => film.genre === state.currentGenre);
    })
    .addCase(setDataLoading, ((state, action) => {
      state.isDataLoading = action.payload;
    }));
}));

export default reducer;
