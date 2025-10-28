'use client';

import Link from 'next/link';
import routesService from '@/services/routes.service';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRoutes } from '@/providers/routes.provider';

const routeFormSchema = z.object({
  title: z.string().min(2),
});

const RoutesListPage = () => {
  const { user } = useAuth();
  const { routes, setRoutes } = useRoutes();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof routeFormSchema>>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const createRoute = async (values: z.infer<typeof routeFormSchema>) => {
    try {
      const result = await routesService.createRoute(values);
      const newRoutes = routes.slice();
      newRoutes.push(result);
      setRoutes(newRoutes);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ошибка создания маршрута',
      });
    }
  };

  const deleteRoute = async (id: number, index: number) => {
    try {
      await routesService.deleteRoute(id);
      setRoutes(routes.filter((_, routeIndex) => routeIndex !== index));
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ошибка удаления маршрута',
      });
    }
  };

  return !user ? (
    <div className="flex w-full h-full min-h-screen justify-center items-center">
      <span className="text-2xl">
        Пожалуйста,{' '}
        <Link href={'/auth/login'} className="text-primary">
          авторизуйтесь
        </Link>
        , чтобы воспользоваться маршрутами
      </span>
    </div>
  ) : routes ? (
    <section className="max-w-[1200px] mx-auto pt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createRoute)}
          className="bg-card w-full rounded-lg p-5 space-y-2"
        >
          <div>
            <span className="text-2xl">Новый маршрут</span>
          </div>
          <div className="flex w-full gap-x-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Название маршрута" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="h-10">Отправить</Button>
          </div>
        </form>
      </Form>
      <ul className="space-y-5 mt-5">
        {routes.map((route, index) => {
          return (
            <div className="" key={index}>
              <div className="bg-card px-5 py-1 rounded-lg flex justify-between items-center">
                <Link href={`/routes/${route.id}`}>
                  <span>{route.title}</span>
                </Link>
                <Button
                  variant={'ghost'}
                  className="hover:bg-destructive hover:text-destructive-foreground w-10 h-10"
                  onClick={() => deleteRoute(route.id!, index)}
                >
                  <Icon icon={`mage:trash`} />
                </Button>
              </div>
            </div>
          );
        })}
      </ul>
    </section>
  ) : (
    <span>Загрузка</span>
  );
};

export default RoutesListPage;
