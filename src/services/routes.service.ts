import api from '@/lib/api-client';
import placesService from './places.service';

class RoutesService {
  async switchPlace(routeId: number, placeId: number): Promise<Route> {
    const data = (await api.patch(`routes/${routeId}/places/${placeId}`)).data;
    return data;
  }

  async removePlace(routeId: number, placeId: number): Promise<void> {
    const data = (await api.delete(`routes/${routeId}/places/${placeId}`, {}))
      .data;
    return data;
  }

  async createRoute(route: Route): Promise<Route> {
    const result = (await api.post(`routes`, {
      title: route.title,
    })).data;
    return result
  }

  async deleteRoute(routeId: number): Promise<void> {
    const message = (await api.delete(`routes/${routeId}`)).data;
    return message;
  }

  async getRoute(routeId: number): Promise<Route | undefined> {
    const route: Route = (await api.get(`routes/${routeId}`)).data;
    const places = [];
    for (const place of route.places!) {
      places.push(await placesService.getById(place.id!));
    }
    return { ...route, places: places };
  }
  async getUserRoutes(userId: number): Promise<Route[]> {
    throw new Error('Not implemented');
  }

  async getCurrentUserRoutes(): Promise<Route[]> {
    const routes = (
      await api.get('routes/me', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
    ).data;

    return routes;
  }
}

export default new RoutesService();
