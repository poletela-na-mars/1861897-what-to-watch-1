import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ErrorMessage } from './error-message';

jest.mock('../../services/process-error-handle.ts');
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  Action,
  ThunkDispatch<StateType, typeof api, Action>
>(middlewares);

describe('ErrorMessage', () => {
  const store = mockStore({
    [NameSpace.Error]: {
      error: 'testError',
    }
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByText(/testError/i)).toBeInTheDocument();
  });
});
