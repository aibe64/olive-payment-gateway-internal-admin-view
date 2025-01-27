import { Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/models";

const UnAuthorize = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTE_PATH.Dashboard);
  };
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="mb-4">
        {" "}
        <StopOutlined className="text-danger text-[5rem]" />
      </div>
      <h1 className="text-3xl font-bold text-danger">Access Denied</h1>
      <p className="mt-2 dark:text-white">
        You don’t have permission to view this page.
      </p>
      <Button
        onClick={handleGoBack}
        type="primary"
        className="mt-4 px-6 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Return Back
      </Button>
    </div>
  );
};

export default UnAuthorize;
