import { getMockFilm, getMockFilms, getMockReviews } from '../../utils/mocks';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {
  changeFavoriteStatusFilm,
  loadFavoriteFilms,
  loadFilmById,
  loadReviews,
  loadSimilarFilms,
  redirectToRoute
} from '../../store/action';
import Film from './film';

jest.mock('../../services/process-error-handle.ts');
const mockFilm = getMockFilm();
const mockFilms = getMockFilms();
const mockReviews = getMockReviews();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  Action,
  ThunkDispatch<StateType, typeof api, Action>
>(middlewares);
let store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Film]: {
    currentFilm: mockFilm,
    similarFilms: mockFilms,
    reviews: mockReviews,
  },
  [NameSpace.Films]: {
    favoriteFilms: mockFilms,
  }
});

describe('Film', () => {
  beforeEach(() => {
    store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Film]: {
        currentFilm: mockFilm,
        similarFilms: mockFilms,
        reviews: mockReviews,
      },
      [NameSpace.Films]: {
        favoriteFilms: mockFilms,
      }
    });
  });

  it('should render correctly, when authorizationStatus is Auth', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Film />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Review/i)).toBeInTheDocument();
  });

  it('should render correctly, when authorizationStatus is NoAuth', () => {
    store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.Film]: {
        currentFilm: mockFilm,
        similarFilms: mockFilms,
        reviews: mockReviews,
      },
      [NameSpace.Films]: {
        favoriteFilms: mockFilms,
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Film />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });

  it('should redirect to AppRoute.Player, when click play button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Player} element={<p>Player</p>}/>
            <Route path="*" element={<Film />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('play-button'));

    expect(screen.getByText(/Player/i)).toBeInTheDocument();
  });

  it('should redirect to AppRoute.AddReview, when click add review button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.AddReview} element={<p>AddReview</p>}/>
            <Route path="*" element={<Film />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('add-review-button'));

    expect(screen.getByText(/AddReview/i)).toBeInTheDocument();
  });

  it('should redirect to AppRoute.SignIn, when click toMyList button and authorizationStatus is NoAuth', async () => {
    store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.Film]: {
        currentFilm: mockFilm,
        similarFilms: mockFilms,
        reviews: mockReviews,
      },
      [NameSpace.Films]: {
        favoriteFilms: mockFilms,
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Film />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('to-my-list-button'));

    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    expect(store.getActions().map(({type}) => type)).toStrictEqual([
      loadFilmById.pending.type,
      loadReviews.pending.type,
      loadSimilarFilms.pending.type,
      redirectToRoute(AppRoute.SignIn).type,
    ]);
  });

  it('should add film to myList, when click toMyList button and authorizationStatus is Auth', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Film />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('to-my-list-button'));

    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    expect(store.getActions().map(({type}) => type)).toStrictEqual([
      loadFavoriteFilms.pending.type,
      loadFilmById.pending.type,
      loadReviews.pending.type,
      loadSimilarFilms.pending.type,
      changeFavoriteStatusFilm.pending.type,
    ]);
  });
});
