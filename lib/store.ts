'use client';

import { create } from 'zustand';

interface AppState {
  isTeacherMode: boolean;
  setTeacherMode: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isTeacherMode: false,
  setTeacherMode: (value) => set({ isTeacherMode: value }),
}));