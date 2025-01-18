import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Popover,
  Select,
  Typography,
} from "antd";
import {
  FilterOutlined,
  DownOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { FaRightLeft } from "react-icons/fa6";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormStore, usePageStore } from "@/store";
import { APIRequest, APIResponse, AppState, State } from "@/models";
import { Moment } from "moment";
import { useTransactionFilters } from "@/hooks";
import { disableFutureDates, exportToExcel, omit } from "@/lib";
import { endpoints } from "@/service";

export const TransactionFilter = () => {
  const {
    setPayload,
    payload,
    setFormState,
  }: State.Form<APIRequest.TransactionsFilters> = useFormStore();
  const {
    setState,
    openTransactionFilter,
    transactionDataForDownload,
    merchantItem,
  } = usePageStore<AppState>((state) => state);
  const [form] = Form.useForm();
  const [dates, setDates] = useState<any | null>();

  const {
    applyFilter,
    downloadDataToExcel,
    downloading,
    loadingMerchant,
    callMerchant,
  } = useTransactionFilters();

  const handlePopOver = useCallback(() => {
    setState("openTransactionFilter", !openTransactionFilter);
  }, [setState, openTransactionFilter]);

  const handleSetDateRange = useCallback(
    (dates: [Moment, Moment] | null) => {
      if (dates) {
        const [start, end] = dates;
        const startDate = start.format("YYYY-MM-DD");
        const endDate = end.format("YYYY-MM-DD");
        setPayload("startDate", startDate);
        setPayload("endDate", endDate);
        setDates(dates);
      }
    },
    [setPayload]
  );
  const resetField = useCallback(() => {
    form.resetFields();
    setFormState("payload", undefined);
    setDates(null);
  }, [form, setFormState, setDates]);

  useEffect(() => {
    if (
      transactionDataForDownload &&
      Array.isArray(transactionDataForDownload)
    ) {
      const excelTransactionData: Partial<APIResponse.Transaction>[] =
        transactionDataForDownload?.map((item) =>
          omit(item, [
            "id",
            "_typename",
            "mandateCode",
            "transType",
            "merchantId",
            "merchantName",
            "cardType",
            "transactionNumber",
            "productDescription",
          ])
        ) || [];
      exportToExcel(excelTransactionData ?? [], "merchant_transactions");
      setState("transactionDataForDownload", undefined);
    }
  }, [setState, transactionDataForDownload]);

  const filterContent = useMemo(
    () => [
      <div className="w-[500px] p-2">
        <div className="flex justify-between">
          <span className="font-inter-semibold">Add Filter</span>
          <button onClick={() => setState("openTransactionFilter", false)}>
            X
          </button>
        </div>
        <Divider className="mb-2 mt-2" />
        <Form
          form={form}
          // fields={[{ name: "customerEmail", value: payload?.customerEmail }]}
          onFinish={applyFilter}
          layout="vertical"
        >
          <Form.Item
            label={
              <div className="flex gap-4 items-center">
                <span>Start Date</span>
                <FaRightLeft className="text-[0.6rem]" />
                <span>End Date</span>
              </div>
            }
          >
            <DatePicker.RangePicker
              value={dates}
              disabledDate={disableFutureDates}
              onChange={(dates) =>
                handleSetDateRange(dates as [Moment, Moment] | null)
              }
              className="!h-[35px] w-full"
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-x-5 -gap-y-7">
            <Form.Item label="Merchant" className="-mt-4">
              <Select
                value={payload?.merchantId}
                onChange={(e) => setPayload("merchantId", e)}
                className="!h-[35px]"
                loading={loadingMerchant}
                onFocus={() => callMerchant(endpoints.SetUp.GetAllMerchant)}
                options={merchantItem ?? [{label: "MuyiTech", value: 10}]}
              />
            </Form.Item>
            <Form.Item label="Customer Email" className="-mt-4">
              <Input
                value={payload?.customerEmail as string}
                onChange={(e) => setPayload("customerEmail", e.target.value)}
                className="!h-[35px]"
              />
            </Form.Item>
            <Form.Item label="Reference" className="-mt-4">
              <Input
                value={payload?.reference as string}
                onChange={(e) => setPayload("reference", e.target.value)}
                className="!h-[35px]"
              />
            </Form.Item>
            <Form.Item label="Card Brand" className="-mt-4">
              <Select
                value={payload?.cardBrand as string}
                onChange={(e) =>
                  setPayload("cardBrand", e === "All" ? null : e)
                }
                className="!h-[35px]"
                options={[
                  { label: "Master Card", value: "mastercard" },
                  { label: "Visa", value: "visa" },
                  { label: "Verve", value: "verve" },
                  { label: "Afrigo", value: "afrigo" },
                  { label: "All", value: "All" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Payment Method" className="-mt-4">
              <Select
                value={payload?.paymentMethod as string}
                onChange={(e) =>
                  setPayload("paymentMethod", e === "All" ? null : e)
                }
                className="!h-[35px]"
                options={[
                  { label: "Card", value: "Card" },
                  { label: "Transfer", value: "Transfer" },
                  { label: "Bank", value: "Account" },
                  { label: "USSD", value: "Ussd" },
                  { label: "All", value: "All" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Payment Status" className="-mt-4">
              <Select
                value={payload?.status as string}
                className="!h-[35px]"
                onChange={(e) => setPayload("status", e === "All" ? null : e)}
                options={[
                  { label: "Success", value: "00" },
                  { label: "Failed", value: "02" },
                  { label: "Pending", value: "05|06|07|09|11" },
                  { label: "All", value: "All" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            {" "}
            <Button onClick={resetField}>Reset</Button>{" "}
            <Button htmlType="submit" type="primary">
              Apply
            </Button>
          </div>
        </Form>
      </div>,
    ],
    [setState, applyFilter, handleSetDateRange, setPayload]
  );
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Popover
          content={filterContent}
          trigger="click"
          open={openTransactionFilter}
          placement="bottomLeft"
        >
          <Button onClick={handlePopOver}>
            <div className="flex justify-between gap-2">
              <FilterOutlined />
              <Typography>Filter</Typography>
              <DownOutlined />
            </div>
          </Button>
        </Popover>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          iconPosition="end"
          icon={<DownloadOutlined />}
          loading={downloading}
          className="!bg-white !border-primary text-primary"
          onClick={downloadDataToExcel}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
