import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const TourReview = ({ review }: { review: ReviewEntity }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < review.score; i++) {
      stars.push(
        <Icon key={i} icon="mage:star-fill" className="text-primary" />
      );
    }
    return stars;
  };

  const fullname = review.user.fullname.split(" ");

  return (
    <div className="p-5 bg-card rounded-md text-card-foreground">
      <div className="flex mb-3 items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={review.user.avatarImageKey}
            alt="Avatar"
            className="object-cover object-left-top"
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-medium">
            {fullname[0][0]}
          </AvatarFallback>
        </Avatar>

        <div className="w-full pl-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium">{`${fullname[1]} ${fullname[0][0]}.`}</h3>
            <p className="text-sm text-foreground-alternative">
              {review.date.toLocaleDateString()}
            </p>
          </div>

          <div className="relative h-5">
            <div className="flex space-x-1 absolute top-0 left-0">
              {renderStars()}
            </div>
            <div className="flex space-x-1 absolute top-0 left-0">
              <Icon icon="mage:star" className="text-primary" />
              <Icon icon="mage:star" className="text-primary" />
              <Icon icon="mage:star" className="text-primary" />
              <Icon icon="mage:star" className="text-primary" />
              <Icon icon="mage:star" className="text-primary" />
              <span className="text-sm">{review.score}</span>
            </div>
          </div>
        </div>
      </div>
      <span className="text-sm">{review.text}</span>
    </div>
  );
};

export default TourReview;
