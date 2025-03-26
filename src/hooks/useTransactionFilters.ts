import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { APIRequest, APIResponse, AppState, State } from "@/models";
import { AppConfig, GET_TRANSACTIONS } from "@/config";
import { useFormStore, usePageStore } from "@/store";
import { Format } from "@/lib";
import { useAPI } from "./useApi";
import { endpoints } from "@/service";

export const useTransactionFilters = (callReportOnRender: boolean = true) => {
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(new Date().getFullYear() - 3);
  const {
    setState,
    transactionPageNumber,
    transactionPageLimit,
    transactionData,
  } = usePageStore<AppState>((state) => state);
  const { payload, setFormState }: State.Form<APIRequest.TransactionsFilters> =
    useFormStore();
  const [fetchTransactions, { data, loading }] = useLazyQuery<
    APIResponse.TransactionsData,
    APIRequest.TransactionsVars
  >(GET_TRANSACTIONS, { fetchPolicy: "no-cache" });
  const [hasDataOnRender, setHasDataOnRender] = useState(false);
  const { downloadData, downloading } = useAPI({});

  const downloadDataToExcel = useCallback(() => {
    if (payload) {
      downloadData(
        `${AppConfig.GRAPHQL_URL}/${endpoints.Report.Download}?Page=1&PageSize=${transactionData?.transactions.totalCount}`,
        {
          ...payload,
          status: payload?.status === "All" ? undefined : payload?.status,
          startDate: payload.startDate
            ? Format.toAPIDate(new Date(payload.startDate))
            : null,
          endDate: payload.endDate
            ? Format.toAPIDate(new Date(payload.endDate))
            : null,
        }
      );
    } else {
      downloadData(
        `${AppConfig.GRAPHQL_URL}/${endpoints.Report.Download}?Page=1&PageSize=${transactionData?.transactions?.totalCount}`,
        {}
      );
    }
  }, [
    payload,
    transactionPageLimit,
    transactionPageNumber,
    transactionPageLimit,
    transactionData?.transactions?.totalCount,
  ]);

  const applyFilter = useCallback(() => {
    setState("openTransactionFilter", false);
    if (payload) {
      fetchTransactions({
        variables: {
          page: 1,
          limit: 10,
          filter: {
            ...payload,
            status: payload?.status === "All" ? undefined : payload?.status,
            paymentMethod:
              payload?.paymentMethod === "All"
                ? undefined
                : payload?.paymentMethod,
            startDate: payload.startDate
              ? `${
                  Format.toAPIDate(new Date(payload.startDate))?.split("T")[0]
                }T00:00:00Z`
              : null,
            endDate: payload.endDate
              ? `${
                  Format.toAPIDate(new Date(payload.endDate))?.split("T")[0]
                }T00:00:00Z`
              : null,
          },
        },
      });
    } else {
      fetchTransactions({
        variables: {
          page: 1,
          limit: 10,
          filter: {},
        },
      });
    }
  }, [payload, setState]);

  const applyValidateReferenceFilter = useCallback(
    (reference: string) => {
      fetchTransactions({
        variables: {
          page: transactionPageNumber ?? 1,
          limit: transactionPageLimit ?? 1,
          filter: {
            status: null,
            transactionId: null,
            cardBrand: null,
            startDate: null,
            endDate: null,
            reference,
            customerEmail: null,
            paymentMethod: null,
          },
        },
      });
    },
    [transactionPageLimit, transactionPageNumber]
  );

  const onPaginate = useCallback(
    (pageNumber: number, limit: number) => {
      setState("transactionPageNumber", pageNumber);
      setState("transactionPageLimit", limit);
    },
    [setState]
  );

  useEffect(() => {
    if (data) {
      if (!hasDataOnRender) setHasDataOnRender(true);
      setState("transactionData", data);
    }
  }, [data]);

  useEffect(() => {
    setFormState("payload", undefined);
  }, [setFormState]);

  useEffect(() => {
    if (callReportOnRender) {
      setHasDataOnRender(false);
      fetchTransactions({
        variables: {
          page: 1,
          limit: 10,
          filter: {},
        },
      });
    } else {
      setState("transactionData", undefined);
    }
  }, [callReportOnRender, setState, setHasDataOnRender]);

  useEffect(() => {
    if (transactionPageNumber && transactionPageLimit) {
      fetchTransactions({
        variables: {
          page: transactionPageNumber ?? 1,
          limit: transactionPageLimit ?? 10,
          filter: {
            ...payload,
            status: payload?.status === "All" ? undefined : payload?.status,
            startDate: payload?.startDate
              ? `${
                  Format.toAPIDate(new Date(payload.startDate))?.split("T")[0]
                }T00:00:00Z`
              : null,
            endDate: payload?.endDate
              ? `${
                  Format.toAPIDate(new Date(payload.endDate))?.split("T")[0]
                }T00:00:00Z`
              : null,
          },
        },
      });
    }
  }, [transactionPageNumber, transactionPageLimit, payload]);

  return {
    loading,
    applyFilter,
    loadingTransaction: loading,
    onPaginate,
    applyValidateReferenceFilter,
    downloading,
    downloadDataToExcel,
    hasDataOnRender,
    transactions: data?.transactions?.items,
  };
};
