import { useAuth } from '@/lib/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function KeyVisual() {
  const { loginState } = useAuth();

  return (
    <div
      className="relative flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-10 bg-cover bg-center bg-repeat-x text-center"
      style={{ backgroundImage: 'url(/images/back-line.png)' }}
    >
      <div>
        <h2 className="font-point text-[40px] font-medium leading-relaxed">
          나만 갖고 있기엔 <br /> 아까운 글이 있지 않나요?
        </h2>
      </div>

      <span className="font-point text-xl">
        다른 사람들과 감정을 공유해 보세요.
      </span>

      <Link
        href={loginState ? '/main' : '/login'}
        className="flex h-16 w-72 items-center justify-center rounded-xl bg-black-500 text-xl font-semibold text-white"
      >
        시작하기
      </Link>

      <div className="absolute bottom-14 left-[50%] flex translate-x-[-50%] flex-col items-center justify-center gap-1 text-base font-semibold">
        <span className="text-blue-400">더 알아보기</span>
        <Image
          src="/icons/scroll-icon.svg"
          className="animate-bounce"
          width={24}
          height={24}
          alt="스크롤 아이콘"
        />
      </div>
    </div>
  );
}
