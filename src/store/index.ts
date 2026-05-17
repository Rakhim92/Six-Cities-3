import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';

// 1. Создаем экземпляр API (обычно передается через thunk-мидлвар)
export const api = createAPI();

// 2. Настраиваем конфигурацию стора
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api, // Позволяет использовать API внутри asyncThunk (например, в api-actions)
      },
    }).concat(redirect),
});

// 3. Экспортируем типы для типизации хуков AppDispatch и State
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

