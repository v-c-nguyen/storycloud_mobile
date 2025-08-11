import { create } from 'zustand';

export interface Child {
  id: string;
  name: string;
  age: number;
  mode: string;
  avatar_url?: string;
}

interface ChildrenState {
  children: Child[];
  setChildren: (children: Child[]) => void;
  updateChild: (index: number, child: Partial<Child>) => void;
  addChild: (child: Child) => void;
  removeChild: (index: number) => void;
}

export const useChildrenStore = create<ChildrenState>((set) => ({
  children: [],
  setChildren: (children) => set({ children }),
  updateChild: (index, child) => set((state) => {
    const updated = [...state.children];
    updated[index] = { ...updated[index], ...child };
    return { children: updated };
  }),
  addChild: (child) => set((state) => ({ children: [...state.children, child] })),
  removeChild: (index) => set((state) => {
    const updated = [...state.children];
    updated.splice(index, 1);
    return { children: updated };
  }),
}));
