import usersService from '@/services/users-service';
import ProfileCard from '../(components)/profile-card';

const ProfileLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uuid: string };
}) => {
  const { uuid } = await params;
  const user = await usersService.getUser(uuid);

  return (
    <section className="max-w-[1200px] mx-auto pt-[60px]">
      <ProfileCard user={user} className='mb-[10px]'/>
      {children}
    </section>
  );
};

export default ProfileLayout;
