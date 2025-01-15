import { Response } from "../../models/client/apiResponse";
import { Encryption } from "./encryption";

export class PGUtil {
  static saveByteArray(reportName: string, byte: any, extension: string) {
    byte = btoa(byte);
    const blob = new Blob([byte], { type: `application/${extension}` });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName;
    link.download = fileName;
    link.click();
  }
}

export const getUserInfo = () => {
  try {
    if (sessionStorage.getItem("***")) {
      return JSON.parse(
        Encryption.decrypt(sessionStorage.getItem("***") as string)
      ) as Response.UserInfo;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};
