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

  const [isRealTime, setIsRealTime] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [fetchedCpuData, setFetchedCpuData] = useState({});
  const [filteredCpuData, setFilteredCpuData] = useState([]);
  const [fetchedMemoryData, setFetchedMemoryData] = useState({});
  const [filteredMemoryData, setFilteredMemoryData] = useState([]);
  const [fetchedInTrafficData, setFetchedInTrafficData] = useState({});
  const [filteredInTrafficData, setFilteredInTrafficData] = useState([]);
  const [fetchedOutTrafficData, setFetchedOutTrafficData] = useState([]);
  const [filteredOutTrafficData, setFilteredOutTrafficData] = useState([]);

  useEffect(() => {
    if (isRealTime) {
      fetchDataRealTime(); // Fetch initial data based on isRealTime value

      const intervalId = setInterval(fetchDataRealTime, 60000); // Fetch data every minute

      return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts or when isRealTime changes to false
      };
    } else {
      fetchDataHistory();
    }
  }, [isRealTime]);

  let isFirstCall = true;

  const fetchDataRealTime = async () => {
    const now = new Date();
    let isoTimestamp;
    if (isFirstCall) {
      const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
      isoTimestamp = fifteenMinutesAgo.toISOString().split(".")[0] + "Z";
      isFirstCall = false;
    } else {
      const sixMinutesAgo = new Date(now.getTime() - 6 * 60 * 1000);
      isoTimestamp = sixMinutesAgo.toISOString().split(".")[0] + "Z";
    }
    console.log(isoTimestamp);
    for (const supplier of suppliers) {
      const supplierWithCloud = supplier + "Cloud";
      let url = `http://localhost:8496/${supplierWithCloud}/GetMetricsFromTimeStamp?MachineType=${type}&Location=${location}&TimeStamp=${isoTimestamp}`;

      try {
        const response = await fetch(url);
        const json = await response.json();
        const timeStamp = json.map((obj) => obj.timeStamp);
        const cpuPercentage = json.map((obj) => obj.percentageCPU);
        const memoryPercentage = json.map((obj) => obj.percentageMemory);
        const inTraffic = json.map((obj) => obj.incomingTraffic);
        const outTraffic = json.map((obj) => obj.outcomingTraffic);
        filteredCpuData[supplier] = cpuPercentage;
        filteredMemoryData[supplier] = memoryPercentage;
        filteredInTrafficData[supplier] = inTraffic;
        filteredOutTrafficData[supplier] = outTraffic;
        const formattedLabels = timeStamp.map((timestamp) => {
          const date = new Date(timestamp);
          return date
            .toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })
            .replace(",", "");
        });
        setFilteredLabels((prevFilteredLabels) => {
          const uniqueLabels = Array.from(
            new Set([...prevFilteredLabels, ...formattedLabels])
          );
          return uniqueLabels;
        });
        setFilteredCpuData((prevFilteredCpuData) => {
          return {
            ...prevFilteredCpuData,
            [supplier]: [
              ...(prevFilteredCpuData[supplier] || []),
              ...cpuPercentage,
            ],
          };
        });
        setFilteredMemoryData((prevFilteredMemoryData) => {
          return {
            ...prevFilteredMemoryData,
            [supplier]: [
              ...(prevFilteredMemoryData[supplier] || []),
              ...memoryPercentage,
            ],
          };
        });
        setFilteredInTrafficData((prevFilteredInTrafficData) => {
          return {
            ...prevFilteredInTrafficData,
            [supplier]: [
              ...(prevFilteredInTrafficData[supplier] || []),
              ...inTraffic,
            ],
          };
        });
        setFilteredOutTrafficData((prevFilteredOutTrafficData) => {
          return {
            ...prevFilteredOutTrafficData,
            [supplier]: [
              ...(prevFilteredOutTrafficData[supplier] || []),
              ...outTraffic,
            ],
          };
        });
      } catch (error) {
        console.error(`Failed to fetch data for ${supplier}:`, error);
      }
      // console.log(isRealTime);
    }
  };

  const fetchDataHistory = async () => {
    const fetchedCpuDataCopy = { ...fetchedCpuData };
    const fetchedMemoryDataCopy = { ...fetchedMemoryData };
    const fetchedInTrafficDataCopy = { ...fetchedInTrafficData };
    const fetchedOutTrafficDataCopy = { ...fetchedOutTrafficData };

    for (const supplier of suppliers) {
      const supplierWithCloud = supplier + "Cloud";
      let url = `http://localhost:8496/${supplierWithCloud}/GetMetricsFromDB?MachineType=${type}&Location=${location}`;

      try {
        const response = await fetch(url);
        const json = await response.json();

        const timeStamp = json.map((obj) => obj.timeStamp);
        const cpuPercentage = json.map((obj) => obj.percentageCPU);
        const memoryPercentage = json.map((obj) => obj.percentageMemory);
        const inTraffic = json.map((obj) => obj.incomingTraffic);
        const outTraffic = json.map((obj) => obj.outcomingTraffic);

        fetchedCpuDataCopy[supplier] = {
          timeStamp: timeStamp,
          data: cpuPercentage,
        };

        fetchedMemoryDataCopy[supplier] = {
          timeStamp: timeStamp,
          data: memoryPercentage,
        };

        fetchedInTrafficDataCopy[supplier] = {
          timeStamp: timeStamp,
          data: inTraffic,
        };

        fetchedOutTrafficDataCopy[supplier] = {
          timeStamp: timeStamp,
          data: outTraffic,
        };
        setFetchedCpuData(fetchedCpuDataCopy);
        setFetchedMemoryData(fetchedMemoryDataCopy);
        setFetchedInTrafficData(fetchedInTrafficDataCopy);
        setFetchedOutTrafficData(fetchedOutTrafficDataCopy);
      } catch (error) {
        console.error(`Failed to fetch data for ${supplier}:`, error);
      }
    }
  };

  useEffect(() => {
    setFilteredCpuData({});
    setFilteredMemoryData({});
    setFilteredInTrafficData({});
    setFilteredOutTrafficData({});
    setFilteredLabels([]);
  }, [isRealTime]);

  useEffect(() => {
    if (!isRealTime && startDate) {
      const labels = [];
      console.log(fetchedCpuData);

      Object.entries(fetchedCpuData).forEach(([supplier, supplierData]) => {
        const { timeStamp, data: supplierDataArray } = supplierData;

        console.log(startDate);
        const filteredTimeStamps = timeStamp.filter((timestamp) => {
          const timestampDate =
            new Date(timestamp).toISOString().split(".")[0] + "Z";
          const endDate = new Date(startDate);
          endDate.setHours(endDate.getHours() + 1); // Adding 4 hours to the start date
          const endDateFormatted = endDate.toISOString().split(".")[0] + "Z"; // Formatting the end date
          console.log(timestampDate);
          return (
            timestampDate >= startDate && timestampDate <= endDateFormatted
          );
        });

        filteredCpuData[supplier] = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return supplierDataArray[index];
        });

        const memoryDataArray = fetchedMemoryData[supplier]?.data || [];
        const filteredMemoryValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return memoryDataArray[index];
        });
        filteredMemoryData[supplier] = filteredMemoryValues;

        const inTrafficDataArray = fetchedInTrafficData[supplier]?.data || [];
        const filteredInTrafficValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return inTrafficDataArray[index];
        });
        filteredInTrafficData[supplier] = filteredInTrafficValues;

        const outTrafficDataArray = fetchedOutTrafficData[supplier]?.data || [];
        const filteredOutTrafficValues = filteredTimeStamps.map((timestamp) => {
          const index = timeStamp.indexOf(timestamp);
          return outTrafficDataArray[index];
        });
        filteredOutTrafficData[supplier] = filteredOutTrafficValues;

        labels.push(...filteredTimeStamps);
      });
      const uniqueLabels = Array.from(new Set(labels));

      const formattedLabels = uniqueLabels.map((timestamp) => {
        const date = new Date(timestamp);
        return date
          .toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })
          .replace(",", "");
      });

      setFilteredLabels(formattedLabels);
      console.log(filteredMemoryData);
    }
  }, [
    isRealTime,
    startDate,
    fetchedCpuData,
    fetchedMemoryData,
    fetchedInTrafficData,
    fetchedOutTrafficData,
  ]);

  const colors = ["#aa75b8", "#ff6384", "#36a2eb"]; // Add more colors as needed

  const cpuGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(filteredCpuData).map(
      ([supplier, supplierData], index) => {
        const color = colors[index % colors.length];
        return {
          label: supplier,
          data: supplierData,
          backgroundColor: color,
          borderColor: color,
          pointBorderColor: color,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
        };
      }
    ),
  };

  const memoryGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(filteredMemoryData).map(
      ([supplier, supplierData], index) => {
        const color = colors[index % colors.length];
        return {
          label: supplier,
          data: supplierData,
          backgroundColor: color,
          borderColor: color,
          pointBorderColor: color,
          fill: true,
          tension: 0.2,
          pointRadius: 2,
        };
      }
    ),
  };
  const inTrafficGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(filteredInTrafficData).map(
      ([supplier, supplierData], index) => {
        const color = colors[index % colors.length];
        return {
          label: supplier,
          data: supplierData,
          backgroundColor: color,
          borderColor: color,
          pointBorderColor: color,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
        };
      }
    ),
  };

  const outTrafficGraphData = {
    labels: filteredLabels,
    datasets: Object.entries(filteredOutTrafficData).map(
      ([supplier, supplierData], index) => {
        const color = colors[index % colors.length]; // Get color based on index
        return {
          label: supplier,
          data: supplierData,
          backgroundColor: color,
          borderColor: color,
          pointBorderColor: color,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
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
        color: "#474545",
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
          maxTicksLimit: 10,
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

  const handleDateChange = (start) => {
    setStartDate(start.toISOString().split(".")[0] + "Z");
    // setEndDate(end.toISOString().split(".")[0] + "Z");
    console.log(startDate);
    // console.log(endDate);
  };

  // const graphStyle = {
  //   display: "inline-block",
  //   border: "1px solid black",
  //   borderRadius: "5px",
  //   padding: "20px",
  //   marginTop: "40px",
  //   width: "2000px",
  //   height: "1000px",
  // };
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
        max: 100,
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
        max: 700,
        stepSize: 100,
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
        max: 2,
        stepSize: 0.4,
      },
    },
  };
  return (
    <div className="graphs">
      <h2>Results</h2>
      <p>Providers: {suppliers.join(", ")}</p>
      <p>Machine type: {type}</p>
      <p>Machine location: {location}</p>
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
