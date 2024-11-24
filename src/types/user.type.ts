type User = {
  uuid: string;
  fullname: string;
  email?: string;
  score?: number;
  publishedPlacesNum?: number;
  totalReviews?: number;
  isSuperuser?: boolean;
  bannerUrl?: string | undefined;
  avatarUrl?: string | undefined;
};
