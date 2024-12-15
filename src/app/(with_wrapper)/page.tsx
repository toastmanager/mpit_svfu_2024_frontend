import placesService from '@/services/places-service';
import PlacesSection from '../../components/places-section';
import FiltersSection from './(components)/filters-section';

export default async function Home({
  searchParams: searchParamsQuery,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await searchParamsQuery;

  const types: string[] = searchParams?.types?.split(',') ?? [];
  const ageRestrictionNum = Number(searchParams?.age_restriction);
  const ageRestriction: number | undefined = !isNaN(ageRestrictionNum)
    ? ageRestrictionNum
    : undefined;
  const activities: string[] = searchParams?.activities?.split(',') ?? [];
  const start: Date | undefined = searchParams?.start
    ? new Date(searchParams?.start) != null
      ? new Date(searchParams?.start)
      : undefined
    : undefined;
  const end: Date | undefined = searchParams?.end
    ? new Date(searchParams?.end) != null
      ? new Date(searchParams?.end)
      : undefined
    : undefined;
  const search: string = searchParams?.search ?? ''

  const places = await placesService.getRecent({
    types: types,
    ageRestriction: ageRestriction,
    activities: activities,
    start: start,
    end: end,
    search: search
  });

  return (
    <section className="max-w-[1200px] mx-auto pt-5">
      <FiltersSection
        queries={{
          activities: activities,
          ageRestriction: ageRestriction,
          types: types,
          start: start,
          end: end,
          search: search,
        }}
      />
      <br />
      {places && places.length > 0 ? (
        <PlacesSection
          places={places}
          className="max-w-[1200px] justify-center"
        />
      ) : (
        <div className="mt-16 text-center">
          <span className="text-2xl my-auto">Ни одно место не найдено</span>
        </div>
      )}
    </section>
  );
}
