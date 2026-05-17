import { RootState } from '../index';
import { TCity } from '../../types';

export const getCurrentCity = (state: RootState): TCity =>
  state.APP.currentCity;
