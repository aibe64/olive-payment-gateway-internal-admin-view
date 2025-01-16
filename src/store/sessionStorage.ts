import { Encryption } from "@/lib";

export class AppStorage {
  static getItem<T>(key: string, useEncryption: boolean = true): T | null {
    try {
      const item = useEncryption
        ? Encryption.decrypt(sessionStorage.getItem(key) as string)
        : sessionStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
    } catch {}
    return null;
  }

  static setItem<T>(
    key: string,
    value: T,
    useEncryption: boolean = true
  ): void {
    try {
      sessionStorage.setItem(
        key,
        useEncryption ? Encryption.encrypt(value) : JSON.stringify(value)
      );
    } catch {}
  }

  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }
}
