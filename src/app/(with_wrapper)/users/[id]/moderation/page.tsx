'use client';

import ProfileTabs from '../(components)/profile-tabs';
import { notFound, useParams } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import placesService from '@/services/places.service';
import { useQuery } from '@tanstack/react-query';
import PlacesSection from '../../../../../components/places-section';

const ProfileModerationPlaces = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();

  if (!accessToken) {
    notFound();
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['profileModerationPlaces'],
    queryFn: () => placesService.getUserModerations(+id, accessToken),
  });

  return (
    <>
      <ProfileTabs id={+id} path={'moderation'} className="mb-[50px]" />
      {isPending && 'Загрузка...'}
      {!isPending && !error && (data && data.length > 0 ? (
        <PlacesSection places={data} />
      ) : (
        <span>Мест на модерации нет</span>
      ))}
    </>
  );
};

export default ProfileModerationPlaces;
