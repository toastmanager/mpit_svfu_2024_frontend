'use client';

import ProfileTabs from '../profile-tabs';
import { notFound, useParams } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import placesService from '@/services/places-service';
import { useQuery } from '@tanstack/react-query';
import PlacesSection from '../places-section';

const ProfileModerationPlaces = ({ params }: { params: Promise<{ uuid: string }>; }) => {
  const { uuid } = useParams<{ uuid: string }>();
  const { accessToken } = useAuth();

  if (!accessToken) {
    notFound();
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['profileModerationPlaces'],
    queryFn: () => placesService.getUserModerations(uuid, accessToken),
  });

  return (
    <>
      <ProfileTabs uuid={uuid} path={'moderation'} className="mb-[50px]" />
      {isPending && 'Загрузка...'}
      {!isPending && data && data.length > 0 ? (
        <PlacesSection places={data} />
      ) : (
        <span>Мест на модерации нет</span>
      )}
    </>
  );
};

export default ProfileModerationPlaces;
