import usersService from './users-service';

class ReviewsService {
  async getByUser(userUUID: string): Promise<Review[]> {
    return await Promise.all(
      Array.from({ length: 23 }, async (_, index) => {
        return {
          uuid: index.toString(),
          score: 4,
          text: 'Купил унты для своей супруги в подарок. Она осталась очень довольна! Качество материалов на высоте, а скидка приятный бонус. Спасибо за отличное обслуживание!',
          author: await usersService.getUser(userUUID),
          createdAt: new Date(),
        };
      }),
    );
  }
}

export default new ReviewsService();
