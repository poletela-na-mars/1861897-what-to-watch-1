import { getMockFilm, getMockFilms } from '../../utils/mocks';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ToMyListButton } from './to-my-list-button';

jest.mock('../../services/process-error-handle.ts');
const mockFilm = getMockFilm();
const mockFilms = getMockFilms();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  Action,
  ThunkDispatch<StateType, typeof api, Action>
>(middlewares);
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Films]: {
    favoriteFilms: mockFilms,
  }
});

describe('ToMyListButton', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ToMyListButton film={mockFilm}/>
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render correctly, when film not in favorite list', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ToMyListButton film={mockFilm}/>
        </BrowserRouter>
      </Provider>);

    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('should render correctly, when film in favorite list', () => {
    const mockFilmInFavorite = mockFilm;
    mockFilmInFavorite.isFavorite = true;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ToMyListButton film={mockFilmInFavorite}/>
        </BrowserRouter>
      </Provider>);

    expect(screen.getByTestId('in-list')).toBeInTheDocument();
  });
});
