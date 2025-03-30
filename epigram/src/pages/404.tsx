import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';

export default function Custom404() {
  const { loginState } = useAuth();
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10 px-5"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <h2 className="text-3xl font-semibold">
        404 - 페이지를 찾을 수 없습니다
      </h2>

      <Link
        href={loginState ? '/main' : '/'}
        className="flex h-16 w-72 items-center justify-center rounded-xl bg-black-500 text-xl font-semibold text-white"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
