'use client';

import ProfileTabs from '../profile-tabs';
import { notFound, useParams } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

const ProfileModerationPlaces = ({
  params,
}: {
  params: { uuid: string };
}) => {
  const { uuid } = useParams<{ uuid: string }>();;
  const { accessToken } = useAuth();

  if (!accessToken) {
    notFound();
  }
  
  // const places = placesService.getUserModerations(uuid, accessToken);
  return (
    <>
      <ProfileTabs uuid={uuid} path={'moderation'} className="mb-[50px]" />
      {/* <PlacesSection places={places} /> */}
    </>
  );
};

export default ProfileModerationPlaces;
