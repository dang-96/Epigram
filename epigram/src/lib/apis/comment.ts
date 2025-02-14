import {
  CommentDetailParamsType,
  CommentParamsType,
  CommentPostType,
  PatchComment,
} from '../types/type';
import axiosInstance from './instance';
import { END_POINT } from './path';

// 최신 댓글(get)
export const fetchNewComment = async ({ limit, cursor }: CommentParamsType) => {
  try {
    const response = await axiosInstance.get(END_POINT.comment.base, {
      params: {
        limit: limit,
        cursor: cursor,
      },
    });
    return response.data;
  } catch (error) {
    console.log('최신 댓글 api 에러', error);
    throw new Error('최신 댓글 데이터를 가져오는데 실패했습니다.');
  }
};

// 에피그램 상세 댓글(get)
export const fetchCommentDetail = async ({
  id,
  limit,
  cursor,
}: CommentDetailParamsType) => {
  try {
    const response = await axiosInstance.get(
      END_POINT.epigram.detail.comments(id),
      {
        params: {
          limit: limit,
          cursor: cursor,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('에피그램 상세 댓글 api 에러', error);
    throw new Error('에피그램 상세 댓글 데이터를 가져오는데 실패했습니다.');
  }
};

// 댓글 작성(post)
export const postComment = async ({
  epigramId,
  isPrivate,
  content,
}: CommentPostType) => {
  try {
    const response = await axiosInstance.post(END_POINT.comment.base, {
      epigramId: epigramId,
      isPrivate: isPrivate,
      content: content,
    });

    return response.status;
  } catch (error) {
    console.log('댓글 작성 api 에러', error);
    throw new Error('댓글 데이터 전송에 실패했습니다.');
  }
};

// 댓글 삭제(delete)
export const deleteComment = async (commentId: number) => {
  try {
    const response = await axiosInstance.delete(
      END_POINT.comment.detail(commentId)
    );

    return response.status;
  } catch (error) {
    console.log('댓글 삭제 api 에러', error);
    throw new Error('댓글 데이터 삭제에 실패했습니다.');
  }
};

// 댓글 수정(patch)
export const patchComment = async ({
  commentId,
  isPrivate,
  content,
}: PatchComment) => {
  try {
    const response = await axiosInstance.patch(
      END_POINT.comment.detail(commentId),
      {
        isPrivate: isPrivate,
        content: content,
      }
    );

    return response.status;
  } catch (error) {
    console.log('댓글 수정 api 에러', error);
    throw new Error('댓글 데이터 수정에 실패했습니다.');
  }
};
