import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
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

const Network = (props) => {
  const { labels, incomingTraffic, outcomingTraffic } = props;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Azure Cloud",
        data: incomingTraffic,
        backgroundColor: "#2875b8",
        borderColor: "#2875b8",
        pointBorderColor: "#2875b8",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };
  return (
    <div className="Network">
      <h2>Network</h2>
      <div
        style={{
          width: "600px",
          height: "400px",
          padding: "20px",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default Network;
