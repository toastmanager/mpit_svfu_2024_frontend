type Place = {
  id?: number;
  locationName: string;
  title: string;
  description: string;
  imageUrls: string[];
  reviews?: PlaceReview[];
  author?: User;
  score?: number;
};
