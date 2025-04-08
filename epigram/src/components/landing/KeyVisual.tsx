import { useAuth } from '@/lib/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function KeyVisual() {
  const { loginState } = useAuth();

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  return (
    <div
      className={clsx(
        'relative flex h-[calc(100vh-52px)] w-full flex-col items-center justify-center bg-cover bg-center bg-repeat-x px-[10px] text-center',
        'sm:h-[calc(100vh-60px)] sm:px-5',
        'xl:h-[calc(100vh-80px)]'
      )}
      style={{ backgroundImage: 'url(/images/back-line.png)' }}
    >
      <div data-aos="zoom-out-up" data-aos-duration="1500">
        <h2
          className={clsx(
            'font-point text-2xl font-medium leading-relaxed',
            'sm:text-[32px]',
            'xl:text-[40px]'
          )}
        >
          나만 갖고 있기엔 <br /> 아까운 글이 있지 않나요?
        </h2>
      </div>

      <span
        className={clsx(
          'mb-6 mt-2 font-point text-sm',
          'sm:mb-8 sm:mt-6 sm:text-xl',
          'xl:mb-12 xl:mt-10'
        )}
        data-aos="zoom-out-up"
        data-aos-duration="1500"
        data-aos-delay="200"
      >
        다른 사람들과 감정을 공유해 보세요.
      </span>

      <Link
        href={loginState ? '/main' : '/login'}
        data-aos="zoom-out-up"
        data-aos-duration="1500"
        data-aos-delay="300"
        className={clsx(
          'flex h-12 w-28 items-center justify-center rounded-xl bg-black-500 text-base font-semibold text-white',
          'xl:h-16 xl:w-72 xl:text-xl'
        )}
      >
        시작하기
      </Link>

      <div className="absolute bottom-14 left-[50%] flex translate-x-[-50%] flex-col items-center justify-center gap-1 text-base font-semibold">
        <span className={clsx('text-sm text-blue-400', 'sm:text-base')}>
          더 알아보기
        </span>
        <Image
          src="/icons/scroll-icon.svg"
          className="animate-bounce"
          width={24}
          height={24}
          alt="스크롤 아이콘"
        />
      </div>
    </div>
  );
}
