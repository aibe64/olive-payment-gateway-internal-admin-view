import { AppStorageKeys, MerchantPortalDetails } from "@/models";
import { AppStorage } from "@/store";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs, { Dayjs } from "dayjs";

export const formatToNaira = (money: string): string => {
  return `₦${money.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
export const camelCaseToTitle = (str: string) => {
  // Insert a space before any uppercase letters preceded by a lowercase letter
  const titleCase = str.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Capitalize the first letter of each word
  const words = titleCase.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words back together
  const title = capitalizedWords.join(" ");

  return title;
};

export const isObject = (value?: any): boolean =>
  value && typeof value === "object" && !Array.isArray(value);

export const generateRandomKey = (length: number) => {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return key;
};

export const getMerchantDetailsFromMerchantPortal = ():
  | MerchantPortalDetails
  | undefined => {
  const token = AppStorage.getItem(
    AppStorageKeys.MerchantPortalToken
  ) as string;
  if (token) {
    const merchant: MerchantPortalDetails = jwtDecode(token);
    return merchant;
  } else {
    return undefined;
  }
};

export const exportToExcel = <T>(data: T[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};

export const generateDiscountCode = (merchantName: string): string => {
  const firstThreeChars = merchantName.slice(0, 3).toUpperCase();
  const randomNumbers = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${firstThreeChars}${randomNumbers}`;
};

export function formatToDate(dateString: string): string {
  // Convert to Date object
  const date = new Date(dateString);

  // Extract day, month, and year in the desired format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

export const shortenURL = (url: string) => {
  const urlObj = new URL(url);
  const protocol = urlObj.protocol;
  const hostname = urlObj.hostname;
  const port = urlObj.port ? `:${urlObj.port}` : "";
  const pathname = urlObj.pathname;
  const hostnameParts = hostname.split(".");
  const shortenedHostname =
    hostnameParts.length > 2
      ? `${hostnameParts[0]}........${hostnameParts[hostnameParts.length - 1]}`
      : hostname;
  return `${protocol}//${shortenedHostname}${port}${pathname}`;
};

export const getQueryStringValue = (queryKey: string) => {
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.get(queryKey);
};

export const cleanDecimalInput = (input: string) => {
  // Remove all non-numeric characters except for a single dot
  let cleaned = input.replace(/[^0-9.]/g, "");

  // Ensure only one dot is allowed
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }
  //Replace multiple dots with a single dot and remove all but the first one
  cleaned
    .replace(/\.+/g, ".")
    .replace(
      /(.*?)\.(.*)/,
      (_match, p1: string, p2: string) => p1 + "." + p2.replace(/\./g, "")
    );
  return cleaned;
};

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export const disableFutureDates = (current: Dayjs) => {
  return current && current > dayjs().endOf("day");
};

export const searchTable = <T>(array: Array<T>, value: string): Array<T> => {
  let newArray: Array<T> = [];
  if (array) {
    let object = array[0];
    if (object || object != null) {
      array.forEach(function (element) {
        let values: string[] = Object.values(element);
        let exist = false;
        values.forEach(function (element2) {
          if (element2 !== null && element2) {
            element2 = element2.toString();
            if (
              element2?.toLocaleLowerCase().includes(value?.toLocaleLowerCase())
            ) {
              exist = true;
              return;
            }
          }
        });
        if (exist) newArray.push(element);
      });
    }
    return newArray;
  } else {
    return array;
  }
};

export const Search = <T>(array: Array<T>, value: string) => {
  let newArray = new Array<T>();
  if (array) {
    let object = array[0];
    if (object || object != null) {
      array.forEach(function (element) {
        let values: string[] = Object.values(element);
        let exist = false;
        values.forEach(function (element2) {
          if (element2 !== null && element2) {
            element2 = element2.toString();
            if (
              element2?.toLocaleLowerCase().includes(value?.toLocaleLowerCase())
            ) {
              exist = true;
              return;
            }
          }
        });
        if (exist) newArray.push(element);
      });
    }
    return newArray;
  } else {
    return array;
  }
};
