import {Route, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route.tsx';
import PublicRoute from '../public-route/public-route.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import Layout from '../layout/layout.tsx';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritePage from '../../pages/favorite-page/favorite-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import {useAppSelector, useAppDispatch} from '../../hooks/index.ts';
import {fetchOffersAction, fetchFavoritesAction} from '../../store/api-actions.ts';
import {useEffect} from 'react';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors.ts';
import { getIsOffersDataLoading } from '../../store/data-process/data-process.selectors.ts';

// Для локального сервера — '/', для GitHub Pages — имя репозитория
const basename = process.env.NODE_ENV === 'production' ? '/Six-Cities-3' : '/';


const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory} basename={basename}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout/>}
        >
          <Route
            index
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PublicRoute authorizationStatus = {authorizationStatus}>
                <LoginPage/>
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
          >
            <Route path=":id"
              element={<OfferPage/>}
            />
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus = {authorizationStatus}>
                <FavoritePage/>
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundPage/>}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;

