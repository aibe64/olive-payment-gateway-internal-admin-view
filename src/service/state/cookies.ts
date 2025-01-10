export class XpressCookies {
  static set(key:string) {
    document.cookie = `${key}=payment-gateway; SameSite=None; Secure`;
  }
  static isSet(key: string): boolean {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1];
    if (cookieValue === 'payment-gateway') {
      return true;
    } else {
      return false;
    }
  }
}
