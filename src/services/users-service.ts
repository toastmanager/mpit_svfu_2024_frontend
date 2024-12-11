import api from '@/lib/api-client';

class UsersService {
  async getUser(id: number): Promise<User> {
    const user: User = (await api.get(`users/${id}`)).data;

    return {
      avatarUrl: 'https://www.kinofilms.ua/images/person/big/121.jpg',
      bannerUrl:
        'https://blogs.nvidia.com/wp-content/uploads/2022/11/refik-1280x680-1.jpg',
      ...user,
    };
  }

  async login(email: string, password: string): Promise<any> {
    return api.post('auth/login', {
      email,
      password,
    });
  }

  async register(email: string, fullname: string, password: string): Promise<any> {
    return api.post('auth/register', {
      email: email,
      fullname: fullname,
      password: password,
    });
  }

  async logout() {
    return api.post('auth/logout');
  }

  async fetchMe(accessToken: string): Promise<User> {
    return api.post(
      'auth/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  async getAccessToken(): Promise<User> {
    const { accessToken } = (await api.post('auth/refresh')).data;
    return accessToken;
  }
}

export default new UsersService();
