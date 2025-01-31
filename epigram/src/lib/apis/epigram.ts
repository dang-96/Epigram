import { EpigramParamsType } from '../types/type';
import axiosInstance from './instance';
import { END_POINT } from './path';

// 오늘의 에피그램(get)
export const fetchTodayEpigram = async () => {
  try {
    const response = await axiosInstance.get(END_POINT.epigram.today);
    return response;
  } catch (error) {
    console.log('오늘의 에피그램 api 오류', error);
  }
};

// 최신 에피그램(get)
export const fetchNewEpigram = async ({
  limit,
  cursor = 0,
}: EpigramParamsType) => {
  try {
    const response = await axiosInstance.get(END_POINT.epigram.base, {
      params: {
        limit: limit,
        cursor: cursor,
      },
    });
    return response.data;
  } catch (error) {
    console.log('최신 에피그램 api 오류', error);
    throw new Error('최신 에피그램 데이터를 가져오는데 실패했습니다.');
  }
};
