class RoutesService {
  async addPlace(routeId: number, placeId: number): Promise<Route> {
    return {
      places: [],
      title: '',
    };
  }

  async removePlace(routeId: number, placeId: number): Promise<void> {}

  async createRoute(routeId: number, placeId: number): Promise<Route> {
    return {
      places: [],
      title: '',
    };
  }

  async deleteRoute(routeId: number): Promise<void> {}

  async getRoute(routeId: number): Promise<Route> {
    return {
      places: [],
      title: '',
    };
  }
  async getUserRoutes(userId: number): Promise<Route[]> {
    return [];
  }
}

export default new RoutesService();
