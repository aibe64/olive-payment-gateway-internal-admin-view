import { TRANSACTION_SUMMARY, YEARLY_TRANSACTIONS } from "@/config";
import { Format } from "@/lib";
import { APIRequest, APIResponse, AppState } from "@/models";
import { usePageStore } from "@/store";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { useAPI } from "./useApi";

export const useDashboard = () => {
  const { setState } = usePageStore<AppState>((state) => state);
  const [statusValue, setStatus] = useState<string | null>(null);
  const {
    callGetData,
    data: merchantDetails,
    fetching: loadingMerchant,
  } = useAPI<Array<APIResponse.MerchantDetails>>({});

  const { loading, data } = useQuery<
    APIResponse.TransactionSummaryResponse,
    { filter: APIRequest.TransactionFilterInput }
  >(TRANSACTION_SUMMARY, {
    variables: {
      filter: {
        customerEmail: null,
        reference: null,
        transactionId: null,
        startDate: null,
        endDate: null,
        cardBrand: null,
        paymentMethod: null,
        status: null,
      },
    },
  });
  const { loading: loadingChart, data: chartData } = useQuery<
    APIResponse.YearlyTransactionsResponse,
    APIRequest.YearlyTransactionsFilterInput
  >(YEARLY_TRANSACTIONS, {
    variables: {
      filter: {
        year: `${new Date().getFullYear()}`,
      },
    },
  });

  const [
    fetchChartTransactions,
    { data: yearlyTransactionsData, loading: processingChart },
  ] = useLazyQuery<
    APIResponse.YearlyTransactionsResponse,
    APIRequest.YearlyTransactionsFilterInput
  >(YEARLY_TRANSACTIONS);

  const [fetchTransactions, { data: transactionSummary, loading: processing }] =
    useLazyQuery<
      APIResponse.TransactionSummaryResponse,
      APIRequest.TransactionFilterVar
    >(TRANSACTION_SUMMARY);

  const applyFilter = useCallback(
    (
      startDate: string | null,
      endDate: string | null,
      status: string | null,
      paymentMethod: string | null,
      merchantId: number | null,
      currency: string | null
    ) => {
      setStatus(status);
      fetchTransactions({
        variables: {
          filter: {
            customerEmail: null,
            reference: null,
            transactionId: null,
            startDate: startDate ? Format.toAPIDate(new Date(startDate)) : null,
            endDate: endDate ? Format.toAPIDate(new Date(endDate)) : null,
            cardBrand: null,
            paymentMethod,
            status,
            merchantId,
            currency,
          },
        },
      });
    },
    [setStatus]
  );

  const filterChart = useCallback((year: string) => {
    fetchChartTransactions({
      variables: {
        filter: {
          year,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (data) {
      setState("transactionSummaryData", data);
    }
  }, [data]);

  useEffect(() => {
    if (
      statusValue &&
      ["05|06|07|09|11", "02"].includes(statusValue) &&
      transactionSummary
    ) {
      setState("transactionSummaryData", {
        ...transactionSummary,
        transactionSummarry: {
          ...transactionSummary.transactionSummarry,
          item: {
            ...transactionSummary.transactionSummarry.item,
            nextSettlementAmount: 0,
          },
        },
      });
    } else {
      if (transactionSummary) {
        setState("transactionSummaryData", transactionSummary);
      }
    }
  }, [transactionSummary, statusValue, setState]);

  useEffect(() => {
    setState("loadingSummary", loading || processing);
  }, [loading, processing]);

  useEffect(() => {
    if (chartData) {
      setState("chartData", chartData);
    }
  }, [chartData]);

  useEffect(() => {
    if (yearlyTransactionsData) {
      setState("chartData", yearlyTransactionsData);
    }
  }, [yearlyTransactionsData]);

  useEffect(() => {
    setState("loadingChart", loadingChart || processingChart);
  }, [loadingChart, processingChart]);

  useEffect(() => {
    if (Array.isArray(merchantDetails)) {
      const merchantItems: { label: string; value: number }[] = [
        { label: "All", value: 0 },
      ];
      const merchantData = [
        ...merchantItems,
        ...merchantDetails.map((item) => ({
          label: item.businessName ?? "N/A",
          value: item.id ?? 0,
        })),
      ];
      setState("merchantItem", merchantData);
    }
  }, [merchantDetails, setState]);

  useEffect(() => {
    setState("dashboardFilterCurrency", "NGN");
  }, []);

  return {
    applyFilter,
    filterChart,
    loadingMerchant,
    callMerchant: callGetData,
  };
};
