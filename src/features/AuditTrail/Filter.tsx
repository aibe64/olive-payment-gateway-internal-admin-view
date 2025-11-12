import { Button, Popover, Typography } from "antd";
import { useState, useCallback, useMemo } from "react";
import { FilterOutlined, DownOutlined } from "@ant-design/icons";
import { OliveButton, OliveField, OliveForm } from "@/components";
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
      <OliveForm
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
        <OliveField
          classNames="w-full"
          label={"Start Date"}
          name="startDate"
          type="date"
        />
        <OliveField
          classNames="w-full"
          label={"End Date"}
          name="endDate"
          type="date"
        />
        <OliveField label={"Email"} name="email" validator="email" />
        <div className="flex flex-row gap-2 w-full justify-between">
          <Button onClick={clearForm}>Clear</Button>
          <OliveButton.Submit classNames="!py-5" title="Apply" />
        </div>
      </OliveForm>
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
