import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-route/history-route';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';

jest.mock('../../services/process-error-handle.ts');
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  Action,
  ThunkDispatch<StateType, typeof api, Action>
>(middlewares);
const history = createMemoryHistory();

describe('PrivateRoute', () => {
  beforeEach(() => {
    history.push('/privateRoute');
  });

  it('should render component in private route, when AuthorizationStatus is Auth', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<p>Login Page</p>}/>
            <Route path={'/privateRoute'} element={
              <PrivateRoute>
                <p>Private Route</p>
              </PrivateRoute>
            }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login Page/i)).not.toBeInTheDocument();
  });

  it('should navigate to SignInPage, when AuthorizationStatus is NoAuth', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<p>Login Page</p>}/>
            <Route path={'/privateRoute'} element={
              <PrivateRoute>
                <p>Private Route</p>
              </PrivateRoute>
            }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });
});
