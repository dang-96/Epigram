import axiosInstance from './instance';
import { END_POINT } from './path';
import { LoginType, SignUpType, UserInfoChangeType } from '../types/type';

// 회원가입 api(post)
export const postSignUp = async ({
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

    return response;
  } catch (error: any) {
    console.log('회원가입 에러:', error.response.data.message);
    throw new Error(error.response.data.message || '회원가입에 실패했습니다.');
  }
};

// 로그인 api(post)
export const postLogin = async ({ email, password }: LoginType) => {
  try {
    const response = await axiosInstance.post(END_POINT.auth.signIn, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error: any) {
    console.log('로그인 api 에러', error.response.data.message);
    throw new Error(error.response.data.message || '로그인에 실패했습니다.');
  }
};

// 유저 정보(get)
export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get(END_POINT.user.me);

    return response.data;
  } catch (error) {
    console.log('유저 정보 가져오기 api 에러', error);
    throw new Error('유저 정보 데이터를 가져오는데 실패했습니다.');
  }
};

// 이미지 url 변환(post)
export const postImageUrl = async (imageFile: any) => {
  try {
    const response = await axiosInstance.post(END_POINT.image, imageFile);

    return response.data;
  } catch (error) {
    console.log('이미지 파일 url 변환 api 에러', error);
    throw new Error('이미지 파일 url 변환에 실패했습니다.');
  }
};

// 프로필 이미지 변경(patch)
export const patchProfileImage = async ({
  image,
  nickname,
}: UserInfoChangeType) => {
  try {
    const response = await axiosInstance.patch(END_POINT.user.me, {
      image: image,
      nickname: nickname,
    });

    return response.status;
  } catch (error) {
    console.log('프로필 이미지 변경 api 에러', error);
    throw new Error('프로필 이미집 변경에 실패했습니다.');
  }
};
