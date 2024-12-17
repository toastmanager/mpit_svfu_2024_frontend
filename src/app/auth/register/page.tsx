'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import usersService from '@/services/users.service';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string().min(4),
  passwordConfirm: z.string().min(4),
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm']
}).refine((data) => data.fullname.split(' ').length > 1, {
    message: 'Надо указать хотябы фамилию и имя. Через пробел',
    path: ['fullname'],
});

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await usersService.register(values.email, values.fullname, values.password);
      window.location.href = "/"
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto w-[260px] flex flex-col gap-4 text-center"
      >
        <span className="text-xl">Вход в аккаунт</span>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={'Введите почту'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={'Введите ваше ФИО'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder={'Введите пароль'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder={'Подтвердите пароль'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <span>Зарегистрироваться</span>
        </Button>
        <span>Уже есть аккаунт? <Link href={`/auth/login`} className='text-primary'>Войти в профиль</Link></span>
      </form>
    </Form>
  );
};

export default RegisterPage;
