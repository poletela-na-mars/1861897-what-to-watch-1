import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  fillFilms,
  filterFilmsByCurrentGenre,
  setAuthorizationStatus, setCurrentFilm,
  setError, setFilmLoading, setFilmsLoading, setPromoFilm, setReviews, setReviewsLoading,
  setSimilarFilms,
  setSimilarFilmsLoading,
  setUser
} from './action';

import { ALL_GENRES, AuthorizationStatus, DEFAULT_GENRE } from '../const';
import FilmType from '../types/film-type';
import UserType from '../types/user-type';
import ReviewType from '../types/review-type';

const initState: {
  films: FilmType[];
  filteredFilms: FilmType[];
  currentGenre: string;
  isFilmsLoading: boolean;
  isFilmLoading: boolean;
  isReviewsLoading: boolean;
  isSimilarFilmsLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user?: UserType;
  error: string | null;
  currentFilm: FilmType | null;
  promoFilm: FilmType | null;
  reviews: ReviewType[];
  similarFilms: FilmType[];
} = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  isFilmsLoading: false,
  isFilmLoading: false,
  isReviewsLoading: false,
  isSimilarFilmsLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  error: null,
  currentFilm: null,
  promoFilm: null,
  reviews: [],
  similarFilms: [],
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
    .addCase(setFilmsLoading, ((state, action) => {
      state.isFilmsLoading = action.payload;
    }))
    .addCase(setFilmLoading, ((state, action) => {
      state.isFilmLoading = action.payload;
    }))
    .addCase(setReviewsLoading, ((state, action) => {
      state.isReviewsLoading = action.payload;
    }))
    .addCase(setSimilarFilmsLoading, ((state, action) => {
      state.isSimilarFilmsLoading = action.payload;
    }))
    .addCase(setAuthorizationStatus, ((state, action) => {
      state.authorizationStatus = action.payload;
    }))
    .addCase(setUser, ((state, action) => {
      state.user = action.payload;
    }))
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    });
}));

export default reducer;
