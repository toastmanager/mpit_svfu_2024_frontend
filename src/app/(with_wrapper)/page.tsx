import Image from "next/image";
import PlacesSection from "./users/[uuid]/places-section";
import placesService from "@/services/places-service";

export default async function Home() {
  const places = await placesService.getRecent()

  return (
    <PlacesSection places={places} />
  );
}
