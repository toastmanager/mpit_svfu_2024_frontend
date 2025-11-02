type Place = {
  id?: number;
  locationName: string;
  title: string;
  type: string;
  description: string;
  imageKeys?: string[];
  imageUrls: string[];
  reviews?: PlaceReview[];
  author?: User;
  score?: number;
  distance?: number;
  address?: string;
};
