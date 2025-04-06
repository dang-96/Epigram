import { useAuth } from '@/lib/context/AuthContext';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const { loginState, user } = useAuth();
  const [isNav, setIsNav] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <>
      {isMobile && (
        <AnimatePresence>
          {isNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsNav(false)}
              className="fixed left-0 top-0 z-40 h-screen w-full bg-[rgba(0,0,0,0.4)]"
            />
          )}
        </AnimatePresence>
      )}

      <header
        className={clsx('border-b-[1px] border-[#D7D7D7] px-[10px]', 'sm:px-5')}
      >
        {loginState ? (
          <div
            className={clsx(
              'mx-auto flex h-[52px] w-full max-w-[1680px] items-center justify-between gap-5',
              'sm:h-[60px]',
              'xl:h-[80px]'
            )}
          >
            <div
              className={clsx('relative flex items-center gap-6', 'xl:gap-8')}
            >
              <div className="flex items-center gap-[12px]">
                {isMobile && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsNav(true);
                    }}
                    className="flex h-6 w-6 flex-col items-center justify-between gap-[3px] px-[3px] py-[6px]"
                  >
                    <span className="block h-[2px] w-full bg-gray-200" />
                    <span className="block h-[2px] w-full bg-gray-200" />
                    <span className="block h-[2px] w-full bg-gray-200" />
                  </button>
                )}

                <h1>
                  <Link href="/main">
                    <Image
                      src="/images/logo.png"
                      className={clsx(
                        'h-[26px] w-[101px]',
                        'xl:h-[36px] xl:w-[131px]'
                      )}
                      width={131}
                      height={36}
                      alt="epigram 로고"
                    />
                  </Link>
                </h1>
              </div>
              {isMobile ? (
                <AnimatePresence>
                  {isNav && (
                    <motion.nav
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '-100%', opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="fixed left-0 top-0 z-50 flex h-screen w-[90%] max-w-[220px] flex-col items-start gap-4 bg-white pt-[52px]"
                    >
                      <button
                        type="button"
                        onClick={() => setIsNav(false)}
                        className="absolute right-4 top-[15px] block sm:hidden"
                      >
                        <Image
                          src="/icons/close-icon.svg"
                          width={24}
                          height={24}
                          alt="닫기 아이콘"
                        />
                      </button>

                      <Link
                        href="/feed"
                        className="w-full border-t-[1px] border-line-100 py-6 pl-5 text-base font-semibold text-black-600 hover:bg-background"
                      >
                        피드
                      </Link>
                      <Link
                        href="/search"
                        className="w-full py-6 pl-5 text-base font-semibold text-black-600 hover:bg-background"
                      >
                        검색
                      </Link>
                    </motion.nav>
                  )}
                </AnimatePresence>
              ) : (
                <nav
                  className={clsx(
                    'flex items-center gap-4 text-sm',
                    'xl:gap-6 xl:text-base'
                  )}
                >
                  <Link href="/feed" className="hover:font-semibold">
                    피드
                  </Link>
                  <Link href="/search" className="hover:font-semibold">
                    검색
                  </Link>
                </nav>
              )}
            </div>
            <div>
              <Link
                href="/myPage"
                className={clsx(
                  'flex items-center gap-2 text-sm font-medium text-gray-300',
                  'xl:text-base'
                )}
              >
                <span
                  style={{
                    backgroundImage: `url(${user?.image || '/images/profile-default.png'})`,
                  }}
                  className={clsx(
                    'black h-6 w-6 rounded-full bg-white bg-cover bg-center',
                    'xl:h-9 xl:w-9'
                  )}
                />
                {user?.nickname || '유저'}
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              'mx-auto flex h-[52px] w-full max-w-[1680px] items-center justify-between',
              'sm:h-[60px]',
              'xl:h-[80px]'
            )}
          >
            <Link href="/search" className={clsx('w-16', 'sm:w-20', 'xl:w-28')}>
              <Image
                src="/icons/search-icon.svg"
                className={clsx('')}
                width={28}
                height={28}
                alt="검색 아이콘"
              />
            </Link>
            <h1>
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  className={clsx(
                    'h-[36px] w-[120px]',
                    'xl:h-[48px] xl:w-[172px]'
                  )}
                  width={172}
                  height={48}
                  alt="epigram 로고"
                />
              </Link>
            </h1>
            <Link
              href="/login"
              className={clsx(
                'flex h-8 w-16 items-center justify-center rounded-md bg-gray-100 text-sm transition-all hover:bg-gray-200',
                'rounded-lg sm:h-10 sm:w-20 sm:text-base',
                'xl:w-28'
              )}
            >
              로그인
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
