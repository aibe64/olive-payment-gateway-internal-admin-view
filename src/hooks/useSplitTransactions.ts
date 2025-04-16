import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { APIRequest, APIResponse, AppState, State } from "@/models";
import { GET_SPLIT_TRANSACTIONS } from "@/config";
import { useFormStore, usePageStore } from "@/store";
import { Format } from "@/lib";

export const useSplitTransactions = (callReportOnRender: boolean = true) => {
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(new Date().getFullYear() - 3);
  const { setState, splitTransactionPageLimit, splitTransactionPageNumber } =
    usePageStore<AppState>((state) => state);
  const { payload, setFormState }: State.Form<APIRequest.TransactionsFilters> =
    useFormStore();

  const [fetchTransactions, { data, loading }] = useLazyQuery<
    APIResponse.SplitTransactionsData,
    APIRequest.TransactionsVars
  >(GET_SPLIT_TRANSACTIONS, { fetchPolicy: "no-cache" });

  const [
    downloadTransactions,
    { data: transactionDataForDownload, loading: downloading },
  ] = useLazyQuery<
    APIResponse.SplitTransactionsData,
    APIRequest.TransactionsVars
  >(GET_SPLIT_TRANSACTIONS);

  const [hasDataOnRender, setHasDataOnRender] = useState(false);

  const downloadDataToExcel = useCallback(() => {
    if (payload) {
      downloadTransactions({
        variables: {
          page: 1,
          limit: 30000,
          filter: {
            ...payload,
            status: payload?.status === "All" ? undefined : payload?.status,
            startDate: payload.startDate
              ? Format.toAPIDate(new Date(payload.startDate))
              : null,
            endDate: payload.endDate
              ? Format.toAPIDate(new Date(payload.endDate))
              : null,
          },
        },
      });
    } else {
      downloadTransactions({
        variables: {
          page: 1,
          limit: 30000,
          filter: {},
        },
      });
    }
  }, [payload]);

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
            currency: payload?.currency ?? null,
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
          page: splitTransactionPageNumber ?? 1,
          limit: splitTransactionPageLimit ?? 1,
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
    [splitTransactionPageLimit, splitTransactionPageNumber]
  );

  const onPaginate = useCallback(
    (pageNumber: number, limit: number) => {
      setState("splitTransactionPageNumber", pageNumber);
      setState("splitTransactionPageLimit", limit);
    },
    [setState]
  );

  useEffect(() => {
    if (data) {
      if (!hasDataOnRender) setHasDataOnRender(true);
      setState("splitTransactionData", data);
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
      setState("splitTransactionData", undefined);
    }
  }, [callReportOnRender, setState, setHasDataOnRender]);

  useEffect(() => {
    if (
      transactionDataForDownload &&
      transactionDataForDownload?.splitTransactions &&
      Array.isArray(transactionDataForDownload.splitTransactions?.items)
    ) {
      setState(
        "splitTransactionDataForDownload",
        transactionDataForDownload.splitTransactions.items
      );
    }
  }, [transactionDataForDownload, setState]);

  useEffect(() => {
    if (splitTransactionPageNumber && splitTransactionPageLimit) {
      fetchTransactions({
        variables: {
          page: splitTransactionPageNumber ?? 1,
          limit: splitTransactionPageLimit ?? 10,
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
  }, [splitTransactionPageNumber, splitTransactionPageLimit, payload]);

  useEffect(() => {
    setState("dashboardFilterCurrency", "NGN");
  }, []);

  return {
    loading,
    applyFilter,
    loadingTransaction: loading,
    onPaginate,
    applyValidateReferenceFilter,
    downloading,
    downloadDataToExcel,
    hasDataOnRender,
    transactions: data?.splitTransactions?.items,
  };
};
