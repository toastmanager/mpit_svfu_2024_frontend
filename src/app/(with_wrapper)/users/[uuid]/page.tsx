import placesService from '@/services/places-service';
import PlacesSection from '../../../../components/places-section';
import ProfileTabs from './profile-tabs';

const UserPublishedPlaces = async ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const { uuid } = await params;
  const places = await placesService.getUserPublished(uuid);
  return (
    <>
      <ProfileTabs uuid={uuid} path={''} className="mb-[50px]" />
      {places.length > 0 ? (
        <PlacesSection places={places} />
      ) : (
        <span>Этот пользователь ещё не публиковал мест</span>
      )}
    </>
  );
};

export default UserPublishedPlaces;
