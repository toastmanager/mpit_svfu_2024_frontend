import Link from 'next/link';

const AppBar = () => {
  return (
    <section className="bg-background w-full h-[50px] px-4 xl:px-0">
      <div className='flex flex-wrap justify-between text-primary text-base max-w-[1200px] mx-auto space-x-1 text-right'>
        <Link href={'/'}>
          <span className="text-4xl">якутия go</span>
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
        <Link href={'/'}>
          <span>
            войти/
            <br />
            регистрация
          </span>
        </Link>
      </div>
    </section>
  );
};

export default AppBar;
