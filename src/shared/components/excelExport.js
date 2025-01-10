import React from "react";
import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

function GenerateExcel(data) {
  const downloadDataToExcel = async () => {
    if (data.rows?.length) {
      let wb = XLSX?.utils?.book_new(),
        ws = XLSX?.utils?.json_to_sheet(data?.rows);
      XLSX?.utils?.book_append_sheet(wb, ws, "XpressPaySheet");
      XLSX?.writeFile(wb, `${data.fileName}.xlsx`);
    }
  };
  return (
    <>
      <Button
        icon={<FileExcelOutlined />}
        loading={data.loading}
        onClick={() => downloadDataToExcel()}
        style={{
          backgroundColor: "#006F01",
          border: "none",
          borderRadius: "4px",
          float: "right",
          color: "white",
          marginRight: "5px",
        }}
        htmlType="button"
      >
        {data.buttonName}
      </Button>
    </>
  );
}
export default GenerateExcel;
