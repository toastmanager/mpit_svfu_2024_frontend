import placesService from '@/services/places.service';
import PlacesSection from '../../../../components/places-section';
import ProfileTabs from './(components)/profile-tabs';

const UserPublishedPlaces = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const places = await placesService.getUserPublished(id);
  return (
    <>
      <ProfileTabs id={id} path={''} className="mb-[50px]" />
      {places.length > 0 ? (
        <PlacesSection places={places} />
      ) : (
        <span>Этот пользователь ещё не публиковал мест</span>
      )}
    </>
  );
};

export default UserPublishedPlaces;
