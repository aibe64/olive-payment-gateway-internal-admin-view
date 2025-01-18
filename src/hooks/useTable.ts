import { AppState } from "@/models";
import { useFormStore, usePageStore } from "@/store";
import { useCallback } from "react";
import { useAPI } from "./useApi";
import moment from "moment";

interface TableHook {
  onPaginate: (page: number, size: number) => void;
  onFilter: (
    isPaginate?: boolean,
    status?: string,
    startDate?: string,
    endDate?: string
  ) => void;
  resetFilter: (isPaginated?: boolean) => void;
}

export const useTable = (): TableHook => {
  const { setState, originalTableData } = usePageStore<AppState>(
    (state) => state
  );
  const { callGetData } = useAPI({ isDataTable: true, paginateAPI: true });
  const { getUrl } = useFormStore();
  const onPaginate = useCallback(
    (page: number, size: number) => {
      if (getUrl && getUrl?.includes("?")) {
        const url = `${
          getUrl?.split("?")[0]
        }?pageNumber=${page}&pageSize=${size}`;
        callGetData(url);
      }
    },
    [getUrl, callGetData]
  );

  const onFilter = useCallback(
    (
      isPaginate?: boolean,
      status?: string | boolean,
      startDate?: string,
      endDate?: string
    ) => {
      if (status === "all" && Array.isArray(originalTableData) && !isPaginate) {
        setState("tableData", originalTableData);
        return;
      }
      let filtered: Array<{
        dateCreated: string;
        isActive: boolean ;
        status: string;
      }> = [];
      if (getUrl && getUrl?.includes("status") && isPaginate && status) {
        const url = `${getUrl?.split("&status=")[0]}&status=${status}`;
        callGetData(url);
      } else if (status && isPaginate) {
        callGetData(`${getUrl}&status=${status}`);
      }
      if (
        !isPaginate &&
        startDate &&
        endDate &&
        Array.isArray(originalTableData)
      ) {
        filtered = originalTableData.filter((item: { dateCreated: string }) => {
          const dateCreated = moment(item.dateCreated).format("YYYY-MM-DD");
          return dateCreated >= startDate && dateCreated <= endDate;
        });
      }
      if (filtered?.length && !isPaginate) {
        if (typeof status === "boolean") {
          filtered = filtered.filter((item) => item.isActive === status);
        } else if (typeof status === "string" && !isPaginate) {
          filtered = filtered.filter((item) => item.status === status);
        }
      } else if (!filtered?.length && !isPaginate && Array.isArray(originalTableData)) {
        if (typeof status === "boolean") {
          filtered = originalTableData.filter(
            (item: { isActive: boolean }) => item.isActive === status
          );
        } else if (typeof status === "string" && !isPaginate && Array.isArray(originalTableData)) {
          filtered = originalTableData.filter(
            (item: { status: string }) => item.status === status
          );
        }
      }
      if (!isPaginate) setState("tableData", filtered);
    },
    [getUrl, callGetData, originalTableData, setState]
  );

  const resetFilter = useCallback(
    (isPaginated?: boolean) => {
      if (getUrl && getUrl?.includes("status") && isPaginated) {
        const url = `${getUrl?.split("&status=")[0]}`;
        callGetData(url);
      } else if (isPaginated) {
        callGetData(`${getUrl}`);
      } else {
        setState("tableData", originalTableData);
      }
    },
    [getUrl, callGetData, originalTableData, setState]
  );

  return { onPaginate, onFilter, resetFilter };
};
