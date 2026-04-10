import { useEffect, useState } from "react";

import axiosClient from "../api/axiosClient";

const Analysis = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await axiosClient.get("/api/analysis/");
      setData(res.data);
    } catch {
      setError("Unable to load analysis right now.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Analysis</h1>

      <h3>Batting</h3>
      <p>Average Runs: {data.avg_runs}</p>
      <p>Strike Rate: {data.strike_rate}</p>

      <h3>Bowling</h3>
      <p>Avg Wickets: {data.avg_wickets}</p>
      <p>Economy: {data.economy}</p>

      <h3>Weaknesses</h3>
      <ul>
        {data.weaknesses.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  );
};

export default Analysis;
