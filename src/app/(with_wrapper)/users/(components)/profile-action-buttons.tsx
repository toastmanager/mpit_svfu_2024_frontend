'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import Link from 'next/link';

const ProfileActionButtons = ({ profileId }: { profileId: number }) => {
  const { user } = useAuth();

  if (profileId === user?.id) {
    return (
      <div className="flex flex-col mt-5 md:mt-0 gap-1">
        <Link href={'/users/edit'}>
          <Button
            variant="outline"
            className="w-48 bg-card hover:bg-card border-primary text-primary text-base"
          >
            Редактировать
          </Button>
        </Link>
        <Link href={'/places/create'}>
          <Button
            variant="default"
            className="w-48 bg-primary shadow-[0_0px_26.4px_0px_rgba(0,0,0,0.3)] shadow-primary text-base"
          >
            Добавить место
          </Button>
        </Link>
      </div>
    );
  }
};

export default ProfileActionButtons;
