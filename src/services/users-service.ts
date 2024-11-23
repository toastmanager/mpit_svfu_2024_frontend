class UsersService {
  async getUser(uuid: string): Promise<User> {
    return {
      uuid: uuid,
      fullname: 'Пупкин Василий Васильевич',
      avatarUrl:
        'https://www.kinofilms.ua/images/person/big/121.jpg',
      bannerUrl:
        'https://blogs.nvidia.com/wp-content/uploads/2022/11/refik-1280x680-1.jpg',
      score: 4.5,
      publishedPlaces: 12,
      totalReviews: 64,
    };
  }
}

export default new UsersService();
