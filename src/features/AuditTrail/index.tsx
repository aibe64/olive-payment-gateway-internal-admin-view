import { PageTitle, TableFilter, OliveTable } from "@/components";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { exportToExcel } from "@/lib/helper";
import { useCallback, useEffect } from "react";
import { AuditTrailFilter } from "./Filter";
import { auditTrailDataColumns } from "./Columns";
import { useAPI } from "@/hooks";
import { endpoints } from "@/service";
import { APIResponse, AppState } from "@/models";
import { useFormStore, usePageStore } from "@/store";

const AuditTrail = () => {
  const { callPostData, posting } = useAPI({});
  const { setState, auditTrailsData, originalAuditTrailsData } =
    usePageStore<AppState>((state) => state);
  const { payload } = useFormStore();

  const handleDownload = useCallback(() => {
    exportToExcel(auditTrailsData?.items ?? [], "Audit_Logs");
  }, [auditTrailsData?.items]);

  const onPaginate = useCallback(
    (page: number) => {
      callPostData({
        url: endpoints.Report.GetAuditReport,
        request: {
          startDate: payload?.startDate ?? undefined,
          endDate: payload?.endDate ?? undefined,
          email: payload?.email ?? undefined,
          pageNumber: page,
          pageSize: 10,
        },
        callBackApiResponse: (response: APIResponse.AuditTrails) => {
          setState("auditTrailsData", response);
          setState("originalAuditTrailsData", response);
        },
      });
    },
    [setState, payload]
  );

  useEffect(() => {
    callPostData({
      url: endpoints.Report.GetAuditReport,
      request: {
        pageNumber: 1,
        pageSize: 10,
      },
      callBackApiResponse: (response: APIResponse.AuditTrails) => {
        setState("auditTrailsData", response);
        setState("originalAuditTrailsData", response);
      },
    });
  }, [setState]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title="Audit Logs"
        totalDataCount={auditTrailsData?.items?.length ?? 0}
      />
      <TableFilter customFilter={<AuditTrailFilter />} hideFilterField={true}>
        <Button
          icon={<DownloadOutlined />}
          className="!bg-primary !text-white"
          onClick={handleDownload}
        >
          Download CSV
        </Button>
      </TableFilter>
      <div className="audit-table-wrapper">
        <OliveTable<APIResponse.AuditTrailItems>
          columns={auditTrailDataColumns}
          dataSource={auditTrailsData?.items ?? []}
          originalSource={originalAuditTrailsData?.items ?? []}
          emptyHeadingText="No Audit Logs"
          emptyParagraphText="There are no audit logs to display."
          spinning={posting}
          total={auditTrailsData?.totalCount ?? 0}
          pageSize={10}
          rowCount={auditTrailsData?.items?.length ?? 0}
          onPagination={onPaginate}
        />
      </div>
    </div>
  );
};

export default AuditTrail;
