import CryptoJS from 'crypto-js'

export class  Encription{
       
    static encrypt(value: any): string {
        return CryptoJS.AES.encrypt(JSON.stringify(value), "XpressPayment1234!").toString();
    }
    static decrypt(value: string): string {
        return CryptoJS.AES.decrypt(value, "XpressPayment1234!").toString(CryptoJS.enc.Utf8);
    }
}