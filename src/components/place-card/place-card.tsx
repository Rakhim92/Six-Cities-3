import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {TOffer} from '../../types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {toggleFavoriteAction} from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type TPlaceCardProps = {
  typeClassName: 'root' | 'offer' | 'favorites';
  offer: TOffer;
  onHandleHover?: (offer?:TOffer) => void;
}

const getClassName = (typeClassName: string) => {
  switch (true) {
    case typeClassName === 'root':
      return 'cities';
    case typeClassName === 'offer':
      return 'near-places';
    case typeClassName === 'favorites':
      return 'favorites';
    default:
      return '';
  }
};

function PlaceCard({typeClassName, offer, onHandleHover}: TPlaceCardProps) {
  const {id, title, previewImage, price, isPremium, isFavorite, type, rating} = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleMouseOn = () => {
    onHandleHover?.(offer);
  };
  const handleMouseLeave = () => {
    onHandleHover?.(undefined);
  };
  let widthPictureCardImage = 260;
  let heigthPictureCardImage = 200;
  if (typeClassName === 'favorites') {
    widthPictureCardImage = 150;
    heigthPictureCardImage = 110;
  }

  const handleFavoriteClick = () => {
    const nextStatus = isFavorite ? 0 : 1;
    void dispatch(toggleFavoriteAction({ id, status: nextStatus }));
  };

  return (
    <article
      className={`${getClassName(typeClassName)}__card place-card`}
      key={id}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${getClassName(typeClassName)}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width={widthPictureCardImage}
            height={heigthPictureCardImage}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${getClassName(typeClassName)}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button
            ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
          type="button"
          onClick={() => {
            if (authorizationStatus === AuthorizationStatus.NoAuth) {
              navigate(AppRoute.Login);
            } else {
              handleFavoriteClick();
            }
          }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
