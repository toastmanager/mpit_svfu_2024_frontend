'use client';

import api from '@/lib/api-client';
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
  useCallback,
} from 'react';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isInitialized: false,
  setAccessToken: () => {},
  setUser: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const refreshTokens = useCallback(async (): Promise<string | null> => {
    try {
      const response = await api.post('auth/refresh', undefined, {
        withCredentials: true,
      });

      const newToken = response.data.accessToken;
      setAccessToken(newToken);
      localStorage.setItem('accessToken', newToken);
      return newToken;
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      return null;
    }
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const response = await api.post('auth/me');
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');

      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        await refreshTokens();
      }
      setIsInitialized(true);
    };

    initAuth();
  }, [refreshTokens]);

  useEffect(() => {
    if (accessToken) {
      fetchMe();
    }
  }, [accessToken, fetchMe]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshTokens();

            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [accessToken, refreshTokens]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isInitialized,
        setAccessToken,
        setUser,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};
