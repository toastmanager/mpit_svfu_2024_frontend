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

  const places = await placesService.getRecent({
    types: types,
    ageRestriction: ageRestriction,
    activities: activities,
  });

  return (
    <section className="max-w-[1200px] mx-auto">
      <FiltersSection
        queries={{
          activities: activities,
          ageRestriction: ageRestriction,
          types: types,
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
