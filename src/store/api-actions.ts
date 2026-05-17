import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TOffer, UserData, AuthData, AppDispatch, State} from '../types.ts';
import { redirectToRoute} from './action';
import {requireAuthorization, saveAuthInfo} from './user-process/user-process.ts';
import {loadOffers, setOffersLoadingStatus, loadFavorite} from './data-process/data-process.ts';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute, USER_AUTH_DATA} from '../const';

export const toggleFavoriteAction = createAsyncThunk<
  TOffer,
  { id: string; status: 0 | 1 },
  { extra: AxiosInstance }
>(
  'data/toggleFavorite',
  async ({ id, status }, { extra: api }) => {
    const {data} = await api.post<TOffer>(`favorite/${id}/${status}`);
    return data;
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<TOffer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<TOffer[]>(APIRoute.Favorite);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadFavorite(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    localStorage.setItem(USER_AUTH_DATA, JSON.stringify(email));
    dispatch(saveAuthInfo(email));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    localStorage.removeItem(USER_AUTH_DATA);
    dispatch(saveAuthInfo(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
