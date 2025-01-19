import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { useCallback, useEffect, useState } from "react";

export const usePermission = (
  records?: APIResponse.Roles,
  isCreate?: boolean
) => {
  const { callGetData, fetching, data } = useAPI<
    Array<APIResponse.Permissions>
  >({ isDataTable: false });
  const [permissions, setPermissions] = useState<
    Array<APIResponse.Permissions>
  >([]);
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.Provider> = useFormStore();

  const closeModal = useCallback(() => {
    set({
      open: false,
      showCloseButton: undefined,
      title: undefined,
      body: undefined,
      clearPayloadOnClose: true,
    });
    clearForm();
  }, [set]);

  const updatePermission = useCallback(
    (id: number, checked: boolean) => {
      setPermissions(
        permissions.map((permission) =>
          permission.id === id
            ? { ...permission, isChecked: checked }
            : { ...permission }
        )
      );
    },
    [permissions]
  );

  useEffect(() => {
    if (records && !isCreate) {
      setFormState("payload", {
        ...records,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  useEffect(() => {
    callGetData(endpoints.Account.GetPermissions);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setPermissions(data);
    }
  }, [data]);

  return {
    closeModal,
    payload,
    setPayload,
    permissions,
    fetching,
    updatePermission,
  };
};
