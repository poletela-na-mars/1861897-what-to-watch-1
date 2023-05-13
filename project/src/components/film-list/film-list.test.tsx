import { getMockFilms } from '../../utils/mocks';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FilmList } from './film-list';

jest.mock('../../services/process-error-handle.ts');
describe('filmList', () => {
  const mockFilms = getMockFilms();
  const api = createApi();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);
  const store = mockStore({});

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FilmList films={mockFilms} />
        </BrowserRouter>
      </Provider>
    );


    const filmCards = screen.getAllByTestId('card-link');

    expect(filmCards.length).toBe(mockFilms.length);
    expect(screen.getByText(mockFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilms[1].name)).toBeInTheDocument();
  });
});
