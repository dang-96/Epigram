import { CommentDetailParamsType, CommentParamsType } from '../types/type';
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
