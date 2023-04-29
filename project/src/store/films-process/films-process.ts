import { FilmsProcess } from '../../types/state-type';
import { DEFAULT_GENRE, NameSpace } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFilms, loadFavoriteFilms } from '../action';

const initialState: FilmsProcess = {
  currentGenre: DEFAULT_GENRE,
  films: [],
  isFilmsLoading: false,
  favoriteFilms: [],
  isFavoriteFilmsLoading: false,
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
        if (action.payload){
          state.films = action.payload;
        }
        state.isFilmsLoading = false;
      })
      .addCase(loadFavoriteFilms.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(loadFavoriteFilms.fulfilled, (state, action) => {
        if (action.payload){
          state.favoriteFilms = action.payload;
        }
        state.isFavoriteFilmsLoading = false;
      });
  }
});

export const {changeGenre} = filmsProcess.actions;
