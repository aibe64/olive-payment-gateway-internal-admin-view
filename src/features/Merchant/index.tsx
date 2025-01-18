import { PageTitle, XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { merchantDataColumns } from "./Columns";

const Merchant: React.FC = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantDetails>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllMerchant,
  });

  return (
    <div className="flex flex-col gap-5">
     <PageTitle
        totalDataCount={data?.length ?? 0}
        title="Merchant Management"
      />
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
