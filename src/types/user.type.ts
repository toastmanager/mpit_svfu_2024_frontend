type User = {
  uuid: string;
  fullname: string;
  email?: string;
  isSuperuser?: boolean;
  bannerUrl?: string | undefined;
  avatarUrl?: string | undefined;
};
