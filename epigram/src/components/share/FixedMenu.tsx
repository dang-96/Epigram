import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FixedMenu() {
  const APPLY_PATH = ['/main', '/feed'];
  const router = useRouter();
  const [showTopButton, setShowTopButton] = useState<boolean>(false);
  const [buttonHover, setButtonHover] = useState<boolean>(false);

  const writeButtonShow = APPLY_PATH.includes(router.pathname);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleRouterChange = () => {
      setButtonHover(false);
    };

    router.events.on('routeChangeStart', handleRouterChange);

    return () => {
      router.events.off('routeChangeStart', handleRouterChange);
    };
  }, [router]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {writeButtonShow && (
        <Link
          href="/write"
          className={clsx(
            'fixed bottom-[calc(20px+58px)] right-5 z-50 flex h-12 items-center justify-center rounded-full text-sm font-semibold text-blue-100 shadow-[4px_4px_4px_rgba(172,172,172,0.3)] transition-all ',
            'xl:bottom-[calc(20px+74px)] xl:h-16 xl:text-xl',
            buttonHover
              ? 'w-[145px] bg-blue-700 xl:w-48'
              : 'w-12 bg-blue-900 xl:w-16'
          )}
          onMouseEnter={() => {
            setButtonHover(true);
          }}
          onMouseLeave={() => {
            setButtonHover(false);
          }}
        >
          {buttonHover ? (
            <span className="whitespace-nowrap">+ 에피그램 만들기</span>
          ) : (
            <Image
              src="icons/pen-icon.svg"
              className={clsx('h-[24px] w-[24px]', 'xl:h-[30px] xl:w-[30px]')}
              width={30}
              height={30}
              alt="팬 아이콘"
            />
          )}
        </Link>
      )}

      <button
        type="button"
        onClick={scrollToTop}
        className={clsx(
          'fixed bottom-[20px] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 transition-all duration-500  ease-in-out hover:bg-blue-700',
          'xl:h-16 xl:w-16',
          {
            'pointer-events-auto opacity-100': showTopButton,
            'pointer-events-none opacity-0': !showTopButton,
          }
        )}
      >
        <Image
          src="/icons/top-arrow-icon.svg"
          className={clsx('h-[10px] w-[18px]', 'xl:w-22px] xl:h-[12px]')}
          width={22}
          height={12}
          alt="상단 화살표 아이콘"
        />
      </button>
    </>
  );
}
