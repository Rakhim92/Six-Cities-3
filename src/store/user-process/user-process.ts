import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, USER_AUTH_DATA } from '../../const';

const getSavedAuthInfo = (): string | null => {
  const data = localStorage.getItem(USER_AUTH_DATA);
  return data ? (JSON.parse(data) as string) : null;
};

type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: string | null;
};

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: getSavedAuthInfo(),
};

export const userProcess = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
      if (action.payload === AuthorizationStatus.NoAuth) {
        state.authInfo = null;
      }
    },
    saveAuthInfo: (state, action: PayloadAction<string | null>) => {
      state.authInfo = action.payload;
    }
  },
});

// Автоматически сгенерированные экшены
export const { requireAuthorization, saveAuthInfo } = userProcess.actions;
