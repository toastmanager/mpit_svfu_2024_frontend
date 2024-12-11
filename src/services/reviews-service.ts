import api from '@/lib/api-client';

class ReviewsService {
  async getByUser(id: number): Promise<PlaceReview[]> {
    const data: any[] = (await api.get(`/places/user/${id}/reviews`)).data;
    const res: PlaceReview[] = data.map((place, index) => {
      return {...place, createdAt: new Date(data[index].createdAt)}
    });
    return res
  }
}

export default new ReviewsService();
