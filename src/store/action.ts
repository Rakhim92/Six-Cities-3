import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

// Этот экшен обрабатывается специальным middleware для навигации
export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');

