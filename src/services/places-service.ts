import api from "@/lib/api-client";

class PlacesService {
  async getRecent(): Promise<Place[]> {
    const items = (await api.get(`places/`)).data;
    return items;
  }

  async getUserPublished(userUUID: string): Promise<Place[]> {
    const items = (await api.get(`places/user/${userUUID}/places`)).data;
    return items;
  }

  async getUserDrafts(userUUID: string, accessToken: string): Promise<Place[]> {
    const items = (await api.get(`places/user/${userUUID}/drafts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })).data;
    return items;
  }

  async getUserModerations(userUUID: string, accessToken: string): Promise<Place[]> {
    const items = (await api.get(`places/user/${userUUID}/on_moderation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })).data;
    return items;
  }
}

export default new PlacesService();
