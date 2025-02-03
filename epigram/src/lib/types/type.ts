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

// 에피그램 상세 타입
export interface EpigramDetailType extends EpigramType {
  isLiked: boolean;
}

// 최신 에피그램 params
export interface EpigramParamsType {
  limit: number;
  cursor?: number;
  keyword?: string;
  writerId?: string;
}

// 최신 댓글 params
export interface CommentParamsType {
  limit: number;
  cursor?: number;
}

// 상세 댓글 params
export interface CommentDetailParamsType extends CommentParamsType {
  id: string;
}

// 댓글 작성자
export interface Writer {
  image: string;
  nickname: string;
  id: number;
}

// 댓글 리스트 타입
export interface CommentListType {
  epigramId: number;
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
  id: number;
}

// 댓글 타입
export interface CommentType {
  list: CommentListType[];
  nextCursor: number | null;
  totalCount: number;
}
