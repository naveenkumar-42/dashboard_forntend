import { AreaCards, AreaCharts, AreaTable, AreaTop , Profile } from "../../components";

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <Profile />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
