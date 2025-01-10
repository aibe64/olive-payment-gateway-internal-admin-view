import { Response } from "../../models/client/apiResponse";
import { Encription } from "./encryption";

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
  let userInfo: Response.UserInfo = new Response.UserInfo();
  try {
    if (localStorage.getItem("***")) {
      userInfo = JSON.parse(
        Encription.decrypt(localStorage.getItem("***") as string)
      );
      return userInfo;
    } else {
      return new Response.UserInfo();
    }
  } catch (error) {
    return new Response.UserInfo();
  }
};
