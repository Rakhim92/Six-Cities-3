import PlaceCardsList from '../../../components/place-card/place-cards-list';
import {useAppSelector} from '../../../hooks';
import { useMemo } from 'react';

const NearPlacesSection = () => {
  const otherOffers = useAppSelector((state) => state.DATA.otherOffers);
  const limitedOffers = useMemo(() => otherOffers.slice(0, 3), [otherOffers]);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <PlaceCardsList
          type = {'offer'}
          offers = {limitedOffers}
        />
      </section>
    </div>
  );
};

export default NearPlacesSection;
