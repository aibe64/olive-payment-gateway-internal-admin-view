import { Outlet } from "react-router-dom";

import { FloatButton, Typography } from "antd";
import { useModalStore, usePageStore } from "@/store";
import { State } from "@/models";
import { TimeOut, WarningHeader } from "../UI";
import { XpressHeader } from "../Element";
import { XpressSideBar } from ".";
import { useCallback } from "react";
import { useTimeoutHook } from "@/hooks";

export const HomeLayout = () => {
  const { isApproved } = usePageStore<State.Layout>((state) => state);
  const { set } = useModalStore();
  const onShowTimeout = useCallback(() => {
    set({
      open: true,
      title: (
        <Typography className="text-center text-base">
          SESSION TIMED OUT
        </Typography>
      ),
      body: <TimeOut />,
      showCloseButton: false,
      width: 448,
      styles: {
        mask: { backdropFilter: "blur(10px)" },
      },
    });
  }, [set]);

  useTimeoutHook({
    onTimeout() {
      onShowTimeout();
    },
  });
  return (
    <div className="min-h-screen grid lg:grid-cols-[16rem_1fr]">
      <XpressSideBar className="hidden lg:flex" />
      <main
        className={`h-screen grid grid-rows-[4rem_1fr] lg:grid-rows-[4rem_1fr]`}
      >
        {isApproved && (
          <WarningHeader message="Upgrade your kyc to use this service." />
        )}
        <XpressHeader/>
        <section className="p-2 md:p-5 md:pr-16 bg-[#FAFAFA] dark:bg-[#121212] overflow-auto">
          <Outlet />
        </section>
      </main>
      <FloatButton />
    </div>
  );
};
