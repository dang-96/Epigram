// 회원가입 타입
export interface SignUpType {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

// 로그인 타입
export interface LoginType {
  email: string;
  password: string;
}

// 유저 정보 타입
export interface UserInfoType {
  email: string;
  nickname: string;
  createdAt: string;
  id: number;
  teamId: string;
  updatedAt: string;
  image: string | null;
}
