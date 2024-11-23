import reviewsService from '@/services/reviews-service';
import ProfileTabs from '../profile-tabs';
import ReviewCard from '@/components/review-card';

const ProfileReviews = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = await params;
  const reviews = await reviewsService.getByUser(uuid);

  console.log(reviews);

  return (
    <>
      <ProfileTabs uuid={uuid} path={'reviews'} className="mb-[50px]" />
      <ul className='space-y-1 mb-64'>
        {reviews.map((review, index) => (
          <li key={index}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProfileReviews;
