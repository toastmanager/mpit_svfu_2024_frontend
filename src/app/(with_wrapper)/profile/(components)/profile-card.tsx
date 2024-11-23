import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileActionButtons from "./profile-action-buttons";

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="mx-4 md:mx-auto bg-card text-card-foreground rounded-3xl relative">
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
            <h1 className="flex items-center text-2xl gap-2">
              <span>{user.fullname}</span>
            </h1>
          </div>
        </div>
        <ProfileActionButtons profileId={user.uuid} />
      </div>
    </div>
  );
};

export default ProfileCard;
