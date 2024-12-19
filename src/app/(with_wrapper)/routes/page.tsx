'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import routesService from '@/services/routes.service';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const RoutesListPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['profileModerationPlaces'],
    queryFn: () => routesService.getCurrentUserRoutes(),
  });

  return data ? (
    <section className="max-w-[1200px] mx-auto pt-10">
      <ul className="space-y-5">
        {data.map((route, index) => {
          return (
            <div className="" key={index}>
              <Link href={`/routes/${route.id}`}>
                <div className="bg-card p-3 rounded-lg flex justify-between items-center">
                  <span>{route.title}</span>
                  <Button variant={'ghost'}>
                    <Icon icon={`mage:arrow-right`} />
                  </Button>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
    </section>
  ) : (
    <span>Загрузка</span>
  );
};

export default RoutesListPage;
