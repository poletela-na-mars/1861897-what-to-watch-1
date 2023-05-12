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
  loadFavoriteFilms, loadFilmById, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms, redirectToRoute
} from './action';
import { getMockFilm, getMockFilms, getMockReviews, getMockUser } from '../utils/mocks';
import { type } from '@testing-library/user-event/utility/type';


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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

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
    const actions = store.getActions().map(({type: A}) => type);

    expect(actions).toEqual([
      checkAuthorizationStatus.pending.type,
      checkAuthorizationStatus.fulfilled.type,
    ]);
  });

  it('should clearError.fulfilled, when server returned 200', async () => {
    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(clearError());
    const actions = store.getActions().map(({type: A}) => type);

    expect(actions).toEqual([
      clearError.pending.type,
      clearError.fulfilled.type,
    ]);
  });
});
