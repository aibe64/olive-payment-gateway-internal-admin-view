import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const InstitutionDetails: FC<{
  records?: APIResponse.Banks;
}> = ({ records }) => {
  const items = [
    {
      key: "Bank Name",
      value: records?.bankName ?? "N/A",
    },
    {
      key: "Processor",
      value: records?.processor ?? "N/A",
    },
    {
      key: "Visible on Payment",
      value: records?.isVisibleToMerchantForPayment ?? "N/A",
    },
    {
      key: "Bvn Required",
      value: records?.isBvnRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Name Required",
      value: records?.isNameRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Narration Required",
      value: records?.isNarrationRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "PhoneNumber Required",
      value: records?.isPhoneNumberRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Pin Required",
      value: records?.isPinRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Date Of Birth Required",
      value: records?.isDateOfBirthRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Date Updated",
      value: Format.toDateTime(
        records?.dateCreated ?? new Date()?.toString()
      ).split("-")[0],
    },
  ];
  return (
    <div>
      <List
        size="large"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex justify-between w-full">
              <span>{item.key}</span>
              <span className="font-inter-semibold">{item.value}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
