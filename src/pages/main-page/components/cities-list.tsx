import {MY_CITIES} from '../../../const';
import {useAppDispatch} from '../../../hooks';
import {changeCurrentCity} from '../../../store/app-process/app-process';
import {TCity} from '../../../types';

type TCitiesList = {
  currentCity: TCity;
}

const CitiesList = ({currentCity}: TCitiesList): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {MY_CITIES.map((city) => (
          <li className="locations__item"
            key={city.name}
            onClick={() => dispatch(changeCurrentCity(city))}
          >
            <a className={`locations__item-link tabs__item ${currentCity.name === city.name ? 'tabs__item--active' : ''}`}
              href="#"
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CitiesList;

