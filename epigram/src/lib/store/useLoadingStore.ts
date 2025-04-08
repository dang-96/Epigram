import { create } from 'zustand';

interface useLoadingStoreType {
  allLoading: boolean;
  setAllLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<useLoadingStoreType>((set) => ({
  allLoading: false,
  setAllLoading: (loading: boolean) => {
    set({ allLoading: loading });
  },
}));
