import Statistics from "./Statistics";
import Filter from "./Filter";
import Chart from "./Chart";
import { endpoints } from "@/service";
import { APIResponse } from "@/models";
import TopTransactions from "./TopTransactions";
import { AppConfig } from "@/config";
import { useAPI } from "@/hooks";

const Dashboard: React.FC = () => {
  document.title = `Dashboard${AppConfig.APP_DESCRIPTION}`;

  const { data: statistics, fetching } = useAPI<APIResponse.Statistics>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.GetAppStatistics,
  });

  return (
    <div>
      <Filter />
      <Statistics statistics={statistics} loading={fetching} />
      <Chart statistics={statistics} loading={fetching} />
      <TopTransactions />
    </div>
  );
};

export default Dashboard;
