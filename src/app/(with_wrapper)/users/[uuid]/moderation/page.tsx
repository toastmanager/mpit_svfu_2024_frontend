import placesService from '@/services/places-service';
import PlacesSection from '../places-section';
import ProfileTabs from '../profile-tabs';

const ProfileModerationPlaces = async ({
  params,
}: {
  params: { uuid: string };
}) => {
  const { uuid } = await params;
  const places = await placesService.getUserModerations(uuid);
  return (
    <>
      <ProfileTabs uuid={uuid} path={'moderation'} className="mb-[50px]" />
      <PlacesSection places={places} />
    </>
  );
};

export default ProfileModerationPlaces;
