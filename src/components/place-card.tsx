import { Icon } from '@iconify/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const PlaceCard = ({
  place,
  className = '',
}: {
  place: Place;
  className?: string;
}) => {
  console.log(place)

  return (
    <Link
      href={`/places/${place.id}`}
      className={twMerge(
        'bg-card text-card-foreground w-[393px] rounded-3xl',
        className,
      )}
    >
      <div className="relative">
        <img
          alt="image"
          src={place.imageUrls[0]}
          className="rounded-t-3xl bg-gray-600 object-left-top object-cover w-full h-[170px]"
        />
        <div className="flex absolute bottom-0 w-full justify-between">
          <div className="flex items-center bg-card pl-3 pr-4 py-1 rounded-tr-lg">
            <Icon icon="mage:location" className="mr-1 text-primary" />
            <span>{place.region}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-3 pt-[10px]">
        <span className="line-clamp-3">{place.description}</span>
        <div className="flex justify-between mt-[10px]">
          <div className="flex gap-1">
            <span className="text-xl font-semibold">{place.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="mage:star-fill" className="text-primary text-xl" />
            <span className="text-xl font-semibold">
              {place.score ?? '4.4'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
