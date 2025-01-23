import { ActionDetails } from "@/models";
import { useModalStore } from "@/store";
import { useCallback } from "react";
import { useAPI } from ".";

export const useTableActions = (details: ActionDetails) => {
  const { set, setModalState } = useModalStore();
  const { callPostData, posting } = useAPI({ isDataTable: true });

  const handleApiResponse = useCallback(() => {
    setModalState("open", false);
    
  }, [setModalState]);

  const callActionApi = useCallback(() => {
    callPostData({
      url: details.endpoint ?? "",
      request: details?.payload,
      callBackApiResponse: details.onCallBackAPI ?? handleApiResponse,
      clearPayloadAfterApiSuccessResponse: true,
      showToastAfterApiResponse: true,
      reloadTable: true,
    });
  }, [details.endpoint, details?.payload, callPostData]);

  const setActionModal = useCallback(
    (component: JSX.Element, title: string | JSX.Element, modalWidth?: number) => {
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

  return {
    setActionModal,
    processing: posting,
    callActionApi,
    handleClose: handleApiResponse,
  };
};
