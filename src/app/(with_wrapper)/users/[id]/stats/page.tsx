import ProfileTabs from '../(components)/profile-tabs';

const ProfileStats = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <ProfileTabs id={id} path={'stats'} className="mb-[50px]" />
    </>
  );
};

export default ProfileStats;