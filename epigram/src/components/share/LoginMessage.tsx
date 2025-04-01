import clsx from 'clsx';
import Link from 'next/link';

export default function LoginMessage() {
  return (
    <div
      className={clsx(
        'flex h-[calc(100vh-52px)] w-full flex-col items-center justify-center gap-6 px-[10px]',
        'sm:h-[calc(100vh-60px)] sm:gap-8',
        'xl:h-[calc(100vh-80px)] xl:gap-10 xl:px-5'
      )}
    >
      <h2
        className={clsx(
          'text-center text-lg font-semibold',
          'sm:text-xl',
          'xl:text-3xl'
        )}
      >
        로그인 후 이용해 주세요!
      </h2>
      <Link
        href="/login"
        className={clsx(
          'flex h-12 w-full max-w-72 items-center justify-center rounded-xl bg-black-500 text-base font-semibold text-white',
          'xl:h-16 xl:text-xl'
        )}
      >
        로그인 하러 가기
      </Link>
    </div>
  );
}
