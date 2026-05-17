import {AuthorizationStatus} from '../../../../const';
import {useAppSelector} from '../../../../hooks';
import ReviewsForm from './reviews-form';
import ReviewsList from './reviews-list';

type TCommentsProps = {
  urlId: string | undefined;
  onSuccess: () => void;
}

const ReviewsSection = ({urlId, onSuccess}: TCommentsProps):JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const comments = useAppSelector((state) => state.DATA.comments);
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
