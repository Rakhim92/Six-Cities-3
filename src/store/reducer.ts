import {createReducer} from '@reduxjs/toolkit';
import {changeCurrentCity, changeOffers, loadOffers, requireAuthorization, setOffersLoadingStatus, changeCurrentOffer, saveAuthInfo, loadFavorite, loadComments, loadOtherOffers} from './action';
import {TCity, TOffer, TOfferExtended, TComment} from '../types';
import {MY_CITIES, AuthorizationStatus, USER_AUTH_DATA} from '../const';
import {toggleFavoriteAction} from './api-actions';

const getSavedAuthInfo = (): string | null => {
  const data = localStorage.getItem(USER_AUTH_DATA);
  return data ? (JSON.parse(data) as string) : null;
};

type TInitialState = {
  currentCity: TCity;
  offers: TOffer[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  currentOffer: TOffer | TOfferExtended |null;
  favorites: TOffer[];
  authInfo: string | null;
  comments: TComment[];
  otherOffers: TOffer[];
}

const initialState: TInitialState = {
  currentCity: MY_CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  currentOffer: null,
  favorites: [],
  authInfo: getSavedAuthInfo(),
  comments: [],
  otherOffers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(changeOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;

      if (action.payload === AuthorizationStatus.NoAuth) {
        state.favorites = [];
        state.authInfo = null;
      }
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(changeCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(saveAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    })
    .addCase(loadFavorite, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadOtherOffers, (state, action) => {
      state.otherOffers = action.payload;
    })
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      const updatedOffer = action.payload;

      // 1. Обновляем в общем списке offers
      const offerIndex = state.offers.findIndex((item) => item.id === updatedOffer.id);
      if (offerIndex !== -1) {
        state.offers[offerIndex] = updatedOffer;
      }

      // 2. Обновляем в списке сопутствующих предложений (otherOffers)
      const otherIndex = state.otherOffers.findIndex((item) => item.id === updatedOffer.id);
      if (otherIndex !== -1) {
        state.otherOffers[otherIndex] = updatedOffer;
      }

      // 3. Обновляем текущее открытое предложение
      if (state.currentOffer?.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }
      // 4. Безопасное обновление списка избранного (исключает дубликаты)
      if (updatedOffer.isFavorite) {
        const favoriteIndex = state.favorites.findIndex((item) => item.id === updatedOffer.id);
        if (favoriteIndex === -1) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites[favoriteIndex] = updatedOffer;
        }
      } else {
        state.favorites = state.favorites.filter((item) => item.id !== updatedOffer.id);
      }
    });
});

export {reducer};
