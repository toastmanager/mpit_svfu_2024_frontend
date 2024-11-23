import placesService from '@/services/places-service';
import PlacesSection from './places-section';

const UserPlacesSection = async ({ userUUID }: { userUUID: string }) => {
  const places = await placesService.getUserPlaces(userUUID);
  return <PlacesSection places={places} />;
};

export default UserPlacesSection;
