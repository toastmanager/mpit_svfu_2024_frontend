import placesService from '@/services/places-service';
import PlacesSection from '../../components/places-section';

export default async function Home() {
  const places = await placesService.getRecent();

  return places.length > 0 ? (
    <PlacesSection places={places} className="max-w-[1200px] mx-auto" />
  ) : (
    <div className='mt-16 text-center'>
      <span className="text-2xl my-auto">
        Ни одно место не найдено
      </span>
    </div>
  );
}
