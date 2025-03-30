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
            'lg:h-[80px]'
          )}
        >
          <div className="flex items-center gap-8">
            <h1>
              <Link href="/main">
                <Image
                  src="/images/logo.png"
                  className={clsx(
                    'h-[26px] w-[101px]',
                    'lg:h-[36px] lg:w-[131px]'
                  )}
                  width={131}
                  height={36}
                  alt="epigram 로고"
                />
              </Link>
            </h1>
            <div className="flex items-center gap-6">
              <Link
                href="/feed"
                className={clsx(
                  'text-sm font-semibold text-black-600',
                  'lg:text-base'
                )}
              >
                피드
              </Link>
              <Link
                href="/search"
                className={clsx(
                  'text-sm font-semibold text-black-600',
                  'lg:text-base'
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
                'lg:text-base'
              )}
            >
              <span
                style={{
                  backgroundImage: `url(${user?.image || '/images/profile-default.png'})`,
                }}
                className={clsx(
                  'black h-6 w-6 rounded-full bg-white bg-cover bg-center',
                  'lg:h-9 lg:w-9'
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
            'lg:h-[80px]'
          )}
        >
          <Link href="/search" className="w-28">
            <Image
              src="/icons/search-icon.svg"
              width={36}
              height={36}
              alt="검색 아이콘"
            />
          </Link>
          <h1>
            <Link href="/">
              <Image
                src="/images/logo.png"
                className={clsx(
                  'h-[36px] w-[120px]',
                  'lg:h-[48px] lg:w-[172px]'
                )}
                width={172}
                height={48}
                alt="epigram 로고"
              />
            </Link>
          </h1>
          <Link
            href="/login"
            className="flex h-10 w-28 items-center justify-center rounded-lg bg-gray-100 transition-all hover:bg-gray-200"
          >
            로그인
          </Link>
        </div>
      )}
    </header>
  );
}
