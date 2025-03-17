import { create } from 'zustand';

interface EmotionDateState {
  emotionDate: Date;
  setEmotionDate: (date: any) => void;
}

export const useEmotionDateStore = create<EmotionDateState>((set) => ({
  emotionDate: new Date(),
  setEmotionDate: (date: Date) => {
    set({ emotionDate: date });
  },
}));
