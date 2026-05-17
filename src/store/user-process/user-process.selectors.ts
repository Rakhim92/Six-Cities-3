import { RootState } from '../index';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus =>
  state.USER.authorizationStatus;

export const getAuthInfo = (state: RootState): string | null =>
  state.USER.authInfo;

// Полезный селектор-хелпер для быстрой проверки прав доступа
export const getIsAuth = (state: RootState): boolean =>
  state.USER.authorizationStatus === AuthorizationStatus.Auth;
