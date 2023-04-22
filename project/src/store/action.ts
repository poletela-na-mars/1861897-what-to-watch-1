import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import FilmType from '../types/film-type';
import { AppDispatch, StateType } from '../types/state-type';
import {ApiRoute} from '../const';

export const changeGenre = createAction<{newGenre: string}>('changeGenre');
export const filterFilmsByCurrentGenre = createAction('filterFilmsByCurrentGenre');
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const setDataLoading = createAction<boolean>('setDataLoading');

export const loadFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadFilm',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoading(true));
    const {data} = await api.get<FilmType[]>(ApiRoute.Films);
    dispatch(fillFilms(data));
    dispatch(setDataLoading(false));
  }
);
