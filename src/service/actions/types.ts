export namespace ActionTypes {
    export class Account {
        static GET_ALL_ROLES = "GET_ALL_ROLES"
        static Get_Admin_Roles = "Get_Admin_Roles"
        static Log_Out = "Log_Out"
        static Get_Role_Resources = "Get_Role_Resources"
        static Get_Permissions = "Get_Permissions"
        static Create_RoleResources = "Create_RoleResources"
        static Update_RoleResources = "Update_RoleResources"
    }
    export class Settings {
        static GET_ALL_SETTINGS = "GET_ALL_SETTINGS"
    }

    export class Users {
        static Create_Account = "Create_Account"
        static Get_All_Industries = "Get_All_Industries"
        static Get_All_Categories = "Get_All_Categories"
        static Get_Permissions = "Get_Permissions"
        static Validate_Settlement_Account = "Validate_Settlement_Account"
        static Set_Validate_User_State = "Set_Validate_User_State"
    }
    export class MerchantUserPage {
        static Create_User = "Create_User";
        static Update_User = "Update_User";
        static Get_User = "Get_User";
        static Open_Edit_Modal = "Open_Edit_Modal";
        static Open_Create_Modal = "Open_Create_Modal";
        static Set_Loading = "Set_Loading";
        static Set_Modal = "Set_Modal";
        static Set_User_Request = "Set_User_Request";
        static Set_Default_Colums_Rows = "Set_Default_Colums_Rows";
        static Open_Alert_Modal = "Open_Alert_Modal";
        static Set_Page_Loading = "Set_Page_Loading";
    }
    export class PageUtility {
        static Page_Loading = "Page_Loading"
    }
    export class PaymentPage {
        static Set_Payment_Page_Modal = "Set_Payment_Page_Modal"
        static Set_View_Payment_Page = "Set_View_Payment_Page"
        static Set_Payment_Page_State = "Set_Payment_Page_State"
        static Get_Payment_Page = 'Get_Payment_Page'
        static Add_Page = 'Add_Page'
        static Update_Page = 'Update_Page'
        static Validate_Link = 'Validate_Link'
    }
    export class ProductPage { 
        static Set_Product_Page_Modal = "Set_Product_Page_Modal"
        static Set_Product_Page_State = "Set_Product_Page_State"
        static Update_Product_Page_Request = "Update_Product_Page_Request"
        static RetainProductPageRequest = "RetainProductPageRequest"
        static Get_Product_transactions = "Get_Product_transactions"
        static Add_Product = 'Add_Product'
        static Update_Product = 'Update_Product'
        static Update_Product_Variants_To_Server = 'Update_Product_Variants_To_Server'
        static Update_Product_Options_To_Server = 'Update_Product_Options_To_Server'
        static Get_Product_Page = 'Get_Product_Page'
        static Get_Product_Page_By_Id = 'Get_Product_Page_By_Id'
        static Duplicate_Product = 'Duplicate_Product'
        static Delete_Product ='Delete_Product'
        static Validate_Product_Link = 'Validate_Product_Link'
        static Add_Product_Options = 'Add_Product_Options';
        static Update_Product_Options = 'Update_Product_Options';
        static Remove_Product_Options = 'Remove_Product_Options'
        static Add_Variants = 'Add_Variants'
        static Remove_Variants = 'Remove_Variants'
        static Update_Variants = 'Update_Variants'
    }
    export class StorePage { 
        static Set_Store_Page_State = "Set_Store_Page_State"
        static Update_Store_Page_Request = "Update_Store_Page_Request"
        static Retain_Store_Page_Request = "Retain_Store_Page_Request"
        static Update_Store_Products = "Update_Store_Products"
        static Edit_Store_Products = "Edit_Store_Products"
        static Add_Product_To_Store = "Add_Product_To_Store"
        static Add_Store = 'Add_Store'
        static Update_Store = "Update_Store"
        static Delete_Store = 'Delete_Store'
        static Get_Store_Page = 'Get_Store_Page'
        static Get_Store_Products = 'Get_Store_Products'
        static Get_Product_Not_In_Store = 'Get_Product_Not_In_Store'
        static Validate_Store_Link = 'Validate_Store_Link'
        static RetainStorePageRequest = 'RetainStorePageRequest'
        static Get_Store_Transactions = 'Get_Store_Transactions'
        static Update_Product_On_StorePage = 'Update_Product_On_StorePage'
        static Store_Add_Product = 'Store_Add_Product'
        static Store_Update_Product = 'Store_Add_Product'
        static Get_Store_Page_By_Id = 'Get_Store_Page_By_Id'
    }
    export class CompliancePage {
        static Set_Compliance_Page_State = "Set_Compliance_Page_State";
        static Set_Compliance_Page_API_State = "Set_Compliance_Page_API_State";
        static set_Default_Compliance_Page_State = "set_Default_Compliance_Page_State"
        static OnSubmit_Next_Button = "OnSubmit_Next_Button"
        static Update_Merchant_Profile = "Update_Merchant_Profile"
        static Create_Merchant_Profile = "Create_Merchant_Profile"
        static OnClick_Previous_Button = "OnClick_Previous_Button"
        static OnClick_Next_Button = "OnClick_Next_Button"
        static Set_BusinessIdentification_ValidID_Identification = "Set_BusinessIdentification_ValidID_Identification"
        static Set_Govt_ValidID_Identification = "Set_Govt_ValidID_Identification"
        static Upload_List = 'Upload_List'
        static Upload_KYC = 'Upload_KYC'
    }
    export class Merchants {
        static Profile = "Profile"
        static Get_Admin_Roles = "Get_Admin_Roles"
        static Update = "Update"
        static Merchant_By_ID = "Merchant_By_ID"
        static Upload_KYC_Document = "Upload_KYC_Document"
        static Pending_KYC_Documents = "Pending_KYC_Documents"
        static Rejected_KYC_Documents = "Rejected_KYC_Documents"
        static Approved_KYC_Documents = "Approved_KYC_Documents"
        static Approve_Merchant_KYC = "Approve_Merchant_KYC"
        static All_KYC_Documents = "All_KYC_Documents"
        static Get_File_By_Id = "Get_File_By_Id"
        static Get_Merchant_Users = "Get_Merchant_Users"
        static Get_SSOUsers = "Get_SSOUsers"
        static Create_Merchant_Users = "Create_Merchant_Users"
        static Update_Merchant_Users = "Update_Merchant_Users"
        static Get_Merchant_Roles = "Get_Merchant_Roles"
        static Get_Merchant_KYC = "Get_Merchant_KYC"
        static ReUpload_File = "ReUpload_File"
        static IsMerchantRegistered = "Is_Merchant_Registered"
        static Get_Notification = "Get_Notification"
        static Update_Notification = "Update_Notification"
        static Set_Notification = "Set_Notification"
        static Set_Receipt = "Set_Receipt"
        static Validate_Receipt = "Validate_Receipt"
    }
    export class SetUp {
        static Get_All_Banks = "Get_All_Banks"
        static Transaction_Limit = "Transaction_Limit"
        static Get_All_Providers = "Get_All_Providers"
        static Get_Banks = "Get_Banks"
        static Create_Provider = "Create_Provider"
        static Update_Provider = "Update_Provider"
        static Get_All_Bin = "Get_All_Bin"
        static Create_Bin = "Create_Bin"
        static Update_Bin = "Update_Bin"
        static Get_All_Brands = "Get_All_Brands"
        static Manage_Card_Transaction = "Manage_Card_Transaction"
        static Get_All_Merchant = "Get_All_Merchant"
        static Update_Merchant = "Update_Merchant"
        static Update_Banks = "Update_Banks"
    }
    export class Report {
        static Get_Admin_TranReport = "Get_Admin_TranReport"
        static Get_Merchant_TranReport = "Get_Merchant_TranReport"
    }

}