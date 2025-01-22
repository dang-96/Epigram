import axiosInstance from './instance';
import { END_POINT } from './path';
import { LoginType, SignUpType } from '../types/type';

// 회원가입 api
export const fetchSignUp = async ({
  email,
  nickname,
  password,
  passwordCheck,
}: SignUpType) => {
  try {
    const response = await axiosInstance.post(END_POINT.auth.signUp, {
      email: email,
      nickname: nickname,
      password: password,
      passwordConfirmation: passwordCheck,
    });

    // console.log(response);
    return response;
  } catch (error: any) {
    // console.log('회원가입 에러:', error.response.data.message);
    throw new Error(error.response.data.message || '회원가입에 실패했습니다.');
  }
};

// 로그인 api
export const fetchLogin = async ({ email, password }: LoginType) => {
  try {
    const response = await axiosInstance.post(END_POINT.auth.signIn, {
      email: email,
      password: password,
    });

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log('로그인 api 에러', error.response.data.message);
    throw new Error(error.response.data.message || '로그인에 실패했습니다.');
  }
};
