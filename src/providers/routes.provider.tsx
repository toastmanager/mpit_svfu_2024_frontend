'use client';

import routesService from '@/services/routes.service';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-provider';

interface RoutesContextType {
  routes: Route[];
  setRoutes: (routes: Route[]) => void;
}

const RouteContext = createContext<RoutesContextType>({
  routes: [],
  setRoutes: () => {},
});

export const useRoutes = () => {
  const routesContext = useContext(RouteContext);
  return routesContext;
};

export const RoutesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routes = await routesService.getCurrentUserRoutes();
        setRoutes(routes);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchRoutes();
    }
  }, [routes, user]);

  return (
    <RouteContext.Provider
      value={{
        routes: routes,
        setRoutes: setRoutes,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};
