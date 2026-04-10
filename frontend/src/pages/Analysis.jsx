import React, { useEffect, useState } from "react";
import API from "../api/api";

const Analysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    const res = await API.get("analysis/");
    setData(res.data);
  };

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