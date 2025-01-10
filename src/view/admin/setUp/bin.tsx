/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import apiUrl from "../../../service/apiConfig";
import { GET, POST } from "../../../service/apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import { DataTable } from "../../../shared/components/datatable";
import { Button, Tooltip } from "antd";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import MerchantApprovalIcon from "../../../images/icons/MerchantApprovalIcon.svg";
import DisapproveIcon from "../../../images/icons/DisapproveIcon.svg";
import DateTime from "../../../shared/functions/DateTime";
import BinHeader from "./components/binHeader";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import BinModal from "./components/binModal";
import AlertModal from "../../../shared/components/alertModal";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";

import "./style.css";
import { XpressLayout } from "../../../shared/layout";

const Bin: React.FC = (props) => {
  const [state, setState] = useState({
    providers: new Array<Response.ProviderResponse>(),
    loading: false,
    openAlertModal: false,
    message: "",
    isSuccess: false,
    isEdit: false,
    isError: false,
    errorMessage: "",
  });
  const [accessPage, setAccessPage] = useState(true);
  const [binRequest, setBinRequest] = useState(new Request.BinRequest());
  const [providers, setProviders] = useState(
    new Array<Response.ProviderResponse>()
  );
  const [cardBrand, setCardBrand] = useState(
    new Array<Response.CardBrandResponse>()
  );
  const [rows, setRow] = useState([] as any);
  const [showModal, setModal] = useState(false);
  const [column, setColumn] = useState([] as any);
  const [originalRows, setOriginaRows] = useState([] as any);
  async function OpenCreateBinModal() {
    await setState({
      ...state,
      isEdit: false,
      isError: false,
      errorMessage: "",
    });
    await setBinRequest({});
    await setModal(true);
  }
  async function SetColumn() {
    let col = {
      title: "Action",
      key: "operation",
      fixed: "center",
      width: 100,
      render: (_: any, record: Response.BinResponse) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewBin")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            onClick={() => OpenEditBinModal(record)}
            disabled={!PagePermission.IsUserActionPermitted("CanViewBin")}
            style={{
              background: "white",
              borderRadius: "5px",
              width: "58px",
              height: "35px",
              border: "1px solid #2B872B",
              color: "white",
            }}
          >
            <span style={{ color: "#2B872B" }}>Edit</span>
          </Button>
        </Tooltip>
      ),
    };
    let columns = column;
    columns = [
      "key",
      "Bin",
      "Status",
      "Provider",
      "Card Brand",
      "Pin Required",
      "Others Required",
      "DateCreated",
      "Date Modified",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function OpenEditBinModal(bin: Response.BinResponse) {
    await setBinRequest({
      ...binRequest,
      id: bin.id,
      binName: bin.binName,
      provider: bin.provider,
      isActive: bin.isActive,
      isPinRequired: bin.isPinRequired,
      isOthersRequired: bin.isOthersRequired,
      cardBrand: bin.cardBrand,
    });
    await setState({ ...state, isEdit: true });
    await setModal(true);
  }

  async function Search(value: string) {
    let bin = await SearchDatatable.Search(originalRows, value);
    await setRow(bin);
  }
  function SetBintatus(status: any) {
    return (
      <React.Fragment>
        {status ? (
          <img src={MerchantApprovalIcon} alt={""} />
        ) : (
          <img src={DisapproveIcon} alt={""} />
        )}
      </React.Fragment>
    );
  }

  async function CreateBin() {
    if (
      !binRequest.binName ||
      !binRequest.cardBrand ||
      !binRequest.provider ||
      binRequest.binName!?.length <= 0
    ) {
      await setState({
        ...state,
        isError: true,
        errorMessage:
          "One of the bin field is empty. Please fill the required fields",
      });
      return;
    }
    await setState({ ...state, loading: true });
    const response = await POST(apiUrl.SetUp.CreateBin, binRequest);
    if (response.success) {
      await GetAllBin();
      await setModal(false);
      await setState({
        ...state,
        message: `BIN has been successfully added`,
        loading: false,
        openAlertModal: true,
      });
    } else {
      await setState({
        ...state,
        loading: true,
        isError: true,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  async function UpdateBin() {
    await setState({ ...state, loading: true });
    const response = await POST(apiUrl.SetUp.UpdateBin, binRequest);
    if (response.success) {
      await GetAllBin();
      await setModal(false);
      await setState({
        ...state,
        message: `BIN details have successfully.`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setState({ ...state, loading: false });
    }
  }
  async function FetchCardBrands() {
    const response = await GET(apiUrl.SetUp.GetAllBrands);
    if (response.success) {
      await setCardBrand(response.data.$values);
    }
  }

  async function GetAllBin() {
    const accessPage = (await PagePermission.IsUserPermitted(
      "CanViewAllBin"
    )) as boolean;
    await setAccessPage(accessPage);
    const response = await GET(apiUrl.SetUp.GetAllBin);
    if (response.success) {
      let bin: Array<Response.BinResponse> = response.data.$values;
      let sn = 0;
      await bin.forEach(function (element: Response.BinResponse) {
        sn = sn + 1;
        element.key = sn;
        element.bin = element.binName;
        element.status = element.isActive ? "Active" : "Inactive";
        element.othersRequired = SetBintatus(element.isOthersRequired);
        element.pinRequired = SetBintatus(element.isPinRequired);
        element.dateCreated = new DateTime().ConvertAPItoFieldDate(
          element.dateCreated as string
        );
        element.dateModified = new DateTime().ConvertAPItoFieldDate(
          element.dateModified as string
        );
      });
      await setRow(bin);
      await setOriginaRows(bin);
    }
  }
  async function FetchProviders() {
    const response = await GET(apiUrl.SetUp.GetAllProviders);
    if (response.success) {
      await setProviders(response.data.$values);
    }
  }

  useEffect(() => {
    SetColumn();
    GetAllBin();
    FetchProviders();
    FetchCardBrands();
  }, []);
  return (
    <XpressLayout>
      <AlertModal
        message={state.message}
        show={state.openAlertModal}
        isSuccess={state.isSuccess}
        isApproved={true}
        handleClose={() => {
          setState({ ...state, openAlertModal: false });
        }}
      />
      {accessPage ? (
        <>
          <BinModal
            UpdateBin={UpdateBin}
            CreateBin={CreateBin}
            setBinRequest={setBinRequest}
            binRequest={binRequest}
            providers={providers}
            setModal={setModal}
            showModal={showModal}
            loading={state.loading}
            isEdit={state.isEdit}
            cardBrand={cardBrand}
            errorMessage={state.errorMessage}
            isError={state.isError}
          />
          <section className="admin-kyc-container">
            <main>
              <BinHeader
                OpenCreateBinModal={OpenCreateBinModal}
                Search={Search}
              />
            </main>
            <main style={{ marginLeft: 20, marginRight: 20 }}>
              <DataTable rows={rows} columns={column} />
            </main>
          </section>
        </>
      ) : (
        <UnAuthorizePage />
      )}
    </XpressLayout>
  );
};

export default Bin;
