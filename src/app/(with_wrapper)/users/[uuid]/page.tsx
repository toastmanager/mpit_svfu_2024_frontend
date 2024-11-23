import placesService from '@/services/places-service';
import PlacesSection from './places-section';
import ProfileTabs from './profile-tabs';

const UserPublishedPlaces = async ({
  params,
}: {
  params: { uuid: string };
}) => {
  const { uuid } = await params;
  const places = await placesService.getUserDrafts(uuid);
  return (
    <>
      <ProfileTabs uuid={uuid} path={''} className='mb-[50px]'/>
      <PlacesSection places={places} />
    </>
  );
};

export default UserPublishedPlaces;
