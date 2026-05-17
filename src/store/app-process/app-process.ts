import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MY_CITIES } from '../../const';
import { TCity } from '../../types';

type TAppProcess = {
  currentCity: TCity;
};

const initialState: TAppProcess = {
  currentCity: MY_CITIES[0],
};

export const appProcess = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    changeCurrentCity: (state, action: PayloadAction<TCity>) => {
      state.currentCity = action.payload;
    }
  },
});

// Автоматически сгенерированный экшен
export const { changeCurrentCity } = appProcess.actions;
