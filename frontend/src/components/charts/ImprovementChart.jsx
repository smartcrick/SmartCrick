import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ImprovementChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: item.date,
    short_ball: item.short_ball_success || 0,
    yorker: item.yorker_accuracy || 0,
  }));

  return (
    <div>
      <h3>Skill Improvement</h3>
      <LineChart width={600} height={300} data={formattedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="short_ball" stroke="#ff7300" />
        <Line type="monotone" dataKey="yorker" stroke="#387908" />
      </LineChart>
    </div>
  );
};

export default ImprovementChart;