'use client';

import { twMerge } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import routesService from '@/services/routes.service';
import { useAuth } from '@/providers/auth-provider';
import { useRoutes } from '@/providers/routes.provider';

const PlaceCard = ({
  place,
  className = '',
}: {
  place: Place;
  className?: string;
}) => {
  const { user } = useAuth();
  const { routes, setRoutes } = useRoutes();

  return (
    <div className="relative">
      {user && (
        <Drawer>
          <DrawerTrigger className="absolute -top-[0.5px] right-0 z-10">
            <div className="h-6 bg-card pl-3 pr-4 py-1 rounded-bl-lg rounded-tr-2xl">
              <Icon icon={'mage:plus'} />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm pb-10">
              <DrawerHeader>
                <DrawerTitle>Ваши маршруты</DrawerTitle>
                <DrawerDescription>
                  Выберите маршрут в который вы хотите добавить это место
                </DrawerDescription>
              </DrawerHeader>
              <ul className="px-4">
                {routes.map((route, index) => {
                  return (
                    <li key={index}>
                      <div className="bg-card p-3 flex justify-between rounded-sm mb-2">
                        <Link href={`/routes/${route.id}`} className="w-full">
                          <span>{route.title}</span>
                        </Link>
                        <button
                          className={twMerge(
                            'px-1 rounded-full ml-2',
                            route.places &&
                              route.places.find((el) => el.id == place.id)
                              ? 'bg-primary text-primary-foreground'
                              : '',
                          )}
                          onClick={async () => {
                            const placeIndex = routes[index].places!.findIndex(
                              (el) => el.id == place.id,
                            );
                            const newRoutes = routes;
                            if (placeIndex !== -1) {
                              newRoutes[index].places?.splice(placeIndex, 1);
                              setRoutes(newRoutes);
                            } else {
                              newRoutes[index].places?.push(place);
                              setRoutes(newRoutes);
                            }
                            await routesService.switchPlace(
                              route.id!,
                              place.id!,
                            );
                          }}
                        >
                          <Icon icon={'mage:plus'} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
      )}
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
    </div>
  );
};

export default PlaceCard;
