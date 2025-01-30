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

// 에피그램 태그 타입
export interface Tag {
  id: number;
  name: string;
}

// 에피그램 타입
export interface EpigramType {
  author: string;
  content: string;
  id: number;
  likeCount: number;
  referenceTitle: string;
  referenceUrl: string;
  writerId: number;
  tags: Tag[];
}
