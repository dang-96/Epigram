import { useAuth } from '@/lib/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingLast() {
  const { loginState } = useAuth();

  return (
    <div
      className="relative flex h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-repeat-x"
      style={{ backgroundImage: 'url(/images/back-line.png)' }}
    >
      <h2 className="mb-12" data-aos="zoom-out-up" data-aos-duration="1500">
        <Image
          src="/images/every.png"
          width={184}
          height={105}
          alt="날마다 에피그램"
        />
      </h2>
      <Link
        href={loginState ? '/main' : '/login'}
        className="flex h-16 w-72 items-center justify-center rounded-xl bg-black-500 text-xl font-semibold text-white"
        data-aos="zoom-out-up"
        data-aos-duration="1500"
        data-aos-delay="200"
      >
        시작하기
      </Link>
    </div>
  );
}
