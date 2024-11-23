import usersService from '@/services/users-service';
import ProfileCard from '../(components)/profile-card';
import UserPlacesSection from './user-places-section';

const ProfilePage = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = await params;
  const user = await usersService.getUser(uuid);

  return (
    <section className="max-w-[1200px] mx-auto pt-[60px]">
      <ProfileCard user={user} />
      <br />
      <UserPlacesSection userUUID={user.uuid} />
    </section>
  );
};

export default ProfilePage;
