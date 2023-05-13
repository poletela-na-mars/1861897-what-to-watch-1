import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { ApiRoute } from '../const';
import {
  addReview,
  changeFavoriteStatusFilm,
  checkAuthorizationStatus,
  clearError,
  loadFavoriteFilms,
  loadFilmById,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  login,
  logout,
  redirectToRoute
} from './action';
import { getAuthData, getMockFilm, getMockFilms, getMockReviews, getMockUser } from '../utils/mocks';
import AuthorizationData from '../types/authorization-data-type';
import { AUTHORIZATION_TOKEN_KEY_NAME } from '../services/token';

jest.mock('../services/process-error-handle.ts');

describe('Async action', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
  const mockFilm = getMockFilm();
  const mockFilms = getMockFilms();
  const mockReviews = getMockReviews();
  const mockUser = getMockUser();

  it('should loadFilms.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(ApiRoute.Films).reply(200, mockFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadFilms());
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadFilms.pending.type,
      loadFilms.fulfilled.type,
    ]);
  });

  it('should loadFilmById.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${ApiRoute.Films}${1}`).reply(200, mockFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadFilmById(1));
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadFilmById.pending.type,
      loadFilmById.fulfilled.type,
    ]);
  });

  it('should loadReviews.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${ApiRoute.Reviews}${1}`).reply(200, mockReviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadReviews(1));
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadReviews.pending.type,
      loadReviews.fulfilled.type,
    ]);
  });

  it('should addReview.fulfilled, when server returned 200', async () => {
    const mockComment = {filmId: 1, comment: 'comment', rating: 1};

    const store = mockStore();
    mockAPI
      .onPost(`${ApiRoute.Reviews}1`, {comment: mockComment.comment, rating: mockComment.rating})
      .reply(200);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addReview(mockComment));
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReview.pending.type,
      redirectToRoute.type,
      addReview.fulfilled.type,
    ]);
  });

  it('should loadSimilarFilms.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${ApiRoute.Films}${1}${ApiRoute.Similar}`).reply(200, mockFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadSimilarFilms(1));
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadSimilarFilms.pending.type,
      loadSimilarFilms.fulfilled.type,
    ]);
  });

  it('should loadPromoFilm.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(ApiRoute.Promo).reply(200, mockFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadPromoFilm());
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadPromoFilm.pending.type,
      loadPromoFilm.fulfilled.type,
    ]);
  });

  it('should loadFavoriteFilms.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(ApiRoute.Favorite).reply(200, mockFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadFavoriteFilms());
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadFavoriteFilms.pending.type,
      loadFavoriteFilms.fulfilled.type,
    ]);
  });

  it('should changeFavoriteStatusFilm.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onPost(`${ApiRoute.Favorite}/1/0`).reply(200, mockFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(changeFavoriteStatusFilm({filmId: 1, status: true}));
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteStatusFilm.pending.type,
      changeFavoriteStatusFilm.fulfilled.type,
    ]);
  });

  it('should checkAuthorizationStatus.fulfilled, when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet(ApiRoute.Login).reply(200, mockUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthorizationStatus());
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthorizationStatus.pending.type,
      checkAuthorizationStatus.fulfilled.type,
    ]);
  });

  it('should login.fulfilled, when server returned 200', async () => {
    const mockAuthData: AuthorizationData = getAuthData();
    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    mockAPI.onPost(ApiRoute.Login, mockAuthData).reply(200, {token: 'secretToken'});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(login(mockAuthData));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      login.pending.type,
      redirectToRoute.type,
      login.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTHORIZATION_TOKEN_KEY_NAME, 'secretToken');
  });

  it('should logout.fulfilled, when server returned 204', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockAPI.onDelete(ApiRoute.Logout).reply(204);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logout());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTHORIZATION_TOKEN_KEY_NAME);
  });

  it('should clearError.fulfilled, when server returned 200', async () => {
    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(clearError());
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      clearError.pending.type,
      clearError.fulfilled.type,
    ]);
  });
});
