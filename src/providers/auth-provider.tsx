'use client';

import api from '@/lib/api-client';
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
} from 'react';

interface AuthContextType {
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setAccessToken: () => {},
  setUser: () => {},
});

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isRetry, setIsRetry] = useState<boolean>(false);

  const fetchAccessToken = async () => {
    try {
      const response = await api.post('auth/refresh', undefined, {
        withCredentials: true,
      });
      console.log(response);
      setAccessToken(response.data.access_token);
      setIsRetry(false);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.post('auth/me', accessToken);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.warn(error);
        setUser(null);
      }
    };

    if (accessToken) {
      fetchMe();
    }
  }, [accessToken]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !isRetry) {
          setIsRetry(true);

          try {
            await fetchAccessToken();

            if (accessToken) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return api(originalRequest);
            }
          } catch (error) {
            setAccessToken(null);
            setUser(null);
          } finally {
            setIsRetry(false);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [isRetry, accessToken]);

  return (
    <AuthContext.Provider
      value={{ user: user, setAccessToken: setAccessToken, setUser: setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
