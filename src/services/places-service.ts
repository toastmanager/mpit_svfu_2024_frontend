class PlacesService {
  async getUserPublished(userUUID: string): Promise<Place[]> {
    return Array.from({ length: 12 }, (_, i) => {
      return {
        id: i,
        imageUrls: ['https://www.airpano.ru/files/vr-lena_pillars_01_big.jpg'],
        description:
          'Ленские столбы — это горная вершина, расположенная на берегу реки Лена. На вершине горы есть смотровая площадка, откуда открывается вид на реку и окрестности.',
        title: 'Ленские столбы',
        score: 4.8,
        price: 0,
        region: 'Хангаласский район',
      };
    });
  }

  async getUserDrafts(userUUID: string): Promise<Place[]> {
    return Array.from({ length: 6 }, (_, i) => {
      return {
        id: i,
        imageUrls: ['https://www.airpano.ru/files/vr-lena_pillars_01_big.jpg'],
        description:
          'Ленские столбы — это горная вершина, расположенная на берегу реки Лена. На вершине горы есть смотровая площадка, откуда открывается вид на реку и окрестности.',
        title: 'Ленские столбы',
        score: 4.8,
        price: 0,
        region: 'Хангаласский район',
      };
    });
  }

  async getUserModerations(userUUID: string): Promise<Place[]> {
    return Array.from({ length: 4 }, (_, i) => {
      return {
        id: i,
        imageUrls: ['https://www.airpano.ru/files/vr-lena_pillars_01_big.jpg'],
        description:
          'Ленские столбы — это горная вершина, расположенная на берегу реки Лена. На вершине горы есть смотровая площадка, откуда открывается вид на реку и окрестности.',
        title: 'Ленские столбы',
        score: 4.8,
        price: 0,
        region: 'Хангаласский район',
      };
    });
  }
}

export default new PlacesService();
