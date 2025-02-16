import {
  EpigramParamsType,
  EpigramPatchType,
  EpigramWriteType,
} from '../types/type';
import axiosInstance from './instance';
import { END_POINT } from './path';

// 오늘의 에피그램(get)
export const fetchTodayEpigram = async () => {
  try {
    const response = await axiosInstance.get(END_POINT.epigram.today);
    return response;
  } catch (error) {
    console.log('오늘의 에피그램 api 오류', error);
    throw new Error('오늘의 에피그램 데이터를 가져오는데 실패했습니다.');
  }
};

// 최신 에피그램(get)
export const fetchNewEpigram = async ({
  limit,
  cursor = 0,
  keyword = '',
}: EpigramParamsType) => {
  try {
    const response = await axiosInstance.get(END_POINT.epigram.base, {
      params: {
        limit: limit,
        cursor: cursor,
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.log('최신 에피그램 api 오류', error);
    throw new Error('최신 에피그램 데이터를 가져오는데 실패했습니다.');
  }
};

// 에피그램 상세 정보(get)
export const fetchEpigramDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(END_POINT.epigram.detail.base(id));

    return response.data;
  } catch (error) {
    console.log('에피그램 상세 데이터 api 오류', error);
    throw new Error('에피그램 상세 데이터를 가져오는데 실패했습니다.');
  }
};

// 에피그램 작성(post)
export const postEpigram = async ({
  tags,
  referenceUrl,
  referenceTitle,
  author,
  content,
}: EpigramWriteType) => {
  try {
    const response = await axiosInstance.post(END_POINT.epigram.base, {
      tags: tags,
      referenceUrl: referenceUrl,
      referenceTitle: referenceTitle,
      author: author,
      content: content,
    });

    return response.status;
  } catch (error) {
    console.log('에피그램 작성 api 오류', error);
    throw new Error('에피그램 작성을 실패했습니다.');
  }
};

// 에피그램 수정(patch)
export const patchEpigram = async ({
  id,
  tags,
  referenceUrl,
  referenceTitle,
  author,
  content,
}: EpigramPatchType) => {
  try {
    const response = await axiosInstance.patch(
      END_POINT.epigram.detail.base(id),
      {
        tags: tags,
        referenceUrl: referenceUrl,
        referenceTitle: referenceTitle,
        author: author,
        content: content,
      }
    );

    return response.status;
  } catch (error) {
    console.log('에피그램 수정 api 오류', error);
    throw new Error('에피그램 수정을 실패했습니다.');
  }
};

// 에피그램 삭제(delete)
export const deleteEpigram = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      END_POINT.epigram.detail.base(id)
    );

    return response.status;
  } catch (error) {
    console.log('에피그램 삭제 api 오류', error);
    throw new Error('에피그램 삭제를 실패했습니다.');
  }
};

// 에피르램 좋아요 등록(post)
export const postEpigramLike = async (id: number) => {
  try {
    const response = await axiosInstance.post(
      END_POINT.epigram.detail.like(id)
    );

    return response.status;
  } catch (error) {
    console.log('에피그램 좋아요 등록 api 오류', error);
    throw new Error('에피그램 좋아요 등록 실패');
  }
};

// 에피그램 좋아요 삭제(delete)
export const deleteEpigramLike = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      END_POINT.epigram.detail.like(id)
    );

    return response.status;
  } catch (error) {
    console.log('에피그램 좋아요 등록 api 오류', error);
    throw new Error('에피그램 좋아요 등록 실패');
  }
};
