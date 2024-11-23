import { Icon } from '@iconify/react';
import Link from 'next/link';

const Footer = () => {
  return (
    <section className="w-full">
      <div className="m-auto max-w-[1200px] text-base text-primary-alternative border-primary border-t-2 flex flex-col items-center pb-6 px-4 xl:px-0">
        <div className="flex flex-wrap justify-between w-full items mt-11 mb-24">
          <div className="w-32">
            <span className='text-primary'>якутия go</span>
          </div>

          <div className="flex gap-x-11">
            <Link href={'/forum'}>
              <span>Наш форум</span>
            </Link>
            <Link href={'/about'}>
              <span>Имбирь</span>
            </Link>
            <Link href={'/blog'}>
              <span>Блог</span>
            </Link>
            <Link href={'/contacts'}>
              <span>Контакты</span>
            </Link>
          </div>

          <div className="flex gap-x-4">
            <Link href={'#'}>
              <Icon icon="mage:whatsapp-filled" className="w-5 h-5" />
            </Link>
            <Link href={'#'}>
              <Icon icon="mage:telegram" className="w-5 h-5" />
            </Link>
            <Link href={'#'}>
              <Icon icon="ri:instagram-fill" className="w-5 h-5" />
            </Link>
            <Link href={'#'}>
              <Icon icon="ri:vk-fill" className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="">
          <span>Copyright © 2024 ООО "ЯГО" | Все права защищены</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
