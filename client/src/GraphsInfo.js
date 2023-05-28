import React, { useEffect, useState } from "react";
import CPU from "./CPU";
import Memory from "./Memory";
import Network from "./Network";

const GraphsInfo = (props) => {
  const { type } = props;
  const { location } = props;
  const { supplier } = props + "Cloud";

  const [labels, setLabels] = useState([]);
  const [cpuPercentages, setCpuPercentages] = useState([]);
  const [percentageMemory, setPercentageMemory] = useState([]);
  const [incomingTraffic, setIncomingTraffic] = useState([]);
  const [outcomingTraffic, setOutcomingTraffic] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8496/${supplier}/GetMetricsFromDB?machineType=${type}&location=${location}`
    );
    const json = await response.json();
    setLabels(json.TimeStamp);
    setCpuPercentages(json.PercentageCPU);
    setPercentageMemory(json.PercentageMemory);
    setIncomingTraffic(json.IncomingTraffic);
    setOutcomingTraffic(json.OutcomingTraffic);

    // setCpuPercentages(json.percentageList);
  };
  return (
    <div>
      {/* <CPU labels={labels} percentage={cpuPercentages} /> */}
      {/* <Memory labels={labels} percentage={percentageMemory} />
      <Network
        labels={labels}
        incomingTraffic={incomingTraffic}
        outcomingTraffic={outcomingTraffic}
      /> */}
      {/* <h9>The selected value is: {type}</h9>
      <h8> {location}</h8>
      <h9>{supplier}</h9> */}
    </div>
  );
};

export default GraphsInfo;