import { PageTitle, TableFilter, XpressTable } from "@/components";
import { Button, Select, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import SortByIcon from "@/assets/SortByIcon";
import { exportToExcel, searchTable } from "@/lib/helper";
import { useState } from "react";

const dummyData = [
  {
    key: 1,
    dateTime: "12 Mar 2025, 14:45 GMT+1",
    adminName: "John Doe",
    action: "Created User",
    details: 'Added new merchant "XYZ Ltd."',
  },
  {
    key: 2,
    dateTime: "12 March 2025 14:30 GMT+1",
    adminName: "Jane Smith",
    action: "Updated Settings",
    details: "Change payment gateway API Key",
  },
  {
    key: 3,
    dateTime: "12 March 2025 14:15 GMT+1",
    adminName: "David Ojo",
    action: "Deleted Transaction",
    details: "Removed transaction #987654",
  },
  {
    key: 4,
    dateTime: "12 March 2025 14:00 GMT+1",
    adminName: "Michael Adekunle",
    action: "Logged In",
    details: "Accessed admin dashboard",
  },
  {
    key: 5,
    dateTime: "12 March 2025 13:45 GMT+1",
    adminName: "Susan Okafor",
    action: "Updated Merchant Details",
    details: 'Modified business address for "ABC Ltd"',
  },
  {
    key: 6,
    dateTime: "12 March 2025 13:30 GMT+1",
    adminName: "James Ibe",
    action: "Revoked User Access",
    details: "Removed access for ex employee",
  },
  {
    key: 7,
    dateTime: "12 March 2025 13:15 GMT+1",
    adminName: "Chinedu Nwosu",
    action: "Process Refund",
    details: "Issued refund for order #123456",
  },
  {
    key: 8,
    dateTime: "12 March 2025 13:00 GMT+1",
    adminName: "Fatima Yusuf",
    action: "Added Discount Code",
    details: "Created 10% off promo for holiday sale",
  },
  {
    key: 9,
    dateTime: "12 March 2025 12:45 GMT+1",
    adminName: "Oluwaseun Balogun",
    action: "Change Password",
    details: "Reset admin password due to security update",
  },
];

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
    key: "sn",
    width: 60,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
    width: 180,
  },
  {
    title: "Admin Name",
    dataIndex: "adminName",
    key: "adminName",
    width: 160,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 180,
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
    width: 350,
    ellipsis: true,
  },
];

const sortOptions = [
  {
    value: "default",
    label: (
      <span
        style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}
      >
        <SortByIcon style={{ fontSize: 16 }} /> Sort by
      </span>
    ),
  },
  { value: "date", label: <span style={{ fontSize: 14 }}>Sort by Date</span> },
  {
    value: "admin",
    label: <span style={{ fontSize: 14 }}>Sort by Admin Name</span>,
  },
  {
    value: "action",
    label: <span style={{ fontSize: 14 }}>Sort by Action</span>,
  },
];

const AuditTrail = () => {
  const [originalData] = useState(dummyData);
  const [data, setData] = useState(dummyData);
  const [sort, setSort] = useState("default");

  const handleDownload = () => {
    exportToExcel(data, "Audit_Logs");
  };

  const handleFilterChange = (value: string) => {
    setData(searchTable(originalData, value));
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Audit Logs" totalDataCount={data.length} />
      <TableFilter
        customFilter={
          <div className="flex items-center gap-2">
            <Select
              value={sort}
              onChange={setSort}
              options={sortOptions}
              className="w-[160px] audit-sort-select"
              size="large"
              dropdownStyle={{ fontSize: 14 }}
            />
          </div>
        }
        hideFilterField={true}
      >
        <Input
          onChange={(e) => handleFilterChange(e.target.value)}
          className="lg:w-[20rem] rounded-2xl mr-2"
          placeholder={"Search..."}
          style={{ fontSize: 14 }}
          allowClear
        />
        <Button
          icon={<DownloadOutlined />}
          className="!bg-primary !text-white"
          onClick={handleDownload}
        >
          Download CSV
        </Button>
      </TableFilter>
      <div className="audit-table-wrapper">
        <XpressTable
          columns={columns}
          dataSource={data}
          emptyHeadingText="No Audit Logs"
          emptyParagraphText="There are no audit logs to display."
          spinning={false}
          total={data.length}
          pageSize={10}
          rowCount={data.length}
          scrollX={1100}
        />
      </div>
    </div>
  );
};

export default AuditTrail;
