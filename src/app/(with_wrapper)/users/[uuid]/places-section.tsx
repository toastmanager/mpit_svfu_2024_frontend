import PlaceCard from '@/components/place-card';

const PlacesSection = ({ places }: { places: Place[] }) => {
  return (
    <section className="flex flex-wrap justify-center gap-x-[10px] xl:justify-between gap-y-5 mb-[275px]">
      {places.map((place, index) => (
        <PlaceCard key={index} place={place} />
      ))}
    </section>
  );
};

export default PlacesSection;
