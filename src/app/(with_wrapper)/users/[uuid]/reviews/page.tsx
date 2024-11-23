import ProfileTabs from '../profile-tabs';

const ProfileReviews = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = await params;
  return (
    <>
      <ProfileTabs uuid={uuid} path={'reviews'} className="mb-[50px]" />
    </>
  );
};

export default ProfileReviews;
