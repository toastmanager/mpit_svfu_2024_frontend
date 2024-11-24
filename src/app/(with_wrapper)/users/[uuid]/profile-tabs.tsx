import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ProfileTabData {
  icon: string;
  path: string;
  name: string;
}

const ProfileTabs = ({
  uuid,
  path,
  className,
}: {
  uuid: string;
  path: string;
  className?: string;
}) => {
  const tabClass =
    'w-full flex bg-card text-card-foreground hover:text-primary-foreground hover:bg-primary animate rounded-lg transition-all items-center justify-center py-[14px] gap-[6px]';

  const tabs: ProfileTabData[] = [
    {
      icon: 'mage:flag-fill',
      path: '',
      name: 'Места пользователя',
    },
    {
      icon: 'mage:pen-fill',
      path: 'drafts',
      name: 'Черновики',
    },
    {
      icon: 'mage:settings-fill',
      path: 'moderation',
      name: 'Места на модерации',
    },
    {
      icon: 'ion:binoculars-sharp',
      path: 'stats',
      name: 'Статистика',
    },
    {
      icon: 'mage:star-fill',
      path: 'reviews',
      name: 'Отзывы',
    },
  ];
  return (
    <div className={twMerge('w-full bg-card rounded-lg flex', className)}>
      {tabs.map((tab, index) => {
        return (
          <Link
            key={index}
            href={`/users/${uuid}/${tab.path}`}
            className={twMerge(
              tabClass,
              tab.path === path
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : '',
            )}
          >
            <Icon icon={tab.icon} />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
