import axiosInstance from './instance';
import { END_POINT } from './path';

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
