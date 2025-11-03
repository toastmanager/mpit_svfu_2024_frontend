type Place = {
  id?: number;
  locationName: string;
  title: string;
  type: string;
  price: number;
  start: Date;
  end: Date;
  prevPrice?: number;
  redirectUrl?: string;
  description: string;
  imageKeys?: string[];
  imageUrls: string[];
  reviews?: PlaceReview[];
  author?: User;
  score?: number;
  distance?: number;
  address?: string;
};
