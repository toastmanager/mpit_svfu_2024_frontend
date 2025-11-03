import PlaceCard from '@/components/place-card';
import ReviewCard from '@/components/review-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PLACE_TYPES } from '@/lib/utils';
import placesService from '@/services/places.service';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const PlacesPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const place = await placesService.getById(id);
  const nearestPlaces = await placesService.getNearest(id);
  const discountPercent =
    (1 - (place.prevPrice ?? 0) / (place.price + 0.000000001)) * 100;

  return (
    <div className="min-h-full flex justify-center">
      <main className="max-w-[1200px] w-full mt-5 mb-52">
        <div className="bg-card rounded-2xl w-full p-5">
          <span className="text-4xl font-semibold">{place.title}</span>
          <div className="mt-5 grid grid-cols-auto-fit-240 w-full gap-2 grid-rows-auto-fit-240">
            {place.imageUrls.map((imageUrl: string, index: number) => (
              <img
                key={index}
                src={imageUrl}
                className={twMerge(
                  'object-cover h-full w-full rounded-2xl',
                  index === 0
                    ? 'md:row-span-2 md:col-span-1 lg:col-span-2'
                    : '',
                )}
              ></img>
            ))}
          </div>
        </div>

        <div className="flex w-full gap-2 justify-between mt-2 items-start">
          <div className="w-full space-y-2">
            <div className="rounded-2xl bg-card w-full p-5 space-y-4">
              <span className="font-semibold text-3xl">Описание</span>

              <div className="w-full flex flex-wrap gap-x-5">
                <div>
                  <span className="font-semibold">Тип</span>
                  <br />
                  <span className="">{PLACE_TYPES.get(place.type)}</span>
                </div>
                <div>
                  <span className="font-semibold">Активность</span>
                  <br />
                  <span className="">Базовая</span>
                </div>
                {place.address && (
                  <div>
                    <span className="font-semibold">Адрес</span>
                    <br />
                    <span className="">{place.address}</span>
                  </div>
                )}
                <div>
                  <span className="font-semibold">Возрастные ограничения</span>
                  <br />
                  <span className="">0+</span>
                </div>
              </div>

              <div>
                <span className="text-base">{place.description}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-card w-full p-5 space-y-4">
              <span className="font-semibold text-3xl">Отзывы</span>

              <ul>
                {place.reviews &&
                  place.reviews.length > 0 &&
                  place.reviews.map((review, index) => (
                    <li key={index}>
                      <ReviewCard review={review} />
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <Link href={`/users/${place.author?.id}`}>
                <div className="rounded-2xl flex justify-between bg-card w-full p-5">
                  <div>
                    <span className="font-semibold text-3xl">
                      Автор - {place.author?.fullname}
                    </span>
                    <br />
                    <span className="text-base">
                      {place.author?.description ??
                        'К сожалению, пользователь не оставил о себе информации'}
                    </span>
                  </div>
                  <Avatar className="h-[50px] w-[50px]">
                    <AvatarImage
                      src={place.author?.avatarUrl}
                      className="object-cover"
                      alt="user image"
                    />
                    <AvatarFallback>{place.author?.fullname[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </div>
          </div>

          <div className="min-w-[350px] space-y-2 sticky top-20">
            <div className="flex flex-col rounded-2xl bg-card gap-5 p-5">
              <div className="flex justify-between">
                <div className="font-bold text-xl">
                  {place.prevPrice != null && place.prevPrice != 0 ? (
                    <span className="text-gray-400 line-through mr-1">
                      {place.prevPrice!}
                    </span>
                  ) : (
                    <></>
                  )}
                  <span>{place.price == 0 ? 'Бесплатно' : place.price}</span>
                </div>
                {place.prevPrice != null && place.prevPrice != 0 && (
                  <div className="flex text-base bg-primary text-primary-foreground rounded-md w-[44px] h-[28px] items-center justify-center font-semibold">
                    <span>{discountPercent}%</span>
                  </div>
                )}
              </div>
              <div className="bg-background px-5 py-2 rounded-lg">
                <span>
                  {place.start == null && place.end == null
                    ? 'Не ограничен по датам'
                    : (place.start == null
                        ? '... - '
                        : place.start.toDateString()) &&
                      (place.end == null ? '...' : place.end.toDateString())}
                </span>
              </div>
              {place.redirectUrl != null && (
                <Link href={place.redirectUrl}>
                  <Button className="w-full font-semibold">Подробнее</Button>
                </Link>
              )}
            </div>
            <div className="bg-card rounded-2xl p-5 flex flex-col gap-4">
              <Link href={`/users/${place.author!.id}`}>
                <div className="flex gap-2 items-center">
                  <Avatar className="h-[40px] w-[40px]">
                    <AvatarImage
                      src={place.author?.avatarUrl}
                      className="object-cover"
                      alt="user image"
                    />
                    <AvatarFallback>{place.author?.fullname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">Автор тура</span>
                    <span>{place.author?.fullname}</span>
                  </div>
                </div>
              </Link>
              <Button variant={'outline'} className="w-full">
                Написать автору
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <span className="font-semibold text-3xl">Ближайшие места</span>
          <ul className="flex flex-wrap gap-x-2 gap-y-4">
            {nearestPlaces.map((place, index) => (
              <li key={index}>
                <PlaceCard place={place} className="bg-card" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PlacesPage;
