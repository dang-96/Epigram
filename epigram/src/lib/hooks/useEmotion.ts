import { useState } from 'react';
import { postEmotion } from '../apis/emotion';
import { useQueryClient } from '@tanstack/react-query';
import { useEmotionStore } from '../store/useEmotionStore';

interface EmotionType {
  emotionId: string;
  emotionText: string;
  emotionImage: string;
}

export const useEmotion = () => {
  const EMOTION_LIST = [
    {
      id: 'MOVED',
      text: '감동',
      image: '/images/face-inspiration.png',
    },
    {
      id: 'HAPPY',
      text: '기쁨',
      image: '/images/face-joy.png',
    },
    {
      id: 'WORRIED',
      text: '고민',
      image: '/images/face-thinking.png',
    },
    {
      id: 'SAD',
      text: '슬픔',
      image: '/images/face-sad.png',
    },
    {
      id: 'ANGRY',
      text: '분노',
      image: '/images/face-anger.png',
    },
  ];
  const queryClient = useQueryClient();
  const { emotion, setEmotion } = useEmotionStore();

  // 오늘의 감정 선택
  const handleEmotionClick = async ({
    emotionId,
    emotionText,
    emotionImage,
  }: EmotionType) => {
    setEmotion({ id: emotionId, text: emotionText, image: emotionImage });
    try {
      await postEmotion(emotionId);
      queryClient.invalidateQueries<any>(['emotion']);
    } catch (error) {
      console.log('감정 데이터 전송 api 호출 에러', error);
    }
  };

  return { EMOTION_LIST, emotion, setEmotion, handleEmotionClick };
};
