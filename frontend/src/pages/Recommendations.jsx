import { useEffect, useState } from "react";

import axiosClient from "../api/axiosClient";

const Recommendations = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await axiosClient.get("/api/recommendations/");
      setData(res.data);
    } catch {
      setError("Unable to load recommendations.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recommendations</h1>

      {data.map((rec, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{rec.weakness}</h3>
          <ul>
            {rec.solution.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
