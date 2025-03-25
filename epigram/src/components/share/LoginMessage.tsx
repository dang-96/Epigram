import Link from 'next/link';

export default function LoginMessage() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10 px-5"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <h2 className="text-3xl">로그인 후 이용해 주세요!</h2>
      <Link
        href="/login"
        className="flex h-16 w-72 items-center justify-center rounded-xl bg-black-500 text-xl font-semibold text-white"
      >
        로그인 하러 가기
      </Link>
    </div>
  );
}
