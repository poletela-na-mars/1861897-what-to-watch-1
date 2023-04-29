import {StateType} from '../../types/state-type';
import UserType from '../../types/user-type';
import {AuthorizationStatus, NameSpace} from '../../const';

export const getUser = (state: StateType): UserType | undefined => state[NameSpace.User].user;
export const getAuthorizationStatus = (state: StateType): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getIsAuthorizationInProgress = (state: StateType): boolean => state[NameSpace.User].isAuthorizationInProgress;
