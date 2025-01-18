import Statistics from "./Statistics";
import { DashboardFilter } from "./Filter";
import Chart from "./Chart";
import { AppConfig } from "@/config";

const Dashboard: React.FC = () => {
  document.title = `Dashboard${AppConfig.APP_DESCRIPTION}`;

  return (
    <div>
      <Statistics />
      <DashboardFilter />
      <Chart />
    </div>
  );
};

export default Dashboard;
