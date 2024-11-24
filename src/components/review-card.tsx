import { Icon } from '@iconify/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-card p-5 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex gap-[10px] mb-3">
          <Avatar className="h-[50px] w-[50px]">
            <AvatarImage
              src={review.author?.avatarUrl}
              className="object-cover"
              alt="user image"
            />
            <AvatarFallback>{review.author?.fullname[0]}</AvatarFallback>
          </Avatar>
          <div className="my-auto font-normal">
            <span>{`${review.author?.fullname.split(' ')[1]} ${
              review.author?.fullname[0]
            }.`}</span>
            <div className="flex items-center">
              {...Array.from({ length: review.score }, (_, i) => {
                return <Icon key={i} icon="mage:star-fill" className="text-primary" />;
              })}
              {...Array.from({ length: 5 - review.score }, (_, i) => {
                return <Icon key={i+review.score} icon="mage:star" className="text-primary" />;
              })}
              <span className="ml-1">{review.score}</span>
            </div>
          </div>
        </div>
        <span className="text-sm">
          {review.createdAt?.toLocaleString('ru', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </span>
      </div>
      <span>{review.text}</span>
    </div>
  );
};

export default ReviewCard;
