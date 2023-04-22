import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  fillFilms,
  filterFilmsByCurrentGenre,
  setAuthorizationStatus,
  setDataLoading, setError,
  setUser
} from './action';

import { ALL_GENRES, AuthorizationStatus, DEFAULT_GENRE } from '../const';
import FilmType from '../types/film-type';
import UserType from '../types/user-type';

const initState: {
  films: FilmType[];
  filteredFilms: FilmType[];
  currentGenre: string;
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user?: UserType;
  error: string | null;
} = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  error: null,
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
    }))
    .addCase(setAuthorizationStatus, ((state, action) => {
      state.authorizationStatus = action.payload;
    }))
    .addCase(setUser, ((state, action) => {
      state.user = action.payload;
    }))
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
}));

export default reducer;
