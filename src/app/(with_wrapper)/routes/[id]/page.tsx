import PlacesSection from '@/components/places-section';
import routesService from '@/services/routes.service';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const RoutePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const route = await routesService.getRoute(id);

  if (!route) {
    notFound();
  }

  return (
    <section className="max-w-[1200px] mx-auto pt-10">
      <div className="flex flex-col rounded-2xl gap-y-2">
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">{route.title}</span>
        </div>
        <div className="mt-5">
          {route.places && route.places.length > 0 ? (
            <PlacesSection places={route.places} />
          ) : (
            <>
              <span className="">В этом маршруте ещё нет мест.</span>
              <Link href={`/`} className="text-primary">
                <span className=""> Давайте исправим это!</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoutePage;
