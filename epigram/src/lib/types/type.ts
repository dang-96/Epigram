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
