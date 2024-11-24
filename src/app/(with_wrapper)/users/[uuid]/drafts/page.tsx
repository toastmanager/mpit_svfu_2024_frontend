'use client';

import ProfileTabs from '../profile-tabs';
import { useAuth } from '@/providers/auth-provider';
import placesService from '@/services/places-service';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import React from 'react';
import PlacesSection from '../places-section';

const ProfileDraftPlaces = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { accessToken } = useAuth();

  if (!accessToken) {
    notFound();
  }

  const {
    isPending,
    error,
    data: placeDrafts,
  } = useQuery({
    queryKey: ['profilePlacesDrafts'],
    queryFn: () => placesService.getUserDrafts(uuid, accessToken),
  });

  return (
    <>
      <ProfileTabs uuid={uuid} path={'drafts'} className="mb-[50px]" />
      {isPending && <span>{'Загрузка...'}</span>}
      {error && <span>{error.message}</span>}
      {!isPending && placeDrafts && placeDrafts.length > 0 ? (
        <PlacesSection places={placeDrafts} />
      ) : (
        <span>Черновиков нет</span>
      )}
    </>
  );
};

export default ProfileDraftPlaces;
