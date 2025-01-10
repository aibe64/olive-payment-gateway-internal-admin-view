import { Request } from "../client/apiRequest";
import { Response } from "../client/apiResponse";

export namespace State {
    export interface UserValidation{
        request?: Request.ValidateUser
        response?:Response.UserInfo
        pageState?: 'loading' | 'success' | 'error'
        isUserValid?:boolean
        userDetails?: Request.UserAccount
        disableField?:boolean;
        registering?:boolean
        showComfimationDialog?:boolean
    }
    export class MerchantUserPage {
        isEdit: boolean = false;
        errorMessage: string = "";
        isError: boolean = false;
        loading: boolean = false;
        isSuccess: boolean = false;
        openAlertModal: boolean = false;
        message: string = "";
        showModal: boolean = false;
        userRequest: Request.MerchantUserRequest = new Request.MerchantUserRequest();
        userResponse: Response.MerchantUsersResponse = new Response.MerchantUsersResponse();
        row: any;
        column: any;
    }
    export class PageUtility {
        loading?: boolean = false
    }
    export class PaymentPage {
        apiUrl?: string;
        showModal: boolean = false;
        options?: "oneTime" | "subcriptions" | "none" | "subscription-options";
        showAdvancedOptions: boolean = false;
        fields: PageFields[] = new Array<PageFields>();
        subscriptionOptions?: 'new' | 'existing' | 'customer-customization';
        isView?: boolean;
        row: any;
        originalRows: any;
        reload?: boolean;
        column: any;
        pageDetails?: Response.PaymentPage;
        request?: Request.PaymentPage;
        loading?: boolean;
        linkValidility?: 'none' | 'valid' | 'invalid'
        validating?: boolean;
        isEdit?: boolean;
        loadingTransactions?: boolean;
        transactions?: Array<Response.PaymentPageTransactions>
    }
    export class PageFields {
        id?: number;
        name?: string;
        value?: string
    }
    export class ExtraInformation {
        name?: string;
        value?: string
    } 

    export interface ProductPage {
        productId?:string;
        storeId?:string;
        showModal: boolean;
        showAdvancedOptions: boolean;
        isView?: boolean;
        isImageUploadSection?: boolean;
        row: any;
        originalRows?:any
        column: any;
        request?: Request.Product;
        delivery: Array<Delivery>
        response?: Array<Response.Product>
        unFilteredResponse?:Array<Response.Product>
        productDetails?: Response.Product
        productTransactions?:Array<Response.ProductTransactions>
        originalProductTransactions?:Array<Response.ProductTransactions>
        loadingTransactions?:boolean;
        isGrid?: boolean;
        isEdit?: boolean;
        loading?: boolean;
        productInventory?: ProductInventory;
        productCustomization?: ProductCustomization;
        productDelivery?: ProductDelivery;
        linkValidility?: 'none' | 'valid' | 'invalid'
        validating?: boolean;
        totalRevenue?:string;
        unitSold:number;
        excelRow?: [];
        excelColumn?: []
        editAfterPurchase?:boolean;
        isUpdateStorePage?:boolean;
        tabKey?:string;
        enableStep?:boolean
    }
    export class Delivery{
        id?:number
        location?: string;
        price?:string;
        fee?:number
    }

    export class ProductOptions {
        key?: string;
        value?: any | null;
        static?: boolean;
        id?: number
    }

    export interface ProductInventory {
        isEdit?: boolean,
        showModal?: boolean;
        variants?: ProductOptions[][]
        key?: string;
        values?: any;
        id?: number;
        index?: number;
        showOptions?: boolean
        showSaveButton?: boolean
    }
    export interface ProductCustomization {
        isEditDescription?: boolean;
        isEditLink?: boolean;
        showUploadModal?: boolean
        uploading?: boolean
        fileList?: ProductFileList[]
    }
    export interface ProductDelivery {
        showDelivery?: boolean;
        isEdit?:boolean
    }
    export interface ProductFileList { 
        uid: string,
        name: string,
        status: "done",
        url: string,
        thumbUrl: string;
    }

