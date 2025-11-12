import { create } from "zustand";
import { State, OliveModalConfig } from "@/models";

export const useModalStore = create<State.Modal>((set) => ({
  setAllModalState: (newState: State.Modal) => {
    set(() => ({ ...newState }));
  },
  setModalState: (key: keyof State.Modal, value: any) => {
    set((state: State.Modal) => ({
      ...state,
      [key]: value,
    }));
  },
  set: ({ ...arg }: OliveModalConfig) => {
    set((state: State.Modal) => ({
      ...state,
      ...(arg as any),
    }));
  },
  styles: {}, 
  toggle: () => {
    set((state: State.Modal) => ({
      ...state,
      open: !state?.open,
    }));
  },
}));
