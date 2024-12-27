import Image from 'next/image';
import Link from 'next/link';

export default function FixedMenu() {
  return (
    <>
      <Link
        href="/"
        className="fixed bottom-[20%] right-28 flex h-16 w-full max-w-48 items-center justify-center rounded-full bg-blue-900 text-xl font-semibold text-blue-100 shadow-[4px_4px_4px_rgba(172,172,172,0.3)]"
      >
        + 에피그램 만들기
      </Link>
      <button
        type="button"
        className="fixed bottom-[12%] right-28 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900"
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
