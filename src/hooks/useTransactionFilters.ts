import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { APIRequest, APIResponse, AppState, State } from "@/models";
import { GET_TRANSACTIONS } from "@/config";
import { useFormStore, usePageStore } from "@/store";
import { Format } from "@/lib";

export const useTransactionFilters = (callReportOnRender: boolean = true) => {
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(new Date().getFullYear() - 3);
  const { setState, transactionPageNumber, transactionPageLimit } =
    usePageStore<AppState>((state) => state);
  const { payload, setFormState }: State.Form<APIRequest.TransactionsFilters> =
    useFormStore();
  const [fetchTransactions, { data, loading }] = useLazyQuery<
    APIResponse.TransactionsData,
    APIRequest.TransactionsVars
  >(GET_TRANSACTIONS);
  const [hasDataOnRender, setHasDataOnRender] = useState(false);

  const [downloadTransactions, { data: downloadData, loading: downloading }] =
    useLazyQuery<APIResponse.TransactionsData, APIRequest.TransactionsVars>(
      GET_TRANSACTIONS
    );

  const downloadDataToExcel = useCallback(() => {
    if (payload) {
      downloadTransactions({
        variables: {
          page: 10000,
          limit: 10000,
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
          limit: 10000,
          filter: {},
        },
      });
    }
  }, [
    payload,
    transactionPageLimit,
    transactionPageNumber,
    transactionPageLimit,
  ]);

  const applyFilter = useCallback(() => {
    setState("openTransactionFilter", false);
    if (payload) {
      fetchTransactions({
        variables: {
          page: transactionPageNumber ?? 1,
          limit: transactionPageLimit ?? 10,
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
      fetchTransactions({
        variables: {
          page: transactionPageNumber ?? 1,
          limit: transactionPageLimit ?? 10,
          filter: {},
        },
      });
    }
  }, [payload, transactionPageLimit, transactionPageNumber]);

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
  }, [data, setState, setHasDataOnRender, hasDataOnRender]);

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
    if (transactionPageNumber && transactionPageLimit)
      fetchTransactions({
        variables: {
          page: transactionPageNumber ?? 1,
          limit: transactionPageLimit ?? 10,
          filter: {
            ...payload,
            status: payload?.status === "All" ? undefined : payload?.status,
            startDate: payload?.startDate
              ? Format.toAPIDate(new Date(payload.startDate))
              : null,
            endDate: payload?.endDate
              ? Format.toAPIDate(new Date(payload?.endDate))
              : null,
          },
        },
      });
  }, [transactionPageNumber, transactionPageLimit, payload]);

  useEffect(() => {
    if (
      downloadData &&
      downloadData?.transactions &&
      Array.isArray(downloadData.transactions?.items)
    ) {
      setState("transactionDataForDownload", downloadData.transactions.items);
    }
  }, [downloadData, setState]);

  return {
    loading,
    applyFilter,
    loadingTransaction: false,
    onPaginate,
    applyValidateReferenceFilter,
    downloading,
    downloadDataToExcel,
    hasDataOnRender,
  };
};
