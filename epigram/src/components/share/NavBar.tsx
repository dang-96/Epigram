import { useAuth } from '@/lib/context/AuthContext';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  const { loginState, user } = useAuth();

  return (
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
          <div className={clsx('flex items-center gap-6', 'xl:gap-8')}>
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
            <div className={clsx('flex items-center gap-4', 'xl:gap-6')}>
              <Link
                href="/feed"
                className={clsx(
                  'text-sm font-semibold text-black-600',
                  'xl:text-base'
                )}
              >
                피드
              </Link>
              <Link
                href="/search"
                className={clsx(
                  'text-sm font-semibold text-black-600',
                  'xl:text-base'
                )}
              >
                검색
              </Link>
            </div>
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
  );
}
