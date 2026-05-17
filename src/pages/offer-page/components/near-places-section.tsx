import PlaceCardsList from '../../../components/place-card/place-cards-list';
import {useAppSelector} from '../../../hooks';
import { useMemo } from 'react';
import { getOtherOffers } from '../../../store/data-process/data-process.selectors';

const NearPlacesSection = () => {
  const otherOffers = useAppSelector(getOtherOffers);
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
