import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process';
import { appProcess } from './app-process/app-process';
import { dataProcess } from './data-process/data-process';

export const rootReducer = combineReducers({
  USER: userProcess.reducer,
  APP: appProcess.reducer,
  DATA: dataProcess.reducer,
});