    export interface StorePage {
        storeId?:string;
        response?: Array<Response.StorePage>
        delivery: Array<Delivery>
        updateDelivery:boolean
        unFilteredResponse?:Array<Response.StorePage>
        productDetails?: Response.StorePage
        request?:Request.StorePage;
        productRequest?: Request.Product;
        storeProducts?:StoreProducts; 
        productData?:Array<State.ProductData>
        unfilteredProductData?:Array<State.ProductData>
        row: any;
        originalRows?:any
        column: any;
        loading?: boolean;
        isView?: boolean;
        showModal: boolean;
        showStoreProductsModal?:boolean;
        isEdit?: boolean;
        linkValidility?: 'none' | 'valid' | 'invalid' | 'validating'
        validating?: boolean;
        storeCustomization?:StoreCustomization
        storeDelivery?: StoreDelivery;
        reactQuill?: any | null
        showProductModal?:boolean;
        showProductImageSection?:boolean;
        editAfterPurchase?:boolean;
        isEditStoreProduct?:boolean;
        storeProductPayload?:StoreProductsPayload;
        loadingTransactions?:boolean;
        storeTransactions?: Array<Response.StoreTransactions>
        originalStoreTransactions?: Array<Response.StoreTransactions>
        excelRow?: [];
        excelColumn?: [];
        totalRevenue?:string;
        unitSold:number;
        tabKey?:string ;
        themeColor?:string;
    }
    export interface StoreProductsPayload{
        isRemove:boolean;
        isActive:boolean;
        productId:number;
        id:number
    }
    export interface StoreProducts{
        checkAll?:boolean;
        checked?:boolean;
        id?:number;
        response?:Array<ProductData>
        originalResponse?:Array<ProductData>
    }
    export class ProductData {
        id?: number;
        checked?:boolean;
        productName?: string;
        price?:string;
        sold?:number;
        isActive?:boolean;
        isUnlimited?: boolean;
        inStock?: number;
        url?: string;
        productId?: number;
      }
      export interface StoreCustomization {
        editType?: 'link' | 'message' | 'business' | 'contact' | 'media' | 'none'
    }
    export interface StoreDelivery {
        showDelivery?: boolean;
        isEdit?:boolean
    }
    export class ComplianceState {
        disableFields?:boolean
        complianceTab?: string = "Profile";
        tabName: string = "Profile";
        merchant: Request.MerchantAccountRequest = new Request.MerchantAccountRequest();
        apiResponse?: any;
        request?: any;
        validated?: boolean = false;
        userIdentification: Array<Request.UserIdentification> = new Array<Request.UserIdentification>();
        govtIdentification: Array<Request.GovernmentIdentification> = new Array<Request.GovernmentIdentification>();
        showIndividualMerchantCategory?: boolean = false;
        businessIdentification?: Request.BusinessIdentification = new Request.BusinessIdentification();
        isPreview: boolean = false;
        loading: boolean = true
        uploading: boolean = false;
        isError: boolean = false;
        isCompletedProfile: boolean = false;
        uploadIdentification?: 'user' | 'business' | 'govt';
        tabNumber: number = 0;
        registrationStatus: number = 0;
        fileCategory?: string = ""
        identification?: string = ""
        identificationNumber?: string = ""
        errorMessage?: string;
        successMessage?: string;
        domain: string = sessionStorage.getItem("$$$") as string;
        apiToCall: string = "";
        tabActiveStatus: number = 0;
        isValidating: boolean = false;
        settlementAccountResponse?: Response.SettlementAccountResponse = new Response.SettlementAccountResponse();
        uploadType: keyof State.UploadList | undefined
        file?: File
        fileStatus?: 'done' | 'error'
    }
    export class UploadList {
        BoardResolution: boolean = true;
        MEMART: boolean = true;
        FormCAC7: boolean = true;
        FormCAC2: boolean = true;
        BusinessRegistrationDocument: boolean = true;
        CertificateofIncorporation: boolean = true;
        BoardResolutionStateApproval: boolean = true;
        Gazette: boolean = true;
        UtilityBill: boolean = true;
        BusinessRegistration: boolean = true;
        ValidID: boolean = true;
        ValidID2: boolean = true;
        ValidIdentification: boolean = true;
    }
    export interface Notification {
        data:Array<Response.Notification>
        request: Request.Notification
    }
    export interface TransactionReceipt{
        response:Response.TransactionReceipt
        transactionReference: string
        processing:boolean
        showError: boolean
    }
}