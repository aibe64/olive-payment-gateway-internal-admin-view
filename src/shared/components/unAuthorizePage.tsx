/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import blanck from "../../images/blanckPageIcon.svg";

const UnAuthorizedPage: React.FC = (props) => {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <img style={{ width: "200px", height: "200px" }} src={blanck} alt="" />
        <div>
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "#d04646" }}
          >
            Looks like you are NOT authorized to view this page
          </span>
          <br />
          <span>
            Please contact the admin to authorize you to view this page.
          </span>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default UnAuthorizedPage;
