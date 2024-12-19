import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileActionButtons from './profile-action-buttons';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@iconify/react/dist/iconify.js';

const ProfileCard = ({
  user,
  className,
}: {
  user: User;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        'mx-4 md:mx-auto bg-card text-card-foreground rounded-3xl relative',
        className,
      )}
    >
      <div
        className="w-full h-52 bg-cover bg-center rounded-t-3xl bg-gray-500"
        style={{ backgroundImage: `url(${user.bannerUrl})` }}
      ></div>

      <Avatar className="absolute top-44 left-5 border-4 border-card w-[136px] h-[136px]">
        <AvatarImage src={user.avatarUrl} className="object-cover bg-card" />
        <AvatarFallback className="bg-primary text-primary-foreground text-6xl font-medium">
          {user.fullname[0]}
        </AvatarFallback>
      </Avatar>

      <div className="pt-14 px-5 md:px-0 md:pt-0 md:pl-44 mt-14 md:mt-5 pb-5 mr-5 flex flex-wrap justify-between items-center">
        <div>
          <div className="flex">
            <h1 className="flex items-center text-2xl gap-2 font-bold">
              <span>{user.fullname}</span>
              {user.isVerified && (
                <Icon
                  icon="mage:check-circle-fill"
                  className="w-5 text-primary"
                />
              )}
            </h1>
          </div>

          <div className="flex flex-wrap gap-5 mt-3">
            <div>
              <p className="text-xs text-book text-foreground-alternative">
                Опубликовано
              </p>
              <p className="text-sm font-bold">
                {user.publishedPlacesNum} мест
              </p>
            </div>

            <div>
              <p className="text-xs text-book text-foreground-alternative">
                Всего отзывов
              </p>
              <p className="text-sm font-bold">{user.totalReviewsNum}</p>
            </div>

            <div>
              <p className="text-xs text-book text-foreground-alternative">
                Рейтинг
              </p>
              <p className="text-sm font-bold">
                {!user.score || user.score == 0 ? 'Отсутствует' : user.score}
              </p>
            </div>
          </div>
        </div>
        <ProfileActionButtons profileId={user.id} />
      </div>
    </div>
  );
};

export default ProfileCard;
