import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const WicketsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: item.date,
    wickets: item.wickets || 0,
  }));

  return (
    <div>
      <h3>Wickets Per Match</h3>
      <BarChart width={600} height={300} data={formattedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Bar dataKey="wickets" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default WicketsChart;