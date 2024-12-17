import { Icon } from '@iconify/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';

const PlaceCard = ({
  place,
  className = '',
  trContent = (
    <>
      <button className='h-6'>
        <Icon icon={'mage:plus'}/>
      </button>
    </>
  ),
}: {
  place: Place;
  className?: string;
  trContent?: React.ReactNode;
}) => {
  return (
    <Link href={`/places/${place.id}`}>
      <div
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
          {trContent && (
            <div className="flex items-center absolute -top-[0.5px] right-0 bg-card pl-3 pr-4 py-1 rounded-bl-lg rounded-tr-[1.3rem]">
              {trContent}
            </div>
          )}
          <div className="flex absolute bottom-0 w-full justify-between">
            <div className="flex items-center bg-card pl-3 pr-4 py-1 rounded-tr-lg">
              <Icon icon="mage:location" className="mr-1 text-primary" />
              <span>{place.locationName}</span>
            </div>
            {place.distance && (
              <div className="flex items-center bg-card pl-3 pr-4 py-1 rounded-tl-lg">
                <Icon icon="mage:flag" className="mr-1 text-primary" />
                <span>
                  {place.distance < 1
                    ? `${(place.distance * 1000).toFixed(0)} м`
                    : `${place.distance?.toFixed(1)} км`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="px-5 pb-3 pt-[10px]">
          <div>
            <span className="line-clamp-3">{place.description}</span>
          </div>
          <div className="flex justify-between mt-[10px]">
            <div className="flex gap-1">
              <span className="text-xl font-semibold text-nowrap">
                {place.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mage:star-fill" className="text-primary text-xl" />
              <span className="text-xl font-semibold">
                {!place.score || place.score == 0
                  ? '?'
                  : Number(place.score).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
