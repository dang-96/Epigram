import { useUserInfo } from '@/lib/hooks/useUserInfo';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  const { loginState, userData } = useUserInfo();

  return (
    <header className="border-b-[1px] border-[#D7D7D7] px-5">
      {loginState ? (
        <div className="mx-auto flex h-[80px] w-full max-w-[1680px] items-center justify-between gap-5">
          <div className="flex items-center gap-8">
            <h1>
              <Link href="/main">
                <Image
                  src="/images/logo.png"
                  width={131}
                  height={36}
                  alt="epigram 로고"
                />
              </Link>
            </h1>
            <div className="flex items-center gap-6">
              <Link
                href="/feed"
                className="text-base font-semibold text-black-600"
              >
                피드
              </Link>
              <Link
                href="/search"
                className="text-base font-semibold text-black-600"
              >
                검색
              </Link>
            </div>
          </div>
          <div>
            <Link
              href="/myPage"
              className="flex items-center gap-2 text-base font-medium text-gray-300"
            >
              <span
                style={{
                  backgroundImage: `url(${userData?.image || '/images/profile-default.png'})`,
                }}
                className="black h-9 w-9 rounded-full bg-white bg-cover bg-center"
              />
              {userData?.nickname || '유저'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex h-[80px] w-full max-w-[1680px] items-center justify-between">
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
