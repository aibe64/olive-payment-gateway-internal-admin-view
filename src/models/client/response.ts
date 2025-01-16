export namespace APIResponse {
  export class API<T> {
    responseCode: string = "";
    responseMessage: string = "";
    data: T | undefined;
  }
  export interface Error {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: any;
  }
  export class LoginInfo {
    createdBy: unknown;
    creationDate: string = "";
    lastModifiedBy: string = "";
    lastModifiedDate: string = "";
    id: number = 0;
    email: string = "";
    token?: string;
    firstName?: string;
    lastName?: string;
    merchantId?: string = "N/A";
  }
  export interface User {
    createdBy?: string;
    creationDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string ;
    id: number;
    email:string ;
    firstName?: string;
    lastName?: string
    roleName?: string;
  }
  export class CategoriesReport {
    name: string = "";
    value: number = 0;
  }
  
  export class BillersReport {
    name: string = "";
    value: number = 0;
  }
  
  export class ProductsReport {
    name: string = "";
    value: number = 0;
  }
  
  export class Statistics {
    pendingTransaction?: number = 0;
    pendingTransactionCount?: number = 0;
    totalTransaction: number = 0;
    totalTransactionCount: number = 0;
    successfulTransaction: number = 0;
    successfulTransactionCount: number = 0;
    failedTransaction: number = 0;
    failedTransactionCount: number = 0;
    categoriesReport: CategoriesReport[] = new Array<CategoriesReport>();
    billersReport: BillersReport[] = new Array<BillersReport>();
    productsReport: ProductsReport[] = new Array<ProductsReport>();
  }

  export class TransactionDtos {
    id: number = 0;
    amount: number = 0;
    categoryName: string = "";
    productName: string = "";
    productCode?: string = "";
    billerName: string = "";
    billerCode: string = "";
    requestId: string = "";
    referenceNumber: string = "";
    billerReferenceNumber: string = "";
    billerStatusCode: string = "";
    billerStatusMessage: string = "";
    transactionDate: string = "";
    merchantId: string = "";
    performedBy?: string = "";
    mdCustomer: boolean = false;
  }

  export class TableData<T> {
    [key: string]: T;
    constructor(keyName: string, items: T) {
      this[keyName] = items;
    }
  }

  export class TopTenTransaction {
    hasNextRecord: boolean = false;
    totalCount: number = 0;
    transactionDTOS: TransactionDtos[] = new Array<TransactionDtos>();
  }
}

export interface BaseQueryErrorResponse {
  status: number;
  data: APIResponse.API<null>;
}