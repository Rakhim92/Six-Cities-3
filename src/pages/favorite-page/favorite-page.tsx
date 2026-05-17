import {useMemo} from 'react';
import {TOffer} from '../../types';
import {useAppSelector} from '../../hooks';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import PlaceCardsList from '../../components/place-card/place-cards-list';
import FavoriteEmpty from './components/favorite-empty';
import { getFavorites } from '../../store/data-process/data-process.selectors';

type GroupedOffers = Record<string, TOffer[]>;

const FavoritePage = (): JSX.Element => {
  const favorites = useAppSelector(getFavorites);

  const groupedByCity = useMemo(() =>
    favorites.reduce<GroupedOffers>((acc, offer) => {
      const cityName = offer.city.name;

      if (!acc[cityName]) {
        acc[cityName] = [];
      }

      acc[cityName].push(offer);
      return acc;
    }, {}), [favorites]);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {favorites.length !== 0 ? (
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groupedByCity).map(([cityName, cityOffers]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Root}>
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  <PlaceCardsList
                    offers={cityOffers}
                    type={'favorites'}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <FavoriteEmpty/>
        )}
      </div>
    </main>
  );
};

export default FavoritePage;
