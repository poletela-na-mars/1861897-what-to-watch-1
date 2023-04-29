import { FilmsProcess } from '../../types/state-type';
import { DEFAULT_GENRE, NameSpace } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFilms, loadPromoFilm } from '../action';

const initialState: FilmsProcess = {
  currentGenre: DEFAULT_GENRE,
  films: [],
  isFilmsLoading: false,
  promoFilm: null,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(loadFilms.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(loadFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsLoading = false;
      })
      .addCase(loadPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
  }
});

export const {changeGenre} = filmsProcess.actions;
