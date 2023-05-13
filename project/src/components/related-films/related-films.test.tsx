import { getMockRelatedFilms } from '../../utils/mocks';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { ALL_GENRES, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RelatedFilms } from './related-films';

jest.mock('../../services/process-error-handle.ts');
const mockFilms = getMockRelatedFilms();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  Action,
  ThunkDispatch<StateType, typeof api, Action>
>(middlewares);
const store = mockStore({
  [NameSpace.Films]: {
    films: mockFilms,
    currentGenre: ALL_GENRES,
  }
});

describe('RelatedFilms', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RelatedFilms films={mockFilms} currentFilm={mockFilms[0]} />
        </BrowserRouter>
      </Provider>
    );

    const filmCards = screen.getAllByTestId('card-link');

    expect(filmCards.length).toBe(4);
  });
});
