import getStarted from "../../images/icons/Getstartedicon.svg";
import ComplianceIcon from "../../images/icons/Complianceicon.svg";
import HomeIcon from "../../images/icons/Homeicon.svg";
import CustomersIcon from "../../images/icons/Customersicon.svg";
import StorefrontIcon from "../../images/icons/Storefronticon.svg";
import ProductIcon from "../../images/icons/Producticon.svg";
import PaymentPageIcon from "../../images/icons/PaymentPageicon.svg";
import KYCdocIcon from "../../images/icons/kycDoc.svg";
import InvoicesIcon from "../../images/icons/Invoicesicon.svg";
export const getStartedMenus = [
    {
        title: 'Get Started',
        logo:getStarted,
        url:'/Home'
    },
    {
        title: 'Dashboard',
        logo:HomeIcon,
        url:'/Dashboard'
    },
    {
        title: 'Compliance',
        logo:ComplianceIcon,
        url:'/Compliance'
    }
]
export const manageUserMenu = [
    {
        title: 'Users',
        logo:CustomersIcon,
        url:'/Users'
    },
    {
        title: 'KYC Documents',
        logo:KYCdocIcon,
        url:'/kyc-document'
    }
]
export const commerceMenu = [
    {
        title: 'Payment Page',
        logo:PaymentPageIcon,
        url:'/payment-page'
    },
    {
        title: 'Products',
        logo:ProductIcon,
        url:'/products'
    },
    {
        title: 'Store Front',
        logo:StorefrontIcon,
        url:'/store-fronts'
    }
]
export const PaymentMenu = [
    {
        title: 'Transactions',
        logo:PaymentPageIcon,
        url:'/transactions'
    },
    {
        title: 'Validate Receipt',
        logo:InvoicesIcon,
        url:'/validate-receipt'
    }
]