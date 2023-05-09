import React from "react";
import { useLocation } from 'react-router-dom';
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
const Graphs = () => {
    const {state} = useLocation();

    const type = state.type;
    const location = state.location;
    const suppliers = state.suppliers;
    // console.log(type);
    const cpuData = [
        {
          label: "Amazon",
          // data: json.PercentageCPU,
          data: [72, 60, 69, 78, 59],
          backgroundColor: "#2875b8",
          borderColor: "#2875b8",
          pointBorderColor: "#2875b8",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Azure",
          // data: json.PercentageCPU,
          data: [69, 73, 69, 81, 83],
          backgroundColor: "#aa75b8",
          borderColor: "#aa75b8",
          pointBorderColor: "#aa75b8",
          fill: true,
          tension: 0.4,
        },
      ];

      const cpuGraphData = {
        labels: ["11:00", "11:01", "11:02", "11:03", "11:04"],
        datasets: cpuData,
      };
    
      const options = {
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            grid: {
              display: false,
              color: "black",
            },
            ticks: {
              font: {
                size: 12,
                weight: "bold",
              },
              color: "black",
            },
          },
          y: {
            grid: {
              color: "rgba(165, 156, 180, 0.4)",
              borderDash: [2, 2],
            },
            ticks: {
              font: {
                size: 12,
                weight: "bold",
              },
              color: "black",
            },
            min: 0,
            max: 100,
          },
        },
      };
    
      return (
        <div className="cpu">
          <h2>CPU percentage</h2>
          <div>
            {/* <select>
              <option value="real-time">Real-time</option>
              <option value="history">History</option>
            </select> */}
          </div>
          <div
            style={{
              display: "inline-block",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "20px",
              marginTop: "40px",
              width: "600px",
              height: "300px",
            }}
          >
            <Line data={cpuGraphData} options={options} />
            {/* <CPU labels={labels} percentage={cpuPercentages} />
          <Memory labels={labels} percentage={percentageMemory} />
          <Network
            labels={labels}
            incomingTraffic={incomingTraffic}
            outcomingTraffic={outcomingTraffic}
          />
          {/* <h9>The selected value is: {type}</h9>
          <h8> {location}</h8> */}
          </div>
        </div>
      );
    };

export default Graphs;






