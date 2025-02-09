import { postSignUp } from '@/lib/apis/api';
import { useLoggedInReDirect } from '@/lib/hooks/useLoggedInRedirect';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Todo - 회원가입 페이지 컴포넌트 나누기
// Todo - 회원가입 상태 토스트 메시지로 띄우기
export default function Signup() {
  const [passwordView, setPasswordView] = useState<boolean>(false);
  const [passwordCheckView, setPasswordCheckView] = useState<boolean>(false);
  const SIGNUP_INPUT_LIST = [
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
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?;,.]).{8,}$/,
          message: '비밀번호는 숫자, 영어, 특수문자가 포함되어야 합니다.',
        },
      },
    },
    {
      id: 'passwordCheck',
      label: '비밀번호 확인',
      type: passwordCheckView ? 'text' : 'password',
      placeholder: '비밀번호 확인을 입력해주세요.',
      validation: {
        required: '비밀번호 확인을 입력해주세요.',
        validate: (value: string) =>
          value === passwordValue || '비밀번호가 일치하지 않습니다.',
      },
    },
    {
      id: 'nickname',
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임을 입력해주세요.',
      validation: {
        required: '닉네임을 입력해주세요.',
      },
    },
  ];

  const INPUT_CLASS =
    'h-16 w-full rounded-xl border-[1px] border-blue-300 bg-background p-4 text-xl text-black-950 placeholder:text-blue-400 focus:border-blue-300 focus:bg-blue-200 focus-visible:outline-none';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onBlur',
    shouldFocusError: true, // 에러가 발생한 input에 포커스 적용
  });

  const passwordValue = watch('password', ''); // 비밀번호의 값을 저장

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      // 이메일, 비밀번호, 비밀번호 확인 공백 제거
      const cleanedEmail = data.email.replace(/\s+/g, '');
      const cleanedPassword = data.password.replace(/\s+/g, '');
      const cleanedPasswordCheck = data.passwordCheck.replace(/\s+/g, '');

      // 회원가입 api 호출(이메일, 비밀번호, 비밀번호 확인은 공백이 제거된 상태로 서버에 전송)
      const res = await postSignUp({
        ...data,
        email: cleanedEmail,
        password: cleanedPassword,
        passwordCheck: cleanedPasswordCheck,
      });

      // 회원가입 후 로그인 페이지로 이동
      router.push('/login');
    } catch (error) {
      console.log('회원가입 도중 에러 발생', error);
    }
  };

  // 로그인이 되어있는 상태로 접근시 메인 페이지로 리다이렉트
  useLoggedInReDirect();

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

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          {SIGNUP_INPUT_LIST.map((input) => {
            // 비밀번호와 비밀번호 확인 input 아이콘 따로 작동하도록 구현
            let inputIconSrc = '';

            if (input.id === 'password') {
              inputIconSrc = passwordView
                ? '/icons/visibility-on-icon.svg'
                : '/icons/visibility-off-icon.svg';
            } else if (input.id === 'passwordCheck') {
              inputIconSrc = passwordCheckView
                ? '/icons/visibility-on-icon.svg'
                : '/icons/visibility-off-icon.svg';
            }

            return (
              <div
                key={input.id}
                className="relative mb-10 block w-full max-w-[640px]"
              >
                <label className="mb-5 block" htmlFor={input.id}>
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
                {input.id === 'password' || input.id === 'passwordCheck' ? (
                  <button
                    type="button"
                    className="absolute right-4 top-[63.5px]"
                    onClick={() => {
                      if (input.id === 'password') {
                        setPasswordView(!passwordView);
                      } else {
                        setPasswordCheckView(!passwordCheckView);
                      }
                    }}
                  >
                    <Image
                      src={inputIconSrc}
                      width={24}
                      height={24}
                      alt="비밀번호 숨기기 아이콘"
                    />
                  </button>
                ) : (
                  ''
                )}
                {errors[input.id] && (
                  <p className="absolute bottom-[-22px] left-0 text-sm text-red">
                    {String(errors[input.id]?.message) ||
                      '오류가 발생했습니다.'}
                  </p>
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="mt-6 h-[64px] w-full max-w-[640px] rounded-xl bg-black-500 text-xl text-white disabled:bg-blue-300"
            disabled={!isValid}
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
