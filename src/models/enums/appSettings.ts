export namespace Appsettings{
   export enum PaymentPageOptions{
        None ="none",
        Subcriptions = "subcriptions",
        OneTime = "oneTime",
        SubscriptionOptions = "subscription-options"
    }
    export enum SubscriptionOptions{
        New = "new",
        Existing = "existing",
        CustomerCustomization = "customer-customization"
    }
    export enum MerchantCategory{
        Individual1 = "Individual",
        Individual2 = "Individual",
        StarterBusiness = "Starter Business",
        RegisteredBusiness = "Registered Business",
        Business = "Business",
        Government = "Government"
    }
    export enum ComplianceFileType{
        ValidIdentification = "Valid Identification",
        UtilityBill = "Utility Bill"
    } 
    export enum ComplianceTabName{
        Profile = "Profile",
        Document = "Document",
        Account = "Account",
        Contact = "Contact",
        SuccessAlert = "SuccessAlert"
    }
    export enum ComplianceTab{
        Profile = "profile",
        Document = "document",
        Contact = "contact",
        Account = "account",
        SuccessAlert = "alert"
    }
}