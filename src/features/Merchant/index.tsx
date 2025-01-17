import { XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Typography } from "antd";
import { merchantDataColumns } from "./Columns";

const Merchant: React.FC = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantDetails>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllMerchant,
  });

  return (
    <div>
      <Typography className="text-xl font-inter-medium mt-5">
        Merchant Management
      </Typography>
      <XpressTable<APIResponse.MerchantDetails>
        columns={merchantDataColumns}
        dataSource={data ?? []}
        emptyHeadingText="No User"
        emptyParagraphText="There are no users created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default Merchant;
