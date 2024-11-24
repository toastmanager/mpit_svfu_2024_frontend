import placesService from "@/services/places-service";
import PlacesSection from "../../components/places-section";

export default async function Home() {
  const places = await placesService.getRecent()

  return (
    <PlacesSection places={places} />
  );
}
