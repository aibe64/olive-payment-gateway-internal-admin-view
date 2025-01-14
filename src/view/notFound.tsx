import { Button } from "antd";
import { useEffect } from "react";
import xpresspayLogo from "../images/logo.svg";
import notFound from "../images/notFound.svg";
import { Encription } from "../shared/functions/encryption";
import { Response } from "../models/client/apiResponse";
import { SSO_DOMAIN } from "@/utils";

export const NotFound = () => {
  useEffect(() => {
    if (localStorage.getItem("***")) {
      const userInfo: Response.UserInfo = JSON.parse(
        Encription.decrypt(localStorage.getItem("***") as string)
      );
      if (!userInfo.isInternalUser) {
        window.location.href = `${SSO_DOMAIN}?redirectTo=${window.location.origin}`;
      }
    } else {
      window.location.href = `${SSO_DOMAIN}?redirectTo=${window.location.origin}`;
    }
  }, []);

  return (
    <>
      <section className="notFound-container">
        <main style={{ margin: 30 }}>
          <div style={{ display: "flex" }}>
            <img height={30} src={xpresspayLogo} alt="" />
            <div style={{ marginTop: -5 }}>
              <span style={{ color: "green", fontWeight: 800, fontSize: 23 }}>
                Xpress
              </span>
              <span style={{ color: "orange", fontWeight: 800, fontSize: 23 }}>
                Pay
              </span>
            </div>
          </div>
        </main>
        <main></main>
      </section>
      <section className="notFound-content">
        <img src={notFound} alt="" />
      </section>
      <section className="notFound-content">
        <div style={{ fontSize: 27, fontWeight: 600 }}>Page not found</div>
      </section>
      <section className="notFound-content">
        <div style={{ width: 400, fontSize: 17, textAlign: "center" }}>
          Uh oh, we can’t seem to find the page you’re looking for. Try going
          back to the previous page or contact our customer care for more
          information
        </div>
      </section>
      <section style={{ marginTop: 30 }} className="notFound-content">
        <Button
          onClick={() =>
            (window.location.href = `${SSO_DOMAIN}?redirectTo=${window.location.origin}`)
          }
          style={{ border: "1px solid green", color: "green" }}
        >
          Go Back Home
        </Button>
      </section>
    </>
  );
};
