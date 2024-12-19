import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
  const INPUT_CLASS =
    'h-16 w-full rounded-xl border-[1px] border-blue-300 bg-background p-4 text-xl text-black-950 placeholder:text-blue-400 focus:border-blue-300 focus:bg-blue-200 focus-visible:outline-none';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background pb-44 pt-20">
      <h2 className="mb-20">
        <Image
          src="/images/logo.png"
          width={172}
          height={48}
          alt="epigram 로고"
        />
      </h2>

      <form className="w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10 block w-full max-w-[640px]">
            <label className="mb-5 block" htmlFor="userId">
              이메일
            </label>
            <input
              type="email"
              id="userId"
              className={INPUT_CLASS}
              placeholder="이메일"
            />
          </div>

          <div className="mb-10 block w-full max-w-[640px]">
            <label className="mb-5 block" htmlFor="userPassword">
              비밀번호
            </label>
            <div className="relative mb-4">
              <input
                type="password"
                id="userPassword"
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
            </div>
            <div className="relative mb-4">
              <input
                type="password"
                id="userPasswordCheck"
                className={clsx(INPUT_CLASS, 'pr-14')}
                placeholder="비밀번호 확인"
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
            </div>
            <span className="text-red mt-2 block text-base">
              숫자, 영어, 특수문자 포함 12자 이상 입력해주세요.
            </span>
          </div>

          <div className="mb-10 block w-full max-w-[640px]">
            <label className="mb-5 block" htmlFor="userName">
              닉네임
            </label>
            <input
              type="text"
              id="userName"
              className={INPUT_CLASS}
              placeholder="닉네임"
            />
          </div>
          <button
            type="submit"
            className="mt-6 h-[64px] w-full max-w-[640px] rounded-xl bg-blue-300 text-xl text-white"
          >
            가입하기
          </button>
        </div>
      </form>
      <div className="login-line relative mb-10 mt-[60px] w-full max-w-[640px] text-center">
        <span className="relative z-[2] bg-background px-6 text-xl text-[#ABB8CE]">
          SNS 계정으로 간편 가입하기
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
