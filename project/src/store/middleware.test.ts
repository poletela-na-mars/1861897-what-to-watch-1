import {redirect} from './middleware';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {StateType} from '../types/state-type';
import {AnyAction} from 'redux';
import {redirectToRoute} from './action';
import {AppRoute} from '../const';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  }
};

jest.mock('../services/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<StateType, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to AppRoute.SignIn', () => {
    store.dispatch(redirectToRoute(AppRoute.SignIn));
    expect(fakeHistory.location.pathname).toBe(AppRoute.SignIn);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
  });

  it('should not redirect AppRoute.MainPage, when unknown action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.MainPage});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.MainPage);
  });
});
