import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const INPUT_CLASS =
    'h-full w-full rounded-xl border-[1px] border-blue-300 bg-background p-4 text-xl text-black-950 placeholder:text-blue-400 focus:border-blue-300 focus:bg-blue-200 focus-visible:outline-none';

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-background">
      <h2 className="mb-14">
        <Image
          src="/images/logo.png"
          width={172}
          height={48}
          alt="epigram 로고"
        />
      </h2>

      <form className="w-full">
        <div className="flex flex-col items-center justify-center">
          <label className="mb-4 block h-[64px] w-full max-w-[640px]">
            <input type="email" className={INPUT_CLASS} placeholder="이메일" />
          </label>
          <label className="relative block h-[64px] w-full max-w-[640px]">
            <input
              type="password"
              className={clsx(INPUT_CLASS, 'pr-14')}
              placeholder="비밀번호"
            />
            <button
              type="button"
              className="absolute right-4 top-[50%] translate-y-[-50%]"
            >
              <Image
                src="/icons/visibility-off-icon.svg"
                width={24}
                height={24}
                alt="비밀번호 숨기기 아이콘"
              />
            </button>
          </label>
          <button
            type="submit"
            className="mt-6 h-[64px] w-full max-w-[640px] rounded-xl bg-blue-300 text-xl text-white"
          >
            로그인
          </button>
        </div>
      </form>
      <div className="mb-14 mt-3 flex w-full max-w-[640px] items-center justify-end gap-2">
        <p className="text-xl font-medium text-blue-400">회원이 아니신가요?</p>
        <Link
          href="/signup"
          className="text-xl font-medium text-black-500 underline"
        >
          가입하기
        </Link>
      </div>
      <div className="login-line relative mb-10 w-full max-w-[640px] text-center">
        <span className="relative z-[2] bg-background px-6 text-xl text-[#ABB8CE]">
          SNS 계정으로 로그인하기
        </span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className="flex h-[60px] w-[60px] items-center justify-center rounded-xl border-2 border-[##E6E6EA]"
        >
          <Image
            src="/icons/google-icon.svg"
            width={27}
            height={27}
            alt="구글 아이콘"
          />
        </button>
        <button
          type="button"
          className="flex h-[60px] w-[60px] items-center justify-center rounded-xl border-2 border-[##E6E6EA]"
        >
          <Image
            src="/icons/kakao-icon.svg"
            width={30}
            height={27}
            alt="카카오 아이콘"
          />
        </button>
      </div>
    </div>
  );
}
