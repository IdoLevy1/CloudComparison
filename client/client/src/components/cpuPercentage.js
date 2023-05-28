import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const cpuPercentage = (props) => {
  const { timestamp, data, options } = props;

  return (
    <div className="cpu">
      <h1>CPU Percentage</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default cpuPercentage;
