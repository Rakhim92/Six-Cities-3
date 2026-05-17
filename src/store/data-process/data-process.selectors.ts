import { RootState } from '../index';
import { TOffer, TOfferExtended, TComment } from '../../types';

export const getOffers = (state: RootState): TOffer[] =>
  state.DATA.offers;

export const getIsOffersDataLoading = (state: RootState): boolean =>
  state.DATA.isOffersDataLoading;

export const getCurrentOffer = (state: RootState): TOffer | TOfferExtended | null =>
  state.DATA.currentOffer;

export const getFavorites = (state: RootState): TOffer[] =>
  state.DATA.favorites;

export const getComments = (state: RootState): TComment[] =>
  state.DATA.comments;

export const getOtherOffers = (state: RootState): TOffer[] =>
  state.DATA.otherOffers;
