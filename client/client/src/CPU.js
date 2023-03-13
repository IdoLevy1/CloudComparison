import { Line } from 'react-chartjs-2';
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

const CPU = () => {
    const data = {
        labels:['11:25', '11:26', '11:27', '11:28', '11:29'],
        datasets:[{
          label:'CPU Percentage',
          data:[50, 20, 40, 60, 80, 100],
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
    <div className='CPU'>
    <h2>CPU percentage</h2>
  <div style = {
    {
      width: '400px',
      height: '300px',
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
 
export default CPU;