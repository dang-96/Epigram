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

// 유저 정보 변경 타입
export interface UserInfoChangeType
  extends Pick<UserInfoType, 'nickname' | 'image'> {}

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
  referenceTitle?: string;
  referenceUrl?: string;
  writerId: number;
  tags?: Tag[];
}

// 에피그럄 작성 타입
export type EpigramWriteType = Omit<
  EpigramType,
  'id' | 'likeCount' | 'writerId' | 'tags'
> & {
  tags?: string[];
};

export type EpigramPatchType = Omit<
  EpigramType,
  'likeCount' | 'writerId' | 'tags'
> & {
  tags?: string[];
};

// 에피그램 상세 타입
export interface EpigramDetailType extends EpigramType {
  isLiked: boolean;
}

export interface EpigramListType {
  list: EpigramType[];
  nextCursor: number | null;
  totalCount: number;
}

// 에피그램 더보기 타입
export interface EpigramScrollType {
  pageParams: unknown[];
  pages: EpigramListType[];
}

// 최신 에피그램 params
export interface EpigramParamsType {
  limit: number;
  cursor?: number;
  keyword?: string;
  writerId?: number | null;
}

// 최신 댓글 params
export interface CommentParamsType {
  limit: number;
  cursor?: number;
}

// 상세 댓글 params
export interface CommentDetailParamsType extends CommentParamsType {
  id: number;
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

// 댓글 무한 스크롤 타입
export interface CommentScrollType {
  pageParams: unknown[];
  pages: CommentType[];
}

// 댓글 작성 타입
export interface CommentPostType {
  epigramId: number;
  isPrivate: boolean;
  content: string;
}

// 댓글 수정 타입
export type PatchComment = Pick<CommentPostType, 'isPrivate' | 'content'> & {
  commentId: number;
};

// 댓글 수정 함수 타입
export type modifyComment = Pick<CommentPostType, 'isPrivate' | 'content'>;

// 월별 감정 조회 타입
export interface EmotionMonthlyParamsType {
  userId: number;
  year: number;
  month: number;
}

export interface EmotionMonthlyType {
  id: number;
  userId: number;
  emotion: string;
  createdAt: string;
}
