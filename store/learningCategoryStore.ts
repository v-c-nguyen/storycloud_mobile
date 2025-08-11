import { create } from 'zustand';

interface LearningCategory {
  id: number;
  name: string;
  // Add other fields as needed
}

interface LearningCategoryStore {
  categories: LearningCategory[];
  setCategories: (categories: LearningCategory[]) => void;
}

export const useLearningCategoryStore = create<LearningCategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
