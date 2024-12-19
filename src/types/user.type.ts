type User = {
  id: number;
  fullname: string;
  description?: string;
  email?: string;
  score?: number;
  publishedPlacesNum?: number;
  totalReviewsNum?: number;
  isVerified?: boolean;
  isSuperuser?: boolean;
  bannerUrl?: string | undefined;
  avatarUrl?: string | undefined;
};
