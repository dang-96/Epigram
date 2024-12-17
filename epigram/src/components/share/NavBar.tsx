import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="border-b-[1px] border-[#D7D7D7] px-5">
      <div className="mx-auto flex h-[80px] w-full max-w-[1680px] items-center justify-between">
        <Link href="/search">
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
        <Link href="/myPage">
          <Image
            src="/icons/profile-icon.svg"
            width={36}
            height={36}
            alt="프로필 아이콘"
          />
        </Link>
      </div>
    </header>
  );
}
