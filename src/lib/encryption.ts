import { AppConfig } from "@/config";
import CryptoJS from "crypto-js";

export class Encryption {
  static encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      AppConfig.ENCRYPTION_KEY
    ).toString();
  }

  static decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, AppConfig.ENCRYPTION_KEY).toString(
      CryptoJS.enc.Utf8
    );
  }
}
