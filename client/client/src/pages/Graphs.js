import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Graphs.css";
import TimeSelection from "../components/TimeSelection";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title
);

const Graphs = () => {
  const { state } = useLocation();

  const type = state.type;
  const location = state.location;
  const suppliers = state.suppliers;
  const [isRealTime, setIsRealTime] = useState(false);
  const [cpuData, setCpuData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fetchedCpuData, setFetchedCpuData] = useState({});
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [googleMachineData, setGoogleMachineData] = useState([]);

  // console.log(type);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedCpuData = {};

    for (const supplier of suppliers) {
      if (supplier === "Google") {
        const supplierWithCloud = supplier + "Cloud";
        let url = `http://localhost:8496/${supplierWithCloud}/GetMetricsFromDB?MachineType=${type}&Location=${location}`;

        try {
          const response = await fetch(url);
          const json = await response.json();
          const cpuPercentage = [];
          const timeStamp = [];
          // console.log(json.timeStamp);
          for (const obj of json) {
            cpuPercentage.push(obj.percentageCPU);
            timeStamp.push(obj.timeStamp);
          }
          fetchedCpuData[supplier] = {
            // label: supplier,
            machineType: type,
            location: location,
            timeStamp: timeStamp,
            data: cpuPercentage,
            // backgroundColor: "#aa75b8",
            // borderColor: "#aa75b8",
            // pointBorderColor: "#aa75b8",
            // fill: true,
            // tension: 0.4,
          };
          setFetchedCpuData(fetchedCpuData);
        } catch (error) {
          console.error(`Failed to fetch data for ${supplier}:`, error);
        }
      }
      // setFetchedCpuData(fetchedCpuData);
      console.log(fetchedCpuData);
    }
  };

  useEffect(() => {
    if (!isRealTime && startDate && endDate) {
      const labels = [];
      const data = [];

      Object.entries(fetchedCpuData).forEach(([supplier, supplierData]) => {
        const { timeStamp, data: supplierDataArray } = supplierData;

        const filteredTimeStamps = timeStamp.filter((timestamp) => {
          const timestampDate =
            new Date(timestamp).toISOString().split(".")[0] + "Z";
          return timestampDate >= startDate && timestampDate <= endDate;
        });
        const filteredDataValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return supplierDataArray[index];
        });

        labels.push(...filteredTimeStamps);
        data.push(...filteredDataValues);
      });
      const formattedLabels = labels.map((timestamp) => {
        const date = new Date(timestamp);
        return date
          .toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })
          .replace(",", "");
      });
      setFilteredLabels(formattedLabels);
      setFilteredData(data);
      console.log(formattedLabels);
    }
  }, [isRealTime, startDate, endDate, fetchedCpuData]);

  // const timestamps = Object.values(fetchedCpuData)
  //   .map((supplierData) => supplierData.timestamp)
  //   .flat();
  const cpuGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(fetchedCpuData).map(([supplier, supplierData]) => {
      return {
        label: supplier,
        data: filteredData,
        // Additional dataset options if needed
        backgroundColor: "#aa75b8",
        borderColor: "#aa75b8",
        pointBorderColor: "#aa75b8",
        fill: true,
        tension: 0.4,
      };
    }),
  };

  const options = {
    plugins: {
      legend: true,
      title: {
        display: true,
        text: "CPU percentage",
        color: "#516",
        font: {
          family: "Comic Sans MS",
          size: 20,
          weight: "bold",
          lineHeight: 1.2,
        },
        padding: { top: 15, left: 0, right: 0, bottom: 15 },
      },
    },
    layout: {
      padding: {
        left: 50, // Adjust the left padding as needed
        right: 50, // Adjust the right padding as needed
        top: 0,
        bottom: 0,
      },
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
          maxTicksLimit: 8,
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
          stepSize: 30,
        },

        min: 0,
        max: 180,
        stepSize: 20,
      },
    },
  };

  const handleSelectChange = (value) => {
    if (value === "real-time") {
      setIsRealTime(true);
    } else if (value === "history") {
      setIsRealTime(false);
    }
  };

  const handleDateChange = (start, end) => {
    setStartDate(start.toISOString().split(".")[0] + "Z");
    setEndDate(end.toISOString().split(".")[0] + "Z");
    console.log(startDate);
    console.log(endDate);
  };

  return (
    <div className="graphs">
      {/* <InsertToDB /> */}
      <h2>Results</h2>
      <TimeSelection
        onSelectChange={handleSelectChange}
        onDateChange={handleDateChange}
        isRealTime={isRealTime}
      />
      {/* <div className="selection-container">
        <select onChange={handleSelectChange} className="selection">
          <option value="real-time">Real-time</option>
          <option value="history">History</option>
        </select>
      </div> */}
      <div
        style={{
          display: "inline-block",
          border: "1px solid black",
          borderRadius: "5px",
          padding: "20px",
          paddingLeft: "5px",
          marginTop: "40px",
          width: "1000px",
          height: "500px",
        }}
      >
        <Line data={cpuGraphData} options={options} />
        {/* <div
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
            <Line data={cpuGraphData} options={options} />
            <Line data={cpuGraphData} options={options} /> */}
        {/* <CPU labels={labels} percentage={cpuPercentages} />
          <Memory labels={labels} percentage={percentageMemory} />
          <Network
            labels={labels}
            incomingTraffic={incomingTraffic}
            outcomingTraffic={outcomingTraffic}
          />
          {/* <h9>The selected value is: {type}</h9>
          <h8> {location}</h8> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Graphs;

// const cpuData = [
//     {
//       label: "Amazon",
//       // data: json.PercentageCPU,
//       data: [72, 60, 69, 78, 59],
//       backgroundColor: "#2875b8",
//       borderColor: "#2875b8",
//       pointBorderColor: "#2875b8",
//       fill: true,
//       tension: 0.4,
//     },
//     {
//       label: "Azure",
//       // data: json.PercentageCPU,
//       data: [69, 73, 69, 81, 83],
//       backgroundColor: "#aa75b8",
//       borderColor: "#aa75b8",
//       pointBorderColor: "#aa75b8",
//       fill: true,
//       tension: 0.4,
//     },
//   ];
// if (supplier === "Google") {
//   url += `&startTime=${
//     startTime.toISOString().split(".")[0] + "Z"
//   }&endTime=${endTime.toISOString().split(".")[0] + "Z"}`;
// } else if (supplier === "Azure") {
//   url += `&timespan=${
//     startTime.toISOString().split(".")[0] +
//     "Z/" +
//     endTime.toISOString().split(".")[0] +
//     "Z"
//   }`;
// }
// const setHistoryData = (url, supplier) => {
//   const now = new Date();
//   const endTime = new Date(now.getTime() - 10 * 60 * 60 * 1000);
//   const startTime = new Date(now.getTime() - 12 * 60 * 60 * 1000);

//   const labels = [];
//   let currentTime = new Date(startTime.getTime());

//   while (currentTime < endTime) {
//     const label = `${currentTime.getDate()}/${
//       currentTime.getMonth() + 1
//     } ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
//     labels.push(label);
//     currentTime.setMinutes(currentTime.getMinutes() + 10);
//   }

//   const startLabel = `${startTime.getDate()}/${
//     startTime.getMonth() + 1
//   } ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`;
//   const endLabel = `${endTime.getDate()}/${
//     endTime.getMonth() + 1
//   } ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`;

//   setLabels([startLabel, ...labels, endLabel]);
// };

// const setRealtimeData = (url, supplier) => {
//   const endTime = new Date();
//   const startTime = new Date(endTime.getTime() - 1 * 60 * 1000);

//   const endLabel = `${endTime.getDate()}/${
//     endTime.getMonth() + 1
//   } ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`;
//   setLabels((prevLabels) => {
//     if (prevLabels.length >= 5) {
//       // Remove the last label and add the new label at the beginning
//       return [endLabel, ...prevLabels.slice(0, prevLabels.length - 1)];
//     } else if (!prevLabels.includes(endLabel)) {
//       // Add the new label at the beginning
//       return [endLabel, ...prevLabels];
//     } else {
//       return [endLabel];
//     }
//   });
// };
