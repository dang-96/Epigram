import { create } from 'zustand';

interface uploadEmotionType {
  id: string;
  text: string;
  image: string;
}

interface useEmotionStoreType {
  emotion: uploadEmotionType;
  setEmotion: (uploadEmotion: uploadEmotionType) => void;
}

export const useEmotionStore = create<useEmotionStoreType>((set) => ({
  emotion: {
    id: 'MOVED',
    text: '감동',
    image: '/images/face-inspiration.png',
  },
  setEmotion: (uploadEmotion: uploadEmotionType) =>
    set(() => ({ emotion: uploadEmotion })),
}));
