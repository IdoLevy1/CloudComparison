import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import{
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
}from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
)

const Memory = () => {
  const [labels, setLabels] = useState([]);
  const [cpuPercentages, setCpuPercentages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8496/AzureCloud/DBCpu');
      const json = await response.json();
      setLabels(json.timeStampList);
      setCpuPercentages(json.percentageList);
    };

    fetchData();
  }, []);

    const data = {
        labels: labels,
        datasets:[{
          label:'Azure Cloud',
          data:cpuPercentages,
            backgroundColor: '#2875b8',
            borderColor: '#2875b8',
            pointBorderColor: '#2875b8',
            fill: true,
            tension: 0.4
        }]
      }
    
      const options = {
        plugins:{
          legend: true
        },
        scales:{
          y:{
            min:0,
            max:100
          }
        }
      }
    return (
    <div className='Memory'>
    <h2>Memory</h2>
  <div style = {
    {
      width: '600px',
      height: '400px',
      padding: '20px'
    }
  }>
  <Line
  data = {data}
  options = {options}
  ></Line>
  </div>
  </div>  );
}
 
export default Memory;