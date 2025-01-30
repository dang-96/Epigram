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
