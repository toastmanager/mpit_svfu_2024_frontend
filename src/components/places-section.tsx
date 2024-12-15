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
        'flex flex-wrap gap-x-[10px] gap-y-5 mb-[275px]',
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
