import { useAuth } from '@/lib/context/AuthContext';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingLast() {
  const { loginState } = useAuth();

  return (
    <div
      className="relative flex h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-repeat-x"
      style={{ backgroundImage: 'url(/images/back-line.png)' }}
    >
      <h2
        className={clsx('m-8', 'xl:mb-12')}
        data-aos="zoom-out-up"
        data-aos-duration="1500"
      >
        <Image
          src="/images/every.png"
          className={clsx('h-[70px] w-[122px]', 'xl:h-[105px] xl:w-[184px]')}
          width={184}
          height={105}
          alt="날마다 에피그램"
        />
      </h2>
      <Link
        href={loginState ? '/main' : '/login'}
        className={clsx(
          'flex h-12 w-28 items-center justify-center rounded-xl bg-black-500 text-base font-semibold text-white',
          'xl:h-16 xl:w-72 xl:text-xl'
        )}
        data-aos="zoom-out-up"
        data-aos-duration="1500"
        data-aos-delay="200"
      >
        시작하기
      </Link>
    </div>
  );
}
