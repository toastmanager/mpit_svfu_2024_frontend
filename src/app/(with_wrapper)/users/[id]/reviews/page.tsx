import reviewsService from '@/services/reviews-service';
import ProfileTabs from '../(components)/profile-tabs';
import ReviewCard from '@/components/review-card';

const ProfileReviews = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const reviews = await reviewsService.getByUser(id);

  return (
    <>
      <ProfileTabs id={id} path={'reviews'} className="mb-[50px]" />
      <ul className="space-y-1 mb-64">
        {reviews.length > 0 &&
          reviews.map((review, index) => (
            <li key={index}>
              <ReviewCard review={review} />
            </li>
          ))}
        {(!reviews || reviews.length == 0) && (
          <span>У этого пользователя отсутствуют отзывы</span>
        )}
      </ul>
    </>
  );
};

export default ProfileReviews;
