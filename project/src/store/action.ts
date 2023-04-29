import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';

import FilmType from '../types/film-type';
import { AppDispatch, StateType } from '../types/state-type';
import UserType from '../types/user-type';
import AuthorizationData from '../types/authorization-data-type';
import ReviewType from '../types/review-type';
import { ApiRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { setError } from './error-process/error-process';

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');

export const loadFilms = createAsyncThunk<FilmType[], undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmType[]>(ApiRoute.Films);
    return data;
  }
);

export const loadFilmById = createAsyncThunk<FilmType | undefined, number, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadFilmById',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<FilmType>(`${ApiRoute.Films}${String(filmId)}`);
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const loadReviews = createAsyncThunk<ReviewType[] | undefined, number, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadReviews',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<ReviewType[]>(`${ApiRoute.Reviews}${String(filmId)}`);
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const addReview = createAsyncThunk<void, { filmId: number; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'addReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    await api.post<ReviewType[]>(`${ApiRoute.Reviews}${String(filmId)}`, {comment, rating});
    dispatch(redirectToRoute(`${ApiRoute.Films}${String(filmId)}`));
  }
);

export const loadSimilarFilms = createAsyncThunk<FilmType[] | undefined, number, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<FilmType[]>(`${ApiRoute.Films}${String(filmId)}${ApiRoute.Similar}`);
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const loadPromoFilm = createAsyncThunk<FilmType, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmType>(ApiRoute.Promo);
    return data;
  }
);

export const checkAuthorizationStatus = createAsyncThunk<UserType, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'checkAuthorizationStatus',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserType>(ApiRoute.Login);
    return data;
  }
);

export const login = createAsyncThunk<UserType, AuthorizationData, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'login',
  async (authorizationData, {dispatch, extra: api}) => {
    const {data} = await api.post<UserType>(ApiRoute.Login, authorizationData);
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.MainPage));
    return data;
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

export const clearError = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>('clearError', (_arg, {dispatch}) => {
  setTimeout(() => {
    dispatch(setError(null));
  }, TIMEOUT_SHOW_ERROR);
});
