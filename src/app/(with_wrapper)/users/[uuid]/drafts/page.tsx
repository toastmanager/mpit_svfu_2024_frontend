import placesService from '@/services/places-service';
import PlacesSection from '../places-section';
import ProfileTabs from '../profile-tabs';

const ProfileDraftPlaces = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = await params;
  const places = await placesService.getUserDrafts(uuid);

  return (
    <>
      <ProfileTabs uuid={uuid} path={'drafts'} className="mb-[50px]" />
      <PlacesSection places={places} />
    </>
  );
};

export default ProfileDraftPlaces;
