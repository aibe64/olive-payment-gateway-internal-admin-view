export namespace AppConfig {
  export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  export const NQR_API_BASE_URL = import.meta.env.VITE_NQR_API_BASE_URL;
  export const MERCHANT_ONBOARDING_API_BASE_URL = import.meta.env.VITE_MERCHANT_ONBOARDING_API_BASE_URL;

  export const MERCHANT_ONBOARDING_URL = import.meta.env.VITE_MERCHANT_ONBOARDING_URL;
  export const MERCHANT_ONBOARDING_BACK_OFFICE_URL = import.meta.env.VITE_MERCHANT_ONBOARDING_BACK_OFFICE_URL;

  export const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL;

  export const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
  export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  export const APP_DESCRIPTION = " - More opportunities for Businesses";
  export const APP_NAME = "Olive Payment Gateway Admin";
}
