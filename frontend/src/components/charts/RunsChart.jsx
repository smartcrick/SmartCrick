import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RunsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: item.date,
    runs: item.runs || 0,
  }));

  return (
    <div>
      <h3>Runs Over Time</h3>
      <LineChart width={600} height={300} data={formattedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="runs" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RunsChart;
