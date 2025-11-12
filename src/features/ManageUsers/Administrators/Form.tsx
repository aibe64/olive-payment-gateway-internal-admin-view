import { OliveButton, OliveField, OliveForm } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Divider, Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const UpdateUsers: FC<{
  records?: APIResponse.InternalUsers;
}> = ({ records }) => {
  const { callGetData, fetching, data } = useAPI<
    Array<{ name: string; id: number }>
  >({});
  const [roleItem, setRoleItem] = useState<{ label: string; value: number }[]>(
    []
  );
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.InternalUsers> = useFormStore();

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

  useEffect(() => {
    if (records) {
      setFormState("payload", {
        ...records,
        userId: records.userId,
      });
    }
  }, [records, setFormState, clearForm]);

  useEffect(() => {
    callGetData(endpoints.Account.GetAllRoles);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setRoleItem(data.map((item) => ({ label: item.name, value: item.id })));
    }
  }, [data]);

  return (
    <OliveForm<APIRequest.InternalUsers>
      callApi
      apiConfig={{
        endpoint: endpoints.Users.UpdateUser,
        showToastAfterApiResponse: true,
        method: "POST",
        customPayload: {
          id: records?.id,
          isActive: payload?.isActive,
          roleId: payload?.roleId,
        },
        reloadTable: true,
        callBack() {
          closeModal();
        },
      }}
      className="px-2 gap-0"
    >
      <OliveField
        name="firstName"
        label="First Name"
        type="text"
        key={"1"}
        readonly
      />
      <OliveField
        name="lastName"
        label="Last Name"
        type="text"
        key={"2"}
        readonly
      />
      <OliveField
        name="email"
        label="Email Address"
        type="text"
        key={"3"}
        readonly
      />
      <OliveField
        name="roleId"
        label="Role"
        loading={fetching}
        key={"5"}
        required
        type="select"
        items={roleItem}
      />
      <div className="flex gap-2">
        <label htmlFor="status">Status</label>
        <Switch
          onChange={(checked) => setPayload("isActive", checked)}
          checked={payload?.isActive ?? false}
        />
      </div>
      <Divider />
      <OliveButton.Submit title={"Update Administrator"} />
    </OliveForm>
  );
};
