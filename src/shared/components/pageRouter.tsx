import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "../../view";
import { MerchantDetailsApproval } from "../../view/admin/approval/merchant";
import AdminCompliance from "../../view/admin/compliance";
import { AdminDashboard } from "../../view/admin/dashboard";
import { AdminUsers } from "../../view/admin/manageUsers";
import { AdminRole } from "../../view/admin/manageUsers/role";
import { MerchantSetup } from "../../view/admin/merchants";
import Bin from "../../view/admin/setUp/bin";
import { Institution } from "../../view/admin/setUp/institution";
import { Provider } from "../../view/admin/setUp/provider";
import { TransactionLimit } from "../../view/admin/setUp/transactionLimit";
import { TransactionManager } from "../../view/admin/setUp/transactionManager";
import { AdminTransactionReport } from "../../view/admin/transactionDetails/transactionReport";
import { RegistrationPage } from "../../view/merchants/registration";
import { NotFound } from "../../view/notFound";
import { Encription } from "../functions/encryption";
import { Response } from "../../models/client/apiResponse";
import { GetStarted } from "../../view/merchants/home";
import { Compliance } from "../../view/merchants/compliance";
import { MerchantUserSetup } from "../../view/merchants/merchantUsers";
import { MerchantKYCDetails } from "../../view/merchants/merchantUsers/kycDocument";
import PaymentPage from "../../view/merchants/commerce/paymentPage";
import { ProductPage } from "../../view/merchants/commerce/product";
import { StorePage } from "../../view/merchants/commerce/store";
import { MerchantDashboard } from "../../view/merchants/dashboard";
import { MerchantTransactionReport } from "../../view/merchants/transactions";
// import XpressCookies from "./cookies";
import { Settings } from "../../view/merchants/settings";
import { ValidateReceipt } from "../../view/merchants/transactions/validateReceipt";
import { Receipt } from "../../view/receipt";

export const PageRouter = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  async function GetUserPermission() {
    let userInfo: Response.UserInfo = JSON.parse(
      Encription.decrypt(localStorage.getItem("***") as string)
    );
    if (userInfo) {
      if (userInfo.isInternalUser) {
        await setIsAdmin(true);
      } else {
        await setIsAdmin(false);
      }
    }
  }
  useEffect(() => {
    if(localStorage.getItem("***") as string)
    GetUserPermission();
  }, []);
  return (
    <>
    {/* <XpressCookies/> */}
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/receipt/:id" element={<Receipt />} />
          {isAdmin ? (
            <>
              <Route path="/admin/home" element={<AdminDashboard />} />
              <Route
                path="/admin/compliance/Kyc-documents"
                element={<AdminCompliance />}
              />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="admin/merchants" element={<MerchantSetup />} />
              <Route path="/admin/bin" element={<Bin />} />
              <Route
                path="/admin/card-transaction-manager"
                element={<TransactionManager />}
              />
              <Route path="/admin/institutions" element={<Institution />} />
              <Route path="/admin/provider" element={<Provider />} />
              <Route
                path="/admin/transaction-limit"
                element={<TransactionLimit />}
              />
              <Route path="/admin/system-users" element={<AdminUsers />} />
              <Route path="/admin/system-roles" element={<AdminRole />} />
              <Route
                path="/admin/approval/merchant-approval"
                element={<MerchantDetailsApproval />}
              />
              <Route
                path="/admin/transaction-reports"
                element={<AdminTransactionReport />}
              />
            </>
          ) : (
            <>
              <Route path="/Home" element={<GetStarted />} />
              <Route path="/Dashboard" element={<MerchantDashboard />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/Users" element={<MerchantUserSetup/>}/>
              <Route path="/kyc-document" element={<MerchantKYCDetails/>}/>
              <Route path="/payment-page" element={<PaymentPage />} />
              <Route path="/products" element={<ProductPage/>}/>
              <Route path="/store-fronts" element={<StorePage/>}/>
              <Route path="/transactions" element={<MerchantTransactionReport/>}/>
              <Route path="/validate-receipt" element={<ValidateReceipt/>}/>
              <Route path="/settings" element={<Settings/>}/>
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};
