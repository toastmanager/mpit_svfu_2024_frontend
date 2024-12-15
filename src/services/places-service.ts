import api from '@/lib/api-client';

class PlacesService {
  async getRecent(params?: PlaceFilters): Promise<Place[]> {
    const typesQuery: string =
      params?.types && params.types.length > 0 ? params.types.join(',') : '';
    const activitiesQuery: string =
      params?.activities && params.activities.length > 0
        ? params.activities.join(',')
        : '';
    const ageRestrictionQuery: string = params?.ageRestriction
      ? `${params?.ageRestriction}`
      : '';

    const items: Place[] = (
      await api.get(
        `places/?types=${typesQuery}&age_restriction=${ageRestrictionQuery}&activities=${activitiesQuery}`,
      )
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
    const item = (await api.get(`places/${id}`)).data;
    const imageUrls = (await api.get(`places/${id}/images`)).data;
    return { ...item, imageUrls: imageUrls };
  }
}

export default new PlacesService();
