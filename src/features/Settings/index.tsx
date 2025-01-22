import { SettingsLayout } from "@/components";
import { APIResponse, AppStorageKeys } from "@/models";
import { AppStorage } from "@/store";
import { List } from "antd";

const Settings = () => {
    const userInfo = AppStorage.getItem<APIResponse.LoginInfo>(AppStorageKeys.UserInfo);
    const items = [
        {
          name: "First Name",
          value: userInfo?.firstName,
        },
        {
          name: "Last Name",
          value: userInfo?.lastName,
        },
        {
          name: "Email Address",
          value: userInfo?.email,
        },
        {
          name: "Role Name",
          value: userInfo?.userRole,
        },
        
      ];
  return (
    <SettingsLayout>
    <List
    className="lg:w-1/2"
        size="large"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex justify-between w-full">
              <span>{item.name}</span>
              <span className="font-inter-semibold">{item.value}</span>
            </div>
          </List.Item>
        )}
      />
    </SettingsLayout>
  );
};

export default Settings;
