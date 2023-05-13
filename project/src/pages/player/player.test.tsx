import { getMockFilm, getMockFilms, getMockReviews } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus, NameSpace } from '../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { StateType } from '../../types/state-type';
import { createApi } from '../../services/api';
import { Action } from '@reduxjs/toolkit';
import Player from './player';

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
const store = mockStore({
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

describe('Player', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Player />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should start play by click', () => {
    window.HTMLMediaElement.prototype.play = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Player />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('play-button'));
    expect(window.HTMLMediaElement.prototype.play).toBeCalled();
  });
});
