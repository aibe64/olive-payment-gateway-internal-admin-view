import { create } from "zustand";
import { State } from "@/models";

export const usePageStore = create<State.PageState<any>>((set) => ({
  setAllState: (newState: State.PageState<any>) => {
    set(() => ({ ...newState }));
  },
  setState: (key: keyof any, value: any) => {
    set((state: State.PageState<any>) => ({
      ...state,
      [key]: value,
    }));
  },
}));
