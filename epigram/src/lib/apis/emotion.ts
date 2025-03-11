import { EmotionMonthlyParamsType } from '../types/type';
import axiosInstance from './instance';
import { END_POINT } from './path';

// 오늘의 감정 전송(post)
export const postEmotion = async (emotion: string) => {
  try {
    const response = await axiosInstance.post(END_POINT.emotionLog.today, {
      emotion: emotion,
    });

    return response;
  } catch (error) {
    console.log('오늘의 감정 전송 api 에러', error);
    throw new Error('오늘의 감정 데이터를 전송하는데 실패했습니다.');
  }
};

// 오늘의 감정 가져오기(get)
export const fetchEmotion = async (userId: number) => {
  try {
    const response = await axiosInstance.get(END_POINT.emotionLog.today, {
      params: {
        userId: userId,
      },
    });

    return response.data;
  } catch (error) {
    console.log('오늘의 감정 가져오기 api 에러', error);
    throw new Error('오늘의 감정 데이터 가져오는데 실패했습니다.');
  }
};

// 날짜에 대한 감정 가져오기(get)
export const fetchEmotionMonthly = async ({
  userId,
  year,
  month,
}: EmotionMonthlyParamsType) => {
  try {
    const response = await axiosInstance.get(END_POINT.emotionLog.monthly, {
      params: {
        userId: userId,
        year: year,
        month: month,
      },
    });

    return response.data;
  } catch (error) {
    console.log('월별 감정 감져오기 api 에러', error);
    throw new Error('월별 감정 가져오는데 실패했습니다.');
  }
};
