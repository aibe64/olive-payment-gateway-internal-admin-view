import { XpressTable } from "@/components";
import { XpressButton } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { useModalStore } from "@/store";
import { Typography } from "antd";
import { useCallback } from "react";
import { userDataColumns } from "./Columns";
import { UpdateUser } from "./Update";

const Users: React.FC = () => {
  const { data, fetching } = useAPI<Array<APIResponse.User>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.GetUsers,
  });
  const { set } = useModalStore();

  const onAddUserButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: <span className="text-[1.2rem] font-bold">Add Users</span>,
      body: <UpdateUser isCreateUser />,
      clearPayloadOnClose: true
    });
  }, [set]);

  return (
    <div>
      <Typography className="text-xl font-inter-medium mt-5">
        User Management
      </Typography>
      <XpressButton
        title="Add User"
        classNames="my-5 float-end shadow-none font-inter-medium py-[3px]"
        onClick={onAddUserButton}
      />
      <XpressTable<APIResponse.User>
        columns={userDataColumns}
        dataSource={data ?? []}
        emptyHeadingText="No User"
        emptyParagraphText="There are no users created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default Users;
