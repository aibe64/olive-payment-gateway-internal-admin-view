import { useCallback, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { APIRequest, APIResponse, AppState, State } from "@/models";
import { GET_STORE_TRANSACTIONS } from "@/config";
import { useFormStore, usePageStore } from "@/store";
import { Format } from "@/lib";

export const useStoreTransactionFilters = () => {
  const { setState, storeTransactionPageLimit, storeTransactionPageNumber } =
    usePageStore<AppState>((state) => state);
  const { payload, setFormState }: State.Form<APIRequest.TransactionsFilters> =
    useFormStore();

  const [fetchTransactions, { data, loading }] = useLazyQuery<
    APIResponse.StoreTransactionsData,
    APIRequest.StoreTransactionsVars
  >(GET_STORE_TRANSACTIONS);

  const [
    downloadTransactions,
    { data: transactionDataForDownload, loading: downloading },
  ] = useLazyQuery<
    APIResponse.StoreTransactionsData,
    APIRequest.StoreTransactionsVars
  >(GET_STORE_TRANSACTIONS);

  const downloadDataToExcel = useCallback(() => {
    setState("openTransactionFilter", false);
    if (payload) {
      downloadTransactions({
        variables: {
          page: 1,
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
  }, [payload]);

  const applyFilter = useCallback(
    (isDownload?: boolean) => {
      setState("openTransactionFilter", false);
      if (payload) {
        fetchTransactions({
          variables: {
            page: storeTransactionPageNumber ?? 1,
            limit: isDownload ? 10000 : 10,
            filter: {
              ...payload,
              cardBrand: payload?.cardBrand ? payload?.cardBrand : null,
              customerEmail: payload?.customerEmail
                ? payload?.customerEmail
                : null,
              paymentMethod: payload?.paymentMethod
                ? payload?.paymentMethod
                : null,
              reference: payload?.reference ? payload?.reference : null,
              transactionId: payload?.transactionId
                ? payload?.transactionId
                : null,
              storeName: payload?.storeName ? payload?.storeName : null,
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
            page: storeTransactionPageNumber ?? 1,
            limit: storeTransactionPageLimit ?? 10,
            filter: {},
          },
        });
      }
    },
    [payload, storeTransactionPageLimit, storeTransactionPageNumber]
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
      setState("storeTransactionData", data);
    }
  }, [data, setState]);

  useEffect(() => {
    if (
      transactionDataForDownload &&
      transactionDataForDownload?.storeTransactions &&
      Array.isArray(transactionDataForDownload.storeTransactions?.items)
    ) {
      setState(
        "storeTransactionForDownloadData",
        transactionDataForDownload.storeTransactions.items
      );
    }
  }, [transactionDataForDownload, setState]);

  useEffect(() => {
    fetchTransactions({
      variables: {
        page: 1,
        limit: 10,
        filter: {
          customerEmail: null,
          reference: null,
          transactionId: null,
          startDate: null,
          endDate: null,
          cardBrand: null,
          paymentMethod: null,
          status: null,
          storeName: null,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (storeTransactionPageNumber && storeTransactionPageLimit)
      fetchTransactions({
        variables: {
          page: storeTransactionPageNumber ?? 1,
          limit: storeTransactionPageLimit ?? 10,
          filter: {
            customerEmail: null,
            reference: null,
            transactionId: null,
            startDate: null,
            endDate: null,
            cardBrand: null,
            paymentMethod: null,
            status: null,
            storeName: null,
          },
        },
      });
  }, [storeTransactionPageNumber, storeTransactionPageLimit]);

  useEffect(() => {
    setFormState("payload", undefined);
  }, [setFormState]);

  return {
    loading,
    applyFilter,
    loadingTransaction: false,
    onPaginate,
    downloading,
    downloadDataToExcel,
  };
};
