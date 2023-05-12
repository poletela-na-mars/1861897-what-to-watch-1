import { createSlice } from '@reduxjs/toolkit';

import { changeFavoriteStatusFilm, loadFilmById, loadPromoFilm, loadReviews, loadSimilarFilms } from '../action';

import { FilmProcess } from '../../types/state-type';
import { NameSpace } from '../../const';

const initialState: FilmProcess = {
  currentFilm: null,
  isFilmLoading: false,
  isReviewsLoading: false,
  isSimilarFilmsLoading: false,
  reviews: [],
  similarFilms: [],
  promoFilm: null,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(loadFilmById.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(loadFilmById.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentFilm = action.payload;
        }
        state.isFilmLoading = false;
      })
      .addCase(loadFilmById.rejected, (state) => {
        state.isFilmLoading = false;
      })
      .addCase(loadSimilarFilms.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(loadSimilarFilms.fulfilled, (state, action) => {
        if (action.payload) {
          state.similarFilms = action.payload;
        }
        state.isSimilarFilmsLoading = false;
      })
      .addCase(loadSimilarFilms.rejected, (state) => {
        state.isSimilarFilmsLoading = false;
      })
      .addCase(loadReviews.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        if (action.payload) {
          state.reviews = action.payload;
        }
        state.isReviewsLoading = false;
      })
      .addCase(loadReviews.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(loadPromoFilm.fulfilled, (state, action) => {
        if (action.payload) {
          state.promoFilm = action.payload;
        }
      })
      .addCase(changeFavoriteStatusFilm.fulfilled, (state, action) => {
        if (state.currentFilm && state.currentFilm.id === action.payload.id){
          state.currentFilm = action.payload;
        }
        if (state.promoFilm && state.promoFilm.id === action.payload.id){
          state.promoFilm = action.payload;
        }
      });
  }
});
