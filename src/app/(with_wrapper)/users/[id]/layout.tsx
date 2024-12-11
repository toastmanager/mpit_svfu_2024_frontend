import usersService from '@/services/users-service';
import ProfileCard from '../(components)/profile-card';

const ProfileLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const user = await usersService.getUser(id);

  return (
    <section className="max-w-[1200px] mx-auto pt-[60px]">
      <ProfileCard user={user} className='mb-[10px]'/>
      {children}
    </section>
  );
};

export default ProfileLayout;
