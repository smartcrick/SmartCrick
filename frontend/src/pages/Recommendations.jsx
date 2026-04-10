import React, { useEffect, useState } from "react";
import API from "../api/api";

const Recommendations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const res = await API.get("recommendations/");
    setData(res.data);
  };

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