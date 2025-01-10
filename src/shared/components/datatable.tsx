/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Spin } from "antd";
import "../layout/style.css";
import { Props } from "../../models/application/props";
import { Table } from "antd";

export const DataTable: React.FC<Props.DataTable> = (props) => {
  const pagination = {
    itemRender: function (current: any, type: any, originalElement: any) {
      if (type === "prev") {
        return <a>Previous</a>;
      }
      if (type === "next") {
        return <a>Next</a>;
      }
      return originalElement;
    },
  };
  useEffect(() => {}, []);
  return (
    <div
      className="pg-datatable"
    >
      <Spin spinning={props.loading === true} tip="Please wait...">
        <Table
          pagination={pagination}
          columns={props.columns}
          dataSource={props.rows}
          scroll={{ x: (props.size as number) > 0 ? props.size : 1000 }}
        />
      </Spin>
    </div>
  );
};
