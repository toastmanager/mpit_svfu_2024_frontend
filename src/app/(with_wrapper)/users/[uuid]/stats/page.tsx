import ProfileTabs from '../profile-tabs';

const ProfileStats = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = await params;
  return (
    <>
      <ProfileTabs uuid={uuid} path={'stats'} className="mb-[50px]" />
    </>
  );
};

export default ProfileStats;
