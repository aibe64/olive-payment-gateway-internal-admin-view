import { Button, Popover, Typography } from "antd";
import { useState, useCallback, useMemo } from "react";
import { FilterOutlined, DownOutlined } from "@ant-design/icons";
import { XpressButton, XpressField, XpressForm } from "@/components";
import { useFormStore, usePageStore } from "@/store";
import { endpoints } from "@/service";
import { APIResponse, AppState } from "@/models";

export const AuditTrailFilter = () => {
  const [open, setOpen] = useState(false);
  const { clearForm } = useFormStore();
  const { setState } = usePageStore<AppState>((state) => state);

  const handlePopOver = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);



  const filterContent = useMemo(() => {
    return (
      <XpressForm
        callApi
        apiConfig={{
          endpoint: endpoints.Report.GetAuditReport,
          method: "POST",
          callBack(response: APIResponse.AuditTrails) {
            setState("auditTrailsData", response);
            setState("originalAuditTrailsData", response);
            setOpen(false);
          },
        }}
        className="flex flex-col w-[250px]"
      >
        <XpressField
          classNames="w-full"
          label={"Start Date"}
          name="startDate"
          type="date"
        />
        <XpressField
          classNames="w-full"
          label={"End Date"}
          name="endDate"
          type="date"
        />
        <XpressField label={"Email"} name="email" validator="email" />
        <div className="flex flex-row gap-2 w-full justify-between">
          <Button onClick={clearForm}>Clear</Button>
          <XpressButton.Submit classNames="!py-5" title="Apply" />
        </div>
      </XpressForm>
    );
  }, []);

  return (
    <>
      <Popover
        content={filterContent}
        trigger="click"
        open={open}
        placement="bottomLeft"
      >
        <Button onClick={handlePopOver}>
          <div className="flex justify-between gap-2">
            <FilterOutlined />
            <Typography>Filter</Typography>
            <DownOutlined />
          </div>
        </Button>
      </Popover>
    </>
  );
};
