import {UserProcess} from '../../types/state-type';
import {AuthorizationStatus, NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {checkAuthorizationStatus, login, logout} from '../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  isAuthorizationInProgress: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorizationStatus.pending, (state) => {
        state.isAuthorizationInProgress = true;
      })
      .addCase(checkAuthorizationStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isAuthorizationInProgress = false;
      })
      .addCase(checkAuthorizationStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthorizationInProgress = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
      });
  }
});
