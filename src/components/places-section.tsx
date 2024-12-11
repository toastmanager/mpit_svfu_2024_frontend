import PlaceCard from '@/components/place-card';
import { twMerge } from 'tailwind-merge';

const PlacesSection = ({
  places,
  className = '',
}: {
  places: Place[];
  className?: string;
}) => {
  return (
    <section
      className={twMerge(
        'flex flex-wrap justify-center gap-x-[10px] xl:justify-between gap-y-5 mb-[275px]',
        className,
      )}
    >
      {places.map((place, index) => (
        <PlaceCard key={index} place={place} />
      ))}
    </section>
  );
};

export default PlacesSection;
