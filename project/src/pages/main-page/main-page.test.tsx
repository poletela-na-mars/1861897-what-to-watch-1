import { getMockExtendedFilms, getMockFilm, getMockFilms } from '../../utils/mocks';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { ALL_GENRES, AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { changeFavoriteStatusFilm, loadFavoriteFilms, redirectToRoute } from '../../store/action';
import MainPage from './main-page';

jest.mock('../../services/process-error-handle.ts');
describe('MainPage', () => {
  const mockFilm = getMockFilm();
  const mockFilms = getMockFilms();
  const mockExtendedFilms = getMockExtendedFilms();
  const api = createApi();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
  let store = mockStore({
    [NameSpace.Film]: {
      isFilmLoading: false,
      isSimilarFilmsLoading: false,
      isReviewsLoading: false,
      currentFilm: mockFilm,
      similarFilms: [],
      reviews: [],
      promoFilm: mockFilm,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    [NameSpace.Films]: {
      favoriteFilms: [],
      films: mockExtendedFilms,
    }
  });

  beforeEach(() => {
    store = mockStore({
      [NameSpace.Film]: {
        isFilmLoading: false,
        isSimilarFilmsLoading: false,
        isReviewsLoading: false,
        currentFilm: mockFilm,
        similarFilms: [],
        reviews: [],
        promoFilm: mockFilm,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        favoriteFilms: [],
        films: mockExtendedFilms,
        currentGenre: ALL_GENRES,
      }
    });
  });

  it('should render correctly, when NoAuth', () => {
    store = mockStore({
      [NameSpace.Film]: {
        isFilmLoading: false,
        isSimilarFilmsLoading: false,
        isReviewsLoading: false,
        currentFilm: mockFilm,
        similarFilms: [],
        reviews: [],
        promoFilm: mockFilm,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.Films]: {
        favoriteFilms: [],
        films: mockFilms,
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly, when Auth', () => {
    store = mockStore({
      [NameSpace.Film]: {
        isFilmLoading: false,
        isSimilarFilmsLoading: false,
        isReviewsLoading: false,
        currentFilm: mockFilm,
        similarFilms: [],
        reviews: [],
        promoFilm: mockFilm,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        favoriteFilms: [],
        films: mockFilms,
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render showMoreButton, when count films > 8', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });

  it('should add film, when click showMoreButton', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();

    const filmCardsBeforeClick = screen.getAllByTestId('card-link');
    expect(filmCardsBeforeClick.length).toBe(8);


    await userEvent.click(screen.getByText(/Show more/i));
    expect(screen.queryByText(/Show more/i)).not.toBeInTheDocument();

    const filmCardsAfterClick = screen.getAllByTestId('card-link');
    expect(filmCardsAfterClick.length).toBe(mockExtendedFilms.length);
  });

  it('should not render showMoreButton, when count films < 8', () => {
    store = mockStore({
      [NameSpace.Film]: {
        isFilmLoading: false,
        isSimilarFilmsLoading: false,
        isReviewsLoading: false,
        currentFilm: mockFilm,
        similarFilms: [],
        reviews: [],
        promoFilm: mockFilm,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        favoriteFilms: [],
        films: mockFilms,
        currentGenre: ALL_GENRES,
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText(/Show more/i)).not.toBeInTheDocument();
  });

  it('should redirect to AppRoute.SignIn, when click toMyList button and authorizationStatus is NoAuth', async () => {
    store = mockStore({
      [NameSpace.Film]: {
        isFilmLoading: false,
        isSimilarFilmsLoading: false,
        isReviewsLoading: false,
        currentFilm: mockFilm,
        similarFilms: [],
        reviews: [],
        promoFilm: mockFilm,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.Films]: {
        favoriteFilms: [],
        films: mockFilms,
        currentGenre: ALL_GENRES,
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('to-my-list-button'));

    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    expect(store.getActions().map(({type}) => type)).toStrictEqual([
      redirectToRoute(AppRoute.SignIn).type,
    ]);
  });

  it('should add film to myList, when click toMyList button and authorizationStatus is Auth', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('to-my-list-button'));

    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    expect(store.getActions().map(({type}) => type)).toStrictEqual([
      loadFavoriteFilms.pending.type,
      changeFavoriteStatusFilm.pending.type,
    ]);
  });
});
