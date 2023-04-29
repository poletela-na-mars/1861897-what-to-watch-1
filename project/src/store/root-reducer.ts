import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { filmsProcess } from './films-process/films-process';
import { filmProcess } from './film-process/film-process';
import { errorProcess } from './error-process/error-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Error]: errorProcess.reducer,
});
