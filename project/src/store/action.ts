import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';

import FilmType from '../types/film-type';
import { AppDispatch, StateType } from '../types/state-type';
import UserType from '../types/user-type';
import AuthorizationData from '../types/authorization-data-type';
import ReviewType from '../types/review-type';
import { ApiRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';

export const changeGenre = createAction<{ newGenre: string }>('changeGenre');
export const filterFilmsByCurrentGenre = createAction('filterFilmsByCurrentGenre');
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const setFilmsLoading = createAction<boolean>('setFilmsLoading');
export const setFilmLoading = createAction<boolean>('setFilmLoading');
export const setReviewsLoading = createAction<boolean>('setReviewsLoading');
export const setSimilarFilmsLoading = createAction<boolean>('setSimilarFilmsLoading');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setUser = createAction<UserType | undefined>('setUser');
export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');
export const setError = createAction<string | null>('setError');
export const setCurrentFilm = createAction<FilmType>('setCurrentFilm');
export const setPromoFilm = createAction<FilmType>('setPromoFilm');
export const setReviews = createAction<ReviewType[]>('setReviews');
export const setSimilarFilms = createAction<FilmType[]>('setSimilarFilms');

export const loadFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<FilmType[]>(ApiRoute.Films);
    dispatch(fillFilms(data));
    dispatch(setFilmsLoading(false));
  }
);

export const loadFilmById = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadFilmById',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(setFilmLoading(true));
      const {data} = await api.get<FilmType>(`${ApiRoute.Films}${String(filmId)}`);
      dispatch(setCurrentFilm(data));
      dispatch(setFilmLoading(false));
    }catch {
      dispatch(setFilmLoading(false));
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const loadReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadReviews',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(setReviewsLoading(true));
      const {data} = await api.get<ReviewType[]>(`${ApiRoute.Reviews}${String(filmId)}`);
      dispatch(setReviews(data));
      dispatch(setReviewsLoading(false));
    } catch {
      dispatch(setReviewsLoading(false));
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const addReview = createAsyncThunk<void, { filmId: number; comment : string; rating : number}, {
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

export const loadSimilarFilms = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(setSimilarFilmsLoading(true));
      const {data} = await api.get<FilmType[]>(`${ApiRoute.Films}${String(filmId)}${ApiRoute.Similar}`);
      dispatch(setSimilarFilms(data));
      dispatch(setSimilarFilmsLoading(false));
    }catch {
      dispatch(setSimilarFilmsLoading(false));
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const loadPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'loadPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmType>(ApiRoute.Promo);
    dispatch(setPromoFilm(data));
  }
);

export const checkAuthorizationStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'checkAuthorizationStatus',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserType>(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }

  }
);

export const login = createAsyncThunk<void, AuthorizationData, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'login',
  async (authorizationData, {dispatch, extra: api}) => {
    const {data} = await api.post<UserType>(ApiRoute.Login, authorizationData);
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
    dispatch(redirectToRoute(AppRoute.MainPage));
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(undefined));
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
