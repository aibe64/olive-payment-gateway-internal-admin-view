import { PageTitle } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Spin } from "antd";
import { useCallback } from "react";
import { PayoutVatRateForm } from "./Form";

const PayoutVatRate = () => {
  const { data, fetching, callGetData } = useAPI<APIResponse.PayoutVatRate>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Admin.GetPayoutVatRate,
  });

  const refetch = useCallback(() => {
    callGetData(endpoints.Admin.GetPayoutVatRate);
  }, [callGetData]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Payout VAT Rate" />
      <Spin spinning={fetching}>
        <PayoutVatRateForm records={data} onSaved={refetch} />
      </Spin>
    </div>
  );
};
export default PayoutVatRate;
