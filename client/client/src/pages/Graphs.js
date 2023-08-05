import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Graphs.css";
import TimeSelection from "../components/TimeSelection";
import BannerImage from "../assets/graphsBack.png";
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
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
  Filler
);

const Graphs = () => {
  const { state } = useLocation();

  const type = state.type;
  const location = state.location;
  const suppliers = state.suppliers;

  const [isRealTime, setIsRealTime] = useState(true);
  const [isCustom, setIsCustom] = useState(false);
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
  const [lowestCpuSupplier, setLowestCpuSupplier] = useState("");
  const [lowestMemorySupplier, setLowestMemorySupplier] = useState("");
  const [highestInTrafficSupplier, setHighestInTrafficSupplier] = useState("");
  const [highestOutTrafficSupplier, setHighestOutTrafficSupplier] =
    useState("");
  const firstTimeRef = useRef(true);
  const [allSuppliersProcessed, setAllSuppliersProcessed] = useState(0);

  useEffect(() => {
    if (isRealTime) {
      fetchDataRealTime();
      const intervalId = setInterval(fetchDataRealTime, 60000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      firstTimeRef.current = true;
    }
  }, [isRealTime]);

  const setIsoTimestamp = () => {
    const now = new Date();
    let isoTimestamp;
    if (firstTimeRef.current) {
      const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
      isoTimestamp = fifteenMinutesAgo.toISOString().split(".")[0] + "Z";
      firstTimeRef.current = false;
    } else {
      const sixMinutesAgo = new Date(now.getTime() - 6 * 60 * 1000);
      isoTimestamp = sixMinutesAgo.toISOString().split(".")[0] + "Z";
    }
    return isoTimestamp;
  };

  const fetchDataRealTime = async () => {
    let isoTimestamp = setIsoTimestamp();
    console.log(isoTimestamp, firstTimeRef);
    setAllSuppliersProcessed(0);
    for (const supplier of suppliers) {
      setAllSuppliersProcessed((prev) => prev + 1);
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

        //TODO function
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
    }
  };

  useEffect(() => {
    if (allSuppliersProcessed === suppliers.length) {
      setLowestCpuSupplier(findLowestMetric(filteredCpuData));
      setLowestMemorySupplier(findLowestMetric(filteredMemoryData));
      setHighestInTrafficSupplier(findHighestMetric(filteredInTrafficData));
      setHighestOutTrafficSupplier(findHighestMetric(filteredOutTrafficData));
    }
  }, [
    allSuppliersProcessed,
    filteredCpuData,
    filteredMemoryData,
    filteredInTrafficData,
    filteredOutTrafficData,
  ]);

  const findLowestMetric = (metricsData) => {
    let lowestValue = Infinity;
    let lowestSupplier = "";
    for (const [supplier, data] of Object.entries(metricsData)) {
      if (data && data.length > 0) {
        console.log(supplier + data[data.length - 1]);
        const value = isRealTime
          ? data[data.length - 1]
          : calculateAverage(data);
        if (value < lowestValue) {
          lowestValue = value;
          lowestSupplier = supplier;
        }
      }
    }
    return lowestSupplier;
  };

  const findHighestMetric = (metricsData) => {
    let highestValue = -1;
    let highestSupplier = "";
    for (const [supplier, data] of Object.entries(metricsData)) {
      if (data && data.length > 0) {
        console.log(data[data.length - 1]);
        const value = isRealTime
          ? data[data.length - 1]
          : calculateAverage(data);
        if (value > highestValue) {
          highestValue = value;
          highestSupplier = supplier;
        }
      }
    }
    return highestSupplier;
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

  const calculateAverage = (data) => {
    if (data && data.length > 0) {
      const sum = data.reduce((accumulator, value) => accumulator + value, 0);
      return sum / data.length;
    }
    return 0;
  };

  useEffect(() => {
    if (!isRealTime && startDate && endDate) {
      fetchDataHistory();
      const labels = [];

      Object.entries(fetchedCpuData).forEach(([supplier, supplierData]) => {
        const { timeStamp } = supplierData;

        const filteredTimeStamps = filterTimeStamps(timeStamp, startDate);
        filteredCpuData[supplier] = filterDataByTimeStamps(
          timeStamp,
          fetchedCpuData,
          filteredTimeStamps,
          supplier
        );

        filteredMemoryData[supplier] = filterDataByTimeStamps(
          timeStamp,
          fetchedMemoryData,
          filteredTimeStamps,
          supplier
        );
        filteredInTrafficData[supplier] = filterDataByTimeStamps(
          timeStamp,
          fetchedInTrafficData,
          filteredTimeStamps,
          supplier
        );
        filteredOutTrafficData[supplier] = filterDataByTimeStamps(
          timeStamp,
          fetchedOutTrafficData,
          filteredTimeStamps,
          supplier
        );

        labels.push(...filteredTimeStamps);
      });
      const formattedLabels = getFormattedLabels(labels);
      setFilteredLabels(formattedLabels);

      setLowestCpuSupplier(findLowestMetric(filteredCpuData));
      setLowestMemorySupplier(findLowestMetric(filteredMemoryData));
      setHighestInTrafficSupplier(findHighestMetric(filteredInTrafficData));
      setHighestOutTrafficSupplier(findHighestMetric(filteredOutTrafficData));
    }
  }, [
    isRealTime,
    startDate,
    fetchedCpuData,
    fetchedMemoryData,
    fetchedInTrafficData,
    fetchedOutTrafficData,
  ]);

  const filterTimeStamps = (timeStamp, startDate) => {
    // console.log(startDate);
    const filteredTimeStamps = timeStamp.filter((timestamp) => {
    const timestampDate =
    new Date(timestamp).toISOString().split(".")[0] + "Z";
    const endDate = new Date(startDate);

      endDate.setHours(endDate.getHours() + 1);
      const endDateFormatted = endDate.toISOString().split(".")[0] + "Z";
      // console.log(timestampDate);
      return timestampDate >= startDate && timestampDate <= endDateFormatted;
    });
    return filteredTimeStamps;
  };

  const filterDataByTimeStamps = (
    timeStamp,
    dataArray,
    filteredTimeStamps,
    supplier
  ) => {
    const dataArr = dataArray[supplier]?.data || [];

    const filteredDataArray = filteredTimeStamps.map((timestamp) => {
      const index = timeStamp.indexOf(timestamp);
      return dataArr[index];
    });

    return filteredDataArray;
  };

  const getFormattedLabels = (labels) => {
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

    return formattedLabels;
  };

  const handleSelectChange = (value) => {
      setIsRealTime(value === 'real-time' ? true : false);
      setIsCustom(value === 'Custom' ? true : false )

      if(value ==='Last-Week') {
        //setStartDate(); set start date 1 week from now
      }
      else if(value ==='Last-Month'){
        //setStartDate();  set start date 1 month from now
      }
   
    setLowestCpuSupplier("");
    setLowestMemorySupplier("");
    setHighestInTrafficSupplier("");
    setHighestOutTrafficSupplier("");
  };

  const handleDateChange = (start,end) => {
    setStartDate(start.toISOString().split(".")[0] + "Z");
    setEndDate(end.toISOString().split(".")[0] + "Z");

    // console.log(startDate);
  };

  const colors = ["#5664d1", "#ad5769", "#3d9174"];

  const createGraphDataset = (data, colors, tension = 0.4, pointRadius = 2) => {
    return Object.entries(data).map(([supplier, supplierData], index) => {
      const color = colors[index % colors.length];
      return {
        label: supplier,
        data: supplierData,
        backgroundColor: color,
        borderColor: color,
        pointBorderColor: color,
        tension,
        pointRadius,
      };
    });
  };

  const cpuGraphData = {
    labels: filteredLabels,
    datasets: createGraphDataset(filteredCpuData, colors, 0.4, 2),
  };

  const memoryGraphData = {
    labels: filteredLabels,
    datasets: createGraphDataset(filteredMemoryData, colors, 0.2, 2),
  };

  const inTrafficGraphData = {
    labels: filteredLabels,
    datasets: createGraphDataset(filteredInTrafficData, colors, 0.4, 2),
  };

  const outTrafficGraphData = {
    labels: filteredLabels,
    datasets: createGraphDataset(filteredOutTrafficData, colors, 0.4, 2),
  };

  const options = {
    plugins: {
      legend: true,
      title: {
        display: true,
        color: "#474545",
        font: {
          family: "Tahoma",
          size: 20,
          lineHeight: 1.5,
        },
        padding: { top: 15, left: 0, right: 0, bottom: 15 },
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
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
        },
      },
    },
  };

  const getGraphOptions = (title, minValue, maxValue, data, stepSize) => {
    return {
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          text: title,
        },
      },
      scales: {
        ...options.scales,
        y: {
          ...options.scales.y,
          min: isRealTime
            ? minValue
            : Math.max(
                Math.floor(Math.min(...Object.values(data).flat()) - 10),
                0
              ),
          max: isRealTime
            ? maxValue
            : Math.floor(Math.max(...Object.values(data).flat()) + 10),
          stepSize,
        },
      },
    };
  };

  const cpuGraphOptions = getGraphOptions(
    "CPU Percentage",
    0,
    180,
    filteredCpuData,
    40
  );

  const memoryGraphOptions = getGraphOptions(
    "Memory Percentage",
    0,
    100,
    filteredMemoryData,
    10
  );

  const inTrafficGraphOptions = getGraphOptions(
    "Incoming Traffic Percentage",
    0,
    700,
    filteredInTrafficData,
    100
  );

  const outTrafficGraphOptions = getGraphOptions(
    "Outgoing Traffic Percentage",
    0,
    2,
    filteredOutTrafficData,
    0.2
  );
  useEffect(() => {
    console.log(filteredMemoryData);
  }, [filteredMemoryData]);
  return (
    <div className="graphs" style={{ backgroundImage: `url(${BannerImage})` }}>
      <h2>Results</h2>
      <p>Providers: {suppliers.join(", ")}</p>
      <p>Machine type: {type}</p>
      <p>Machine location: {location}</p>
      <TimeSelection
        onSelectChange={handleSelectChange}
        onDateChange={handleDateChange}
        isRealTime={isRealTime}
        isCustom ={isCustom}
      />
      <div className="button-container">
        <div>
          <Link to={"/Filter"}>
            <button className="changeButton">Edit selection</button>
          </Link>
        </div>
        <div>
          <Link to={"/ProvidersRank"}>
            <button className="changeButton">View Providers Rank</button>
          </Link>
        </div>
      </div>
      <div className="graph-row">
        <div className="graph-container">
          <div className="graph">
            <Line data={cpuGraphData} options={cpuGraphOptions} />
            {suppliers.length > 1 && lowestCpuSupplier && (
              <p>Best performance: {lowestCpuSupplier}</p>
            )}
          </div>
        </div>
        <div className="graph-container">
          <div className="graph">
            <Line data={memoryGraphData} options={memoryGraphOptions} />
            {suppliers.length > 1 && lowestMemorySupplier && (
              <p>Best performance: {lowestMemorySupplier}</p>
            )}
          </div>
        </div>
      </div>
      <div className="graph-row">
        <div className="graph-container">
          <div className="graph">
            <Line data={inTrafficGraphData} options={inTrafficGraphOptions} />
            {suppliers.length > 1 && highestInTrafficSupplier && (
              <p>Best performance: {highestInTrafficSupplier}</p>
            )}
          </div>
        </div>
        <div className="graph-container">
          <div className="graph">
            <Line data={outTrafficGraphData} options={outTrafficGraphOptions} />
            {suppliers.length > 1 && highestOutTrafficSupplier && (
              <p>Best performance: {highestOutTrafficSupplier}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
