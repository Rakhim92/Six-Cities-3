import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOffer, TOfferExtended, TComment } from '../../types';
import { AuthorizationStatus } from '../../const';
import {
  changeOffers,
  loadOffers,
  setOffersLoadingStatus,
  changeCurrentOffer,
  loadFavorite,
  loadComments,
  loadOtherOffers,
  requireAuthorization
} from '../action';
import { toggleFavoriteAction } from '../api-actions';

type TDataProcess = {
  offers: TOffer[];
  isOffersDataLoading: boolean;
  currentOffer: TOffer | TOfferExtended | null;
  favorites: TOffer[];
  comments: TComment[];
  otherOffers: TOffer[];
};

const initialState: TDataProcess = {
  offers: [],
  isOffersDataLoading: false,
  currentOffer: null,
  favorites: [],
  comments: [],
  otherOffers: [],
};

export const dataProcess = createSlice({
  name: 'DATA',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeOffers, (state, action: PayloadAction<TOffer[]>) => {
        state.offers = action.payload;
      })
      .addCase(loadOffers, (state, action: PayloadAction<TOffer[]>) => {
        state.offers = action.payload;
      })
      .addCase(setOffersLoadingStatus, (state, action: PayloadAction<boolean>) => {
        state.isOffersDataLoading = action.payload;
      })
      .addCase(changeCurrentOffer, (state, action: PayloadAction<TOffer | TOfferExtended | null>) => {
        state.currentOffer = action.payload;
      })
      .addCase(loadFavorite, (state, action: PayloadAction<TOffer[]>) => {
        state.favorites = action.payload;
      })
      .addCase(loadComments, (state, action: PayloadAction<TComment[]>) => {
        state.comments = action.payload;
      })
      .addCase(loadOtherOffers, (state, action: PayloadAction<TOffer[]>) => {
        state.otherOffers = action.payload;
      })
      // Очищаем избранное, если пользователь разлогинился
      .addCase(requireAuthorization, (state, action: PayloadAction<AuthorizationStatus>) => {
        if (action.payload === AuthorizationStatus.NoAuth) {
          state.favorites = [];
        }
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const offerIndex = state.offers.findIndex((item) => item.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex] = updatedOffer;
        }

        const otherIndex = state.otherOffers.findIndex((item) => item.id === updatedOffer.id);
        if (otherIndex !== -1) {
          state.otherOffers[otherIndex] = updatedOffer;
        }

        if (state.currentOffer?.id === updatedOffer.id) {
          state.currentOffer = updatedOffer;
        }

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
  },
});
