import { useModalStore } from "@/store";
import { useCallback } from "react";

export const useTableActions = () => {
  const { set } = useModalStore();

  const setActionModal = useCallback(
    (component: JSX.Element, title: string, modalWidth?: number) => {
      set({
        title,
        body: component,
        width: modalWidth,
        open: true,
        showCloseButton: true,
      });
    },
    [set]
  );

  return { setActionModal };
};
