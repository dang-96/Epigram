import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FixedMenu() {
  const router = useRouter();
  const [showTopButton, setShowTopButton] = useState<boolean>(false);
  const APPLY_PATH = ['/main', '/feed'];

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
          className="fixed bottom-[20%] right-28 z-50 flex h-16 w-full max-w-48 items-center justify-center rounded-full bg-blue-900 text-xl font-semibold text-blue-100 shadow-[4px_4px_4px_rgba(172,172,172,0.3)]"
        >
          + 에피그램 만들기
        </Link>
      )}

      <button
        type="button"
        onClick={scrollToTop}
        className={clsx(
          'fixed bottom-[12%] right-28 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 transition-opacity duration-500  ease-in-out',
          {
            'pointer-events-auto opacity-100': showTopButton,
            'pointer-events-none opacity-0': !showTopButton,
          }
        )}
      >
        <Image
          src="/icons/top-arrow-icon.svg"
          width={22}
          height={12}
          alt="상단 화살표 아이콘"
        />
      </button>
    </>
  );
}
