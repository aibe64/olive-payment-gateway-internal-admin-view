import { create } from "zustand";
import { State } from "@/models";

export const useFormStore = create<State.Form>((set) => ({
  setAllFormState: (newState: State.Form) => {
    set(() => ({ ...newState }));
  },
  setFormState: (key: keyof State.Form, value: any) => {
    set((state: State.Form) => ({
      ...state,
      [key]: value,
    }));
  },
  clearForm: () => {
    set((state: State.Form) => {
      if (state.form) state.form?.resetFields();
      return {
        ...state,
        payload: undefined,
        submitForm: false,
        validationStatusByFieldName: [],
      };
    });
  },
  setPayload: (key: string | string[], value: string) => {
    set((state: State.Form) => {
      const keys = Array.isArray(key) ? key : [key];

      const newPayload = {
        ...state.payload,
      };

      keys.forEach((k) => {
        newPayload[k] = value;
      });

      return {
        ...state,
        payload: newPayload,
      };
    });
  },
  fields: [],
  set: (
    payload: any,
    endpoint: string,
    method?: "POST" | "PUT" | "DELETE" | "GET",
    callBackFunction?: () => void
  ) => {
    set((state: State.Form) => ({
      ...state,
      method,
      payload: {
        ...state.payload,
        ...payload,
      },
      endpoint,
      callBackFunction,
    }));
  },
  setIsProcessing: (isProcessing?: boolean) => {
    set((state: State.Form) => ({
      ...state,
      isProcessing,
    }));
  },
}));
