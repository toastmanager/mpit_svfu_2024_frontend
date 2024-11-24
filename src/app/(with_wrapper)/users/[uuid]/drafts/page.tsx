'use client';

import ProfileTabs from '../profile-tabs';
import { useAuth } from '@/providers/auth-provider';
import { notFound, useParams } from 'next/navigation';
import React from 'react';

const ProfileDraftPlaces = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { accessToken } = useAuth();

  if (!accessToken) {
    notFound();
  }

  return (
    <>
      <ProfileTabs uuid={uuid} path={'drafts'} className="mb-[50px]" />
      {/* {!isPending && placeDrafts && <PlacesSection places={placeDrafts} />} */}
    </>
  );
};

export default ProfileDraftPlaces;
