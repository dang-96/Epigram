import { postLogin } from '@/lib/apis/api';
import { useAuth } from '@/lib/context/AuthContext';
import { useLoggedInReDirect } from '@/lib/hooks/useLoggedInRedirect';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Todo - 로그인 상태 토스트 메시지로 띄우기
export default function LoginPage() {
  const [passwordView, setPasswordView] = useState<boolean>(false);
  const LOGIN_INPUT_LIST = [
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요.',
      validation: {
        required: '이메일을 입력해주세요.',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: '이메일 형식에 맞게 입력해주세요.',
        },
      },
    },
    {
      id: 'password',
      label: '비밀번호',
      type: passwordView ? 'text' : 'password',
      placeholder: '비밀번호를 입력해주세요.',
      validation: {
        required: '비밀번호를 입력해주세요.',
        minLength: {
          value: 8,
          message: '비밀번호는 8자 이상이어야 합니다.',
        },
      },
    },
  ];

  const INPUT_CLASS = clsx(
    'h-11 w-full rounded-xl border-[1px] border-blue-300 bg-background px-4 text-base text-black-950 placeholder:text-blue-400 focus:border-blue-300 focus:bg-blue-200 focus-visible:outline-none',
    'xl:h-16 xl:text-xl'
  );

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true, // 에러가 발생한 input에 포커스 적용
  });

  const router = useRouter();

  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      // 이메일, 비밀번호 공백 제거
      const cleanedEmail = data.email.replace(/\s+/g, '');
      const cleanedPassword = data.password.replace(/\s+/g, '');

      const res = await postLogin({
        ...data,
        email: cleanedEmail,
        password: cleanedPassword,
      });

      // 로그인 후 메인 페이지로 이동
      router.push('/main');

      login(res);
    } catch (error: any) {
      console.log('로그인 api 호출 후 에러', error.message);

      // api 호출했을경우 생긴 에러일 경우 해당 에러 메시지를 useForm의 setError로 수정
      if (error.message.includes('이메일')) {
        // 이메일에 관련된 에러
        setError('email', { type: 'manual', message: error.message });
      } else if (error.message.includes('비밀번호')) {
        // 비밀번호에 관련된 에러
        setError('password', { type: 'manual', message: error.message });
      }
    }
  };

  useLoggedInReDirect();

  useEffect(() => {
    // 컴포넌트가 렌더링된 후 초기 값 설정
    setValue('email', 'test0225@email.com');
    setValue('password', 'test1234!');

    trigger();
  }, [setValue]);

  // 로그인이 되어있는 상태로 접근시 메인 페이지로 리다이렉트

  return (
    <div
      className={clsx(
        'flex h-[calc(100vh-52px)] w-full flex-col items-center justify-center bg-background px-[10px]',
        'sm:h-[calc(100vh-60px)]',
        'xl:h-[calc(100vh-80px)] xl:px-5'
      )}
    >
      <h2 className={clsx('mb-[50px]', 'xl:mb-[60px]')}>
        <Image
          src="/images/logo.png"
          width={172}
          height={48}
          alt="epigram 로고"
        />
      </h2>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          {LOGIN_INPUT_LIST.map((input) => {
            return (
              <div
                key={input.id}
                className={clsx(
                  'relative mb-7 block w-full max-w-[640px]',
                  'xl:mb-10'
                )}
              >
                <label
                  className={clsx('mb-2 block', 'xl:mb-5')}
                  htmlFor={input.id}
                >
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.id}
                  className={clsx(
                    INPUT_CLASS,
                    errors[input.id] && 'border-red focus:border-red'
                  )}
                  placeholder={input.placeholder}
                  {...register(input.id, input.validation)}
                />
                {input.id === 'password' ? (
                  <button
                    type="button"
                    className={clsx(
                      'absolute right-4 top-[43.5px]',
                      'xl:top-[63.5px]'
                    )}
                    onClick={() => {
                      setPasswordView(!passwordView);
                    }}
                  >
                    <Image
                      src={
                        passwordView
                          ? '/icons/visibility-on-icon.svg'
                          : '/icons/visibility-off-icon.svg'
                      }
                      width={24}
                      height={24}
                      alt="비밀번호 숨기기 아이콘"
                    />
                  </button>
                ) : (
                  ''
                )}
                {errors[input.id] && (
                  <p
                    className={clsx(
                      'absolute bottom-[-20px] left-0 text-xs text-red',
                      'xl:bottom-[-22px] xl:text-sm'
                    )}
                  >
                    {String(errors[input.id]?.message) ||
                      '오류가 발생했습니다.'}
                  </p>
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className={clsx(
              'mt-4 h-[44px] w-full max-w-[640px] rounded-xl bg-black-500 text-base font-semibold text-white disabled:bg-blue-300 disabled:font-normal',
              'xl:mt-6 xl:h-[64px] xl:text-xl'
            )}
            disabled={!isValid}
          >
            로그인
          </button>
        </div>
      </form>
      <div className="mb-14 mt-3 flex w-full max-w-[640px] items-center justify-end gap-2">
        <p
          className={clsx(
            'text-sm font-medium text-blue-400',
            'sm:text-base',
            'xl:text-xl'
          )}
        >
          회원이 아니신가요?
        </p>
        <Link
          href="/signup"
          className={clsx(
            'text-sm font-medium text-black-500 underline',
            'sm:text-base',
            'xl:text-xl'
          )}
        >
          가입하기
        </Link>
      </div>
      {/* <div className="login-line relative mb-10 w-full max-w-[640px] text-center">
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
      </div> */}
    </div>
  );
}
