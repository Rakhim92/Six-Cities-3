import {AuthorizationStatus} from '../../../../const';
import {useAppSelector} from '../../../../hooks';
import { getComments } from '../../../../store/data-process/data-process.selectors';
import { getAuthorizationStatus } from '../../../../store/user-process/user-process.selectors';
import ReviewsForm from './reviews-form';
import ReviewsList from './reviews-list';

type TCommentsProps = {
  urlId: string | undefined;
  onSuccess: () => void;
}

const ReviewsSection = ({urlId, onSuccess}: TCommentsProps):JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const comments = useAppSelector(getComments);
  const commentsLength = comments.length;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsLength}</span></h2>
      <ReviewsList
        comments = {comments}
      />
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ReviewsForm
          urlId = {urlId}
          onSuccess = {onSuccess}
        />
      ) : null}
    </section>
  );
};

export default ReviewsSection;
