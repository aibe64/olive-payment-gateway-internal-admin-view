import { APIResponse } from "@/models";
import { Empty, List } from "antd";
import { FC, useMemo } from "react";

export const PaymentActivities: FC<{ record: APIResponse.Transaction }> = ({
  record,
}) => {

  const data = useMemo(
    () =>
    record?.userActivities?.map((item) => ({
        value: item.message,
        type: item.type,
        key: item.id
      })),
    [record?.userActivities]
  );

  return (
    <>
      {Array.isArray(data) && data.length ? (
        <List
          size="small"
          className="-mt-2"
          header={
            <div className="grid grid-cols-[15%_75%] gap-[5%]">
              <span>Action</span>
              <span>Message</span>
            </div>
          }
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div
                style={{ color: item.type === "Error" ? "red" : "" }}
                className="grid grid-cols-[15%_75%] gap-[5%] w-full"
              >
                <span className="font-semibold -ml-4">{item.type}</span>
                <span className="-ml-2">{item.value}</span>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <div>
          <Empty description="There was no action taken by the customer for this transaction." />
        </div>
      )}
    </>
  );
};
