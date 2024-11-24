'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/providers/auth-provider';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '@/components/ui/button';
import usersService from '@/services/users-service';

const AppBar = () => {
  const { user } = useAuth();

  return (
    <section className="bg-background w-full px-4 xl:px-0 pb-[10px] pt-[9px]">
      <div className="flex flex-wrap justify-between text-primary text-base max-w-[1200px] mx-auto space-x-1 text-right">
        <Link href={'/'}>
          <span className="text-[38px]">якутия go</span>
        </Link>
        <Link href={'/'}>
          <span>
            поиск
            <br />
            мест [в Якутии]
          </span>
        </Link>
        <Link href={'/'}>
          <span>
            составить
            <br />
            маршрут
          </span>
        </Link>
        <Link href={'/'}>
          <span>
            забронировать отель
            <br />
            для всей семьи
          </span>
        </Link>
        {user ? (
          <Dialog>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Вы уверены что хотите выйти?</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant={'destructive'}
                  type="submit"
                  onClick={usersService.logout}
                >
                  Да
                </Button>
              </DialogFooter>
            </DialogContent>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span>
                  мой
                  <br />
                  профиль
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={`/users/${user.uuid}`}
                    className="flex gap-1 items-center"
                  >
                    <Icon icon="mage:home" />
                    <span>Профиль</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DialogTrigger className="flex gap-1 items-center text-destructive">
                    <Icon icon="mage:logout" />
                    Выйти
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        ) : (
          <Link href={'/auth/login'}>
            <span>
              войти/
              <br />
              регистрация
            </span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default AppBar;
