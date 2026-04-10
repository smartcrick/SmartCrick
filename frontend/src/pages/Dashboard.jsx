import React, { useEffect, useState } from "react";
import API from "../api/api";
import RunsChart from "../components/charts/RunsChart";
import WicketsChart from "../components/charts/WicketsChart";
import ImprovementChart from "../components/charts/ImprovementChart";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("performance/");
    setData(res.data);
  };

  return (
    <div>
      <h1>Performance Dashboard</h1>

      <RunsChart data={data} />
      <WicketsChart data={data} />
      <ImprovementChart data={data} />
    </div>
  );
};

export default Dashboard;