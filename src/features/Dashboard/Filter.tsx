import { DatePicker, Select } from "antd";
import { useCallback, useState } from "react";
import { Moment } from "moment";
import { disableFutureDates, Format } from "@/lib";
import { useDashboard } from "@/hooks";
import { endpoints } from "@/service";
import { AppState } from "@/models";
import { usePageStore } from "@/store";

export const DashboardFilter = () => {
  const { merchantItem } = usePageStore<AppState>((state) => state);
  const { applyFilter, callMerchant, loadingMerchant } = useDashboard();
  const [statusValue, setStatus] = useState<string | null>(null);
  const [paymentMethodValue, setPaymentMethod] = useState<string | null>(null);
  const [merchantId, setMerchantId] = useState<number | null>(null);
  const [dates, setDates] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });

  const onFilterChange = useCallback(
    (status: string | null, paymentMethod: string | null) => {
      setPaymentMethod(paymentMethod);
      setStatus(status);
      if (status) {
        applyFilter(
          dates.start,
          dates.end,
          status,
          paymentMethodValue,
          merchantId
        );
      } else {
        applyFilter(
          dates.start,
          dates.end,
          statusValue,
          paymentMethod,
          merchantId
        );
      }
    },
    [applyFilter, statusValue, paymentMethodValue, dates, merchantId]
  );

  const merchantChange = useCallback(
    (id: number) => {
      setMerchantId(id === 0 ? null : id);
      applyFilter(
        dates.start,
        dates.end,
        statusValue,
        paymentMethodValue,
        id === 0 ? null : id
      );
    },
    [applyFilter, statusValue, paymentMethodValue, dates, setMerchantId]
  );

  const handleSetDateRange = useCallback(
    (dates: [Moment, Moment] | null) => {
      if (dates) {
        const [start, end] = dates;
        const startDate = start.format("YYYY-MM-DD");
        const endDate = end.format("YYYY-MM-DD");
        setDates((prev) => ({ ...prev, start: startDate, end: endDate }));
        applyFilter(
          Format.toAPIDate(new Date(startDate)),
          Format.toAPIDate(new Date(endDate)),
          statusValue,
          paymentMethodValue,
          merchantId
        );
      } else {
        setDates((prev) => ({ ...prev, start: null, end: null }));
        applyFilter(null, null, statusValue, paymentMethodValue, merchantId);
      }
    },
    [statusValue, paymentMethodValue, setDates, merchantId]
  );
  const onClearFilter = useCallback(
    (isStatus: boolean) => {
      if (isStatus) {
        onFilterChange(null, paymentMethodValue);
      } else {
        onFilterChange(statusValue, null);
      }
    },
    [statusValue, paymentMethodValue, onFilterChange]
  );

  return (
    <div className="flex gap-3 mt-5">
      <Select
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[160px] !text-gray-text !rounded-[8px]"
        placeholder="Merchant"
        onChange={(e) => merchantChange(e)}
        loading={loadingMerchant}
        showSearch
        onFocus={() => callMerchant(endpoints.SetUp.GetAllMerchant)}
        options={merchantItem ?? []}
      />
      <Select
        onChange={(e) => onFilterChange(e, null)}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[120px] !text-gray-text !rounded-[8px]"
        defaultValue="Status"
        allowClear
        onClear={() => onClearFilter(true)}
        options={[
          {
            label: "All",
            value: null,
          },
          {
            label: "Success",
            value: "00",
          },
          {
            label: "Failed",
            value: "02",
          },
          {
            label: "Pending",
            value: "05",
          },
        ]}
      />
      <Select
        onChange={(e) => onFilterChange(null, e)}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[160px] !text-gray-text !rounded-[8px]"
        defaultValue="Payment Method"
        allowClear
        onClear={() => onClearFilter(false)}
        options={[
          {
            label: "All",
            value: null,
          },
          {
            label: "Card",
            value: "Card",
          },
          {
            label: "Account",
            value: "Account",
          },
          {
            label: "QR",
            value: "QR",
          },
          {
            label: "USSD",
            value: "USSD",
          },
          {
            label: "Wallet",
            value: "Wallet",
          },
          {
            label: "Transfer",
            value: "Transfer",
          },
          {
            label: "ENaira",
            value: "ENaira",
          },
        ]}
      />
      <DatePicker.RangePicker
        onChange={(dates) =>
          handleSetDateRange(dates as [Moment, Moment] | null)
        }
        disabledDate={disableFutureDates}
      />
    </div>
  );
};
