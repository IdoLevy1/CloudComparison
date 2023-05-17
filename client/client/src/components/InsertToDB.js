import React, { useState, useEffect } from "react";
import AzureData from "../AzureData";
import GoogleData from "../GoogleData";
import Graphs from "../pages/Graphs";

const InsertToDB = () => {
  const [azureMachineData, setAzureMachineData] = useState([]);
  const [googleMachineData, setGoogleMachineData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAzureData();
      fetchGoogleData();
    }, 60000); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchAzureData = async () => {
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - 1 * 60 * 1000);

    for (const azureItem of AzureData) {
      const { SubscriptionId, ResourceGroupName, VirtualMachineName, ...rest } =
        azureItem;

      const azureData = {
        SubscriptionId: SubscriptionId,
        ResourceGroupName: ResourceGroupName,
        VirtualMachineName: VirtualMachineName,
        Timestamp: `${currentTime.toISOString().split(".")[0] + "Z"}/${
          startTime.toISOString().split(".")[0] + "Z"
        }`,
        ...rest,
      };

      console.log(azureData);
      let url = `http://localhost:8496/?ProjectId=${azureData.projectId}&InstanceId=${azureData.instanceId}&StartTime=${azureData.startTime}&EndTime=${azureData.endTime}`;
      for (const key in rest) {
        url += `&${key}=${rest[key]}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      const machineDataWithMetadata = {
        ...json,
        machineType: azureData.machineType, // Add machineType from azureData
        location: azureData.location, // Add location from azureData
      };

      setAzureMachineData((prevData) => [...prevData, machineDataWithMetadata]);
    }
  };

  const fetchGoogleData = async () => {
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - 1 * 60 * 1000);

    for (const googleItem of GoogleData) {
      const { ProjectId, InstanceId, ...rest } = googleItem;

      const googleData = {
        projectId: ProjectId,
        instanceId: InstanceId,
        startTime: `${currentTime.toISOString().split(".")[0] + "Z"}`,
        endTime: `${startTime.toISOString().split(".")[0] + "Z"}`,
        ...rest,
      };

      console.log(googleData);

      let url = `http://localhost:8496/?ProjectId=${googleData.projectId}&InstanceId=${googleData.instanceId}&StartTime=${googleData.startTime}&EndTime=${googleData.endTime}`;
      for (const key in rest) {
        url += `&${key}=${rest[key]}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      const machineDataWithMetadata = {
        ...json,
        machineType: googleData.machineType, // Add machineType from azureData
        location: googleData.location, // Add location from azureData
      };

      setAzureMachineData((prevData) => [...prevData, machineDataWithMetadata]);
    }
  };

  return (
    <div>
      <Graphs
        azureMachineData={azureMachineData}
        googleMachineData={googleMachineData}
      />
    </div>
  );
};

export default InsertToDB;
