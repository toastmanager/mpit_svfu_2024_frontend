type Route = {
  id?: number;
  title: string;
  author?: User;
  placesIds?: number[];
  bannerUrl?: string;
  places: Place[];
};
