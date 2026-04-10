import { useEffect, useState } from "react";

import axiosClient from "../api/axiosClient";
import RunsChart from "../components/charts/RunsChart";
import WicketsChart from "../components/charts/WicketsChart";
import ImprovementChart from "../components/charts/ImprovementChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/api/performance/");
      setData(res.data);
    } catch {
      setError("Unable to load dashboard data.");
    }
  };

  if (error) return <p>{error}</p>;

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
