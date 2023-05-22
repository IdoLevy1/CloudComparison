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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [fetchedCpuData, setFetchedCpuData] = useState({});
  const [filteredCpuData, setFilteredCpuData] = useState([]);
  const [fetchedMemoryData, setFetchedMemoryData] = useState({});
  const [filteredMemoryData, setFilteredMemoryData] = useState([]);
  const [fetchedInTrafficData, setFetchedInTrafficData] = useState({});
  const [filteredInTrafficData, setFilteredInTrafficData] = useState([]);
  const [fetchedOutTrafficData, setFetchedOutTrafficData] = useState({});
  const [filteredOutTrafficData, setFilteredOutTrafficData] = useState([]);

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
          const memoryPercentage = [];
          const inTraffic = [];
          const outTraffic = [];
          const timeStamp = [];
          // console.log(json.timeStamp);
          for (const obj of json) {
            cpuPercentage.push(obj.percentageCPU);
            memoryPercentage.push(obj.percentageMemory);
            inTraffic.push(obj.incomingTraffic);
            outTraffic.push(obj.outcomingTraffic);
            timeStamp.push(obj.timeStamp);
          }

          fetchedCpuData[supplier] = {
            machineType: type,
            location: location,
            timeStamp: timeStamp,
            data: cpuPercentage,
          };
          setFetchedCpuData(fetchedCpuData);

          fetchedMemoryData[supplier] = {
            machineType: type,
            location: location,
            timeStamp: timeStamp,
            data: memoryPercentage,
          };
          setFetchedMemoryData(fetchedMemoryData);

          fetchedInTrafficData[supplier] = {
            machineType: type,
            location: location,
            timeStamp: timeStamp,
            data: inTraffic,
          };
          setFetchedInTrafficData(fetchedInTrafficData);

          fetchedOutTrafficData[supplier] = {
            machineType: type,
            location: location,
            timeStamp: timeStamp,
            data: outTraffic,
          };
          setFetchedOutTrafficData(fetchedOutTrafficData);
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
      const cpuData = [];
      const memoryData = [];
      const inTrafficData = [];
      const outTrafficData = [];

      Object.entries(fetchedCpuData).forEach(([supplier, supplierData]) => {
        const { timeStamp, data: supplierDataArray } = supplierData;

        const filteredTimeStamps = timeStamp.filter((timestamp) => {
          const timestampDate =
            new Date(timestamp).toISOString().split(".")[0] + "Z";
          return timestampDate >= startDate && timestampDate <= endDate;
        });

        const filteredCpuValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return supplierDataArray[index];
        });

        const memoryDataArray = fetchedMemoryData[supplier]?.data || [];
        const filteredMemoryValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return memoryDataArray[index];
        });

        const inTrafficDataArray = fetchedInTrafficData[supplier]?.data || [];
        const filteredInTrafficValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return inTrafficDataArray[index];
        });

        const outTrafficDataArray = fetchedOutTrafficData[supplier]?.data || [];
        const filteredOutTrafficValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return outTrafficDataArray[index];
        });

        labels.push(...filteredTimeStamps);
        cpuData.push(...filteredCpuValues);
        memoryData.push(...filteredMemoryValues);
        inTrafficData.push(...filteredInTrafficValues);
        outTrafficData.push(...filteredOutTrafficValues);
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
      setFilteredCpuData(cpuData);
      setFilteredMemoryData(memoryData);
      setFilteredInTrafficData(inTrafficData);
      setFilteredOutTrafficData(outTrafficData);
      console.log(inTrafficData);
    }
  }, [
    isRealTime,
    startDate,
    endDate,
    fetchedCpuData,
    fetchedMemoryData,
    fetchedInTrafficData,
    fetchedOutTrafficData,
  ]);

  const cpuGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(fetchedCpuData).map(([supplier, supplierData]) => {
      return {
        label: supplier,
        data: filteredCpuData,
        backgroundColor: "#aa75b8",
        borderColor: "#aa75b8",
        pointBorderColor: "#aa75b8",
        fill: true,
        tension: 0.4,
      };
    }),
  };

  const memoryGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(fetchedMemoryData).map(
      ([supplier, supplierData]) => {
        return {
          label: supplier,
          data: filteredMemoryData,
          backgroundColor: "#aa75b8",
          borderColor: "#aa75b8",
          pointBorderColor: "#aa75b8",
          fill: true,
          tension: 0.4,
        };
      }
    ),
  };
  const inTrafficGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(fetchedInTrafficData).map(
      ([supplier, supplierData]) => {
        return {
          label: supplier,
          data: filteredInTrafficData,
          backgroundColor: "#aa75b8",
          borderColor: "#aa75b8",
          pointBorderColor: "#aa75b8",
          fill: true,
          tension: 0.4,
        };
      }
    ),
  };

  const outTrafficGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(fetchedOutTrafficData).map(
      ([supplier, supplierData]) => {
        return {
          label: supplier,
          data: filteredOutTrafficData,
          backgroundColor: "#aa75b8",
          borderColor: "#aa75b8",
          pointBorderColor: "#aa75b8",
          fill: true,
          tension: 0.4,
        };
      }
    ),
  };
  const options = {
    plugins: {
      legend: true,
      title: {
        display: true,
        // text: "",
        color: "#516",
        font: {
          family: "Tahoma",
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
          // stepSize: 30,
        },

        // min: 0,
        // max: 180,
        // stepSize: 20,
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

  const graphStyle = {
    display: "inline-block",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "40px",
    width: "1000px",
    height: "500px",
  };
  const cpuGraphOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: "CPU Percentage",
      },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        min: 0,
        max: 180,
        stepSize: 40,
      },
    },
  };

  const memoryGraphOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: "Memory Percentage",
      },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        min: 0,
        max: 40,
        stepSize: 10,
      },
    },
  };

  const inTrafficGraphOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: "Incoming Traffic Percentage",
      },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        min: 0,
        max: 180,
        stepSize: 40,
      },
    },
  };

  const outTrafficGraphOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: "Outgoing Traffic Percentage",
      },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        min: 0,
        max: 0.5,
        stepSize: 0.4,
      },
    },
  };
  return (
    <div className="graphs">
      <h2>Results</h2>
      <TimeSelection
        onSelectChange={handleSelectChange}
        onDateChange={handleDateChange}
        isRealTime={isRealTime}
      />
      <div className="graph-row">
        <div className="graph-container">
          <div className="graph">
            <Line data={cpuGraphData} options={cpuGraphOptions} />
          </div>
        </div>
        <div className="graph-container">
          <div className="graph">
            <Line data={memoryGraphData} options={memoryGraphOptions} />
          </div>
        </div>
      </div>
      <div className="graph-row">
        <div className="graph-container">
          <div className="graph">
            <Line data={inTrafficGraphData} options={inTrafficGraphOptions} />
          </div>
        </div>
        <div className="graph-container">
          <div className="graph">
            <Line data={outTrafficGraphData} options={outTrafficGraphOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
