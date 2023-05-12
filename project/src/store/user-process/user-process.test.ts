import {UserProcess} from '../../types/state-type';
import {AuthorizationStatus} from '../../const';
import { userProcess } from './user-process';
import {checkAuthorizationStatus, login, logout} from '../action';
import {getMockUser} from '../../utils/mocks';

let state: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthorizationInProgress: false,
  user: undefined,
};

const mockUser = getMockUser();

describe('Reducer user-process', () => {
  it('should return to the initial state, if the action is unknown', () => {
    expect(userProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toMatchObject(state);
  });

  describe('checkAuthorizationStatus', () => {
    beforeEach(() => {
      state = {
        authorizationStatus: AuthorizationStatus.Unknown,
        isAuthorizationInProgress: false,
        user: undefined,
      };
    });

    it('should set isAuthorizationInProgress to true in checkAuthorizationStatus.pending', () => {
      expect(userProcess.reducer(state, {type: checkAuthorizationStatus.pending.type}).isAuthorizationInProgress)
        .toEqual(true);
    });

    it('should set isAuthorizationInProgress to false in checkAuthorizationStatus.fulfilled', () => {
      state.isAuthorizationInProgress = true;
      expect(userProcess.reducer(state, {type: checkAuthorizationStatus.fulfilled.type}).isAuthorizationInProgress)
        .toEqual(false);
    });

    it('should set authorizationStatus to Auth in checkAuthorizationStatus.fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthorizationStatus.fulfilled.type}).authorizationStatus)
        .toEqual(AuthorizationStatus.Auth);
    });

    it('should set user in checkAuthorizationStatus.fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthorizationStatus.fulfilled.type, payload: mockUser}).user)
        .toMatchObject(mockUser);
    });

    it('should set isAuthorizationInProgress to false in checkAuthorizationStatus.rejected', () => {
      state.isAuthorizationInProgress = true;
      expect(userProcess.reducer(state, {type: checkAuthorizationStatus.rejected.type}).isAuthorizationInProgress)
        .toEqual(false);
    });

    it('should set authorizationStatus to NoAuth in checkAuthorizationStatus.rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthorizationStatus.rejected.type}).authorizationStatus)
        .toEqual(AuthorizationStatus.NoAuth);
    });
  });

  describe('login', () => {
    beforeEach(() => {
      state = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isAuthorizationInProgress: false,
        user: undefined,
      };
    });

    it('should set authorizationStatus to Auth in login.fulfilled', () => {
      expect(userProcess.reducer(state, {type: login.fulfilled.type}).authorizationStatus)
        .toEqual(AuthorizationStatus.Auth);
    });

    it('should set user in login.fulfilled', () => {
      expect(userProcess.reducer(state, {type: login.fulfilled.type, payload: mockUser}).user)
        .toMatchObject(mockUser);
    });

    it('should set authorizationStatus to NoAuth in login.rejected', () => {
      expect(userProcess.reducer(state, {type: login.rejected.type}).authorizationStatus)
        .toEqual(AuthorizationStatus.NoAuth);
    });

    it('should set user to undefined in login.rejected', () => {
      expect(userProcess.reducer(state, {type: login.rejected.type}).user)
        .toEqual(undefined);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      state = {
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthorizationInProgress: false,
        user: mockUser,
      };
    });

    it('should set authorizationStatus to NoAuth in logout.fulfilled', () => {
      expect(userProcess.reducer(state, {type: logout.fulfilled.type}).authorizationStatus)
        .toEqual(AuthorizationStatus.NoAuth);
    });

    it('should set user to undefined in logout.fulfilled', () => {
      expect(userProcess.reducer(state, {type: logout.fulfilled.type}).user)
        .toEqual(undefined);
    });
  });
});
