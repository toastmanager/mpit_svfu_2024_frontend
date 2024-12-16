import api from '@/lib/api-client';
import { createPlacesQueries } from '@/lib/utils';

class PlacesService {
  async getRecent(params?: PlaceFilters): Promise<Place[]> {
    console.log(createPlacesQueries(params ?? {}));
    const items: Place[] = (
      await api.get(`places/${createPlacesQueries(params ?? {})}`)
    ).data;
    for (const i in items) {
      const imageUrls = (await api.get(`places/${items[i].id}/images`)).data;
      items[i] = { ...items[i], imageUrls: imageUrls };
    }
    return items;
  }

  async getUserPublished(userId: number): Promise<Place[]> {
    const items = (await api.get(`places/user/${userId}`)).data;
    for (const i in items) {
      const imageUrls = (await api.get(`places/${items[i].id}/images`)).data;
      items[i] = { ...items[i], imageUrls: imageUrls };
    }
    return items;
  }

  async getUserDrafts(userId: number, accessToken: string): Promise<Place[]> {
    const items = (
      await api.get(`places/user/${userId}/drafts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
    for (const i in items) {
      const imageUrls = (await api.get(`places/${items[i].id}/images`)).data;
      items[i] = { ...items[i], imageUrls: imageUrls };
    }
    return items;
  }

  async getUserModerations(
    userId: number,
    accessToken: string,
  ): Promise<Place[]> {
    const items = (
      await api.get(`places/user/${userId}/on_moderation`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
    for (const i in items) {
      const imageUrls = (await api.get(`places/${items[i].id}/images`)).data;
      items[i] = { ...items[i], imageUrls: imageUrls };
    }
    return items;
  }

  async getById(id: number): Promise<Place> {
    const item: Place = (await api.get(`places/${id}`)).data;
    const imageUrls = (await api.get(`places/${id}/images`)).data;
    return {
      ...item,
      imageUrls: imageUrls,
      reviews: item.reviews?.map((review, _) => ({
        ...review,
        createdAt: new Date(review.createdAt!),
      })),
    };
  }

  async getNearest(id: number): Promise<Place[]> {
    const items: Place[] = (await api.get(`places/${id}/closest`)).data;
    for (const i in items) {
      const imageUrls = (await api.get(`places/${items[i].id}/images`)).data;
      items[i] = {
        ...items[i],
        imageUrls: imageUrls,
        reviews: items[i].reviews?.map((review, i) => ({
          ...review,
          createdAt: new Date(review.createdAt!),
        })),
      };
    }
    return items;
  }
}

export default new PlacesService();
