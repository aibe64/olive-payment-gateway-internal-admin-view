import { DatePicker, Select } from "antd";
import { useCallback, useState } from "react";
import { Moment } from "moment";
import { disableFutureDates, Format } from "@/lib";
import { useDashboard } from "@/hooks";
import { endpoints } from "@/service";
import { AppState } from "@/models";
import { usePageStore } from "@/store";
import { currencies } from "@/data";

export const DashboardFilter = () => {
  const { merchantItem, dashboardFilterCurrency, setState } =
    usePageStore<AppState>((state) => state);
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
          merchantId,
          dashboardFilterCurrency ?? null
        );
      } else {
        applyFilter(
          dates.start,
          dates.end,
          null,
          paymentMethod,
          merchantId,
          dashboardFilterCurrency ?? null
        );
      }
    },
    [
      applyFilter,
      statusValue,
      paymentMethodValue,
      dates,
      merchantId,
      dashboardFilterCurrency,
    ]
  );

  const merchantChange = useCallback(
    (id: number) => {
      setMerchantId(id === 0 ? null : id);
      applyFilter(
        dates.start,
        dates.end,
        statusValue,
        paymentMethodValue,
        id === 0 ? null : id,
        dashboardFilterCurrency ?? null
      );
    },
    [
      applyFilter,
      statusValue,
      paymentMethodValue,
      dates,
      setMerchantId,
      dashboardFilterCurrency,
    ]
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
          merchantId,
          dashboardFilterCurrency ?? null
        );
      } else {
        setDates((prev) => ({ ...prev, start: null, end: null }));
        applyFilter(
          null,
          null,
          statusValue,
          paymentMethodValue,
          merchantId,
          dashboardFilterCurrency ?? null
        );
      }
    },
    [
      statusValue,
      paymentMethodValue,
      setDates,
      merchantId,
      dashboardFilterCurrency,
    ]
  );
  const onClearFilter = useCallback(
    (isStatus: boolean) => {
      if (isStatus) {
        onFilterChange(null, paymentMethodValue);
      } else {
        onFilterChange(statusValue, null);
      }
    },
    [statusValue, paymentMethodValue, onFilterChange, dashboardFilterCurrency]
  );

  const handleCurrency = useCallback(
    (value: string | null) => {
      setState("dashboardFilterCurrency", value ?? undefined);
      if (value) {
        applyFilter(dates.start, dates.end, null, null, null, value);
      } else {
        applyFilter(dates.start, dates.end, null, null, null, null);
      }
    },
    [applyFilter, dates, setState]
  );

  return (
    <div className="flex gap-3 mt-5">
      <Select
        onChange={(e) => handleCurrency(e)}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[120px] !text-gray-text !rounded-[8px]"
        defaultValue="Naira"
        allowClear
        onClear={() => handleCurrency(null)}
        options={currencies}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toString()
            ?.toLowerCase()
            ?.includes(input.toLowerCase())
        }
      />
      <Select
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[160px] !text-gray-text !rounded-[8px]"
        placeholder="Merchant"
        onChange={(e) => merchantChange(e)}
        loading={loadingMerchant}
        showSearch
        onFocus={() => callMerchant(endpoints.SetUp.GetAllMerchant)}
        options={merchantItem ?? []}
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toString()
            ?.toLowerCase()
            ?.includes(input.toLowerCase())
        }
      />
      <Select
        onChange={(e) => onFilterChange(e, null)}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[120px] !text-gray-text !rounded-[8px]"
        defaultValue="Status"
        allowClear
        onClear={() => onClearFilter(true)}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toString()
            ?.toLowerCase()
            ?.includes(input.toLowerCase())
        }
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
            value: "05|06|07|09|11",
          },
        ]}
      />
      <Select
        onChange={(e) => onFilterChange(null, e)}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-[160px] !text-gray-text !rounded-[8px]"
        defaultValue="Payment Method"
        allowClear
        onClear={() => onClearFilter(false)}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toString()
            ?.toLowerCase()
            ?.includes(input.toLowerCase())
        }
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
            label: "Transfer",
            value: "Transfer",
          },
          {
            label: "USSD",
            value: "USSD",
          },
          // {
          //   label: "Account",
          //   value: "Account",
          // },
          // {
          //   label: "NQR",
          //   value: "NQR",
          // },
          // {
          //   label: "Wallet",
          //   value: "Wallet",
          // },
          // {
          //   label: "ENaira",
          //   value: "ENaira",
          // },
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
