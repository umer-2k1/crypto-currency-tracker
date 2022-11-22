import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { CryptoState } from '../Context/CryptoContext'
import {HistoricalChart} from '../Config/coinApi'
import '../Style/Chart.css'
import {chartDays} from '../Config/data'

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


import { useParams } from 'react-router-dom';
const Chart = ({coin}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  
  const { id } = useParams();  
const {currency, symbol} = CryptoState()

    // useState
const[historicData, setHistoricData] = useState()
const[days, setDays] = useState(1)
    
const fetchHistoricData = async()=>{
const {data} = await axios.get(HistoricalChart(id,days,currency))
    setHistoricData(data.prices)
  }
  useEffect (()=>{
    console.log(historicData)
    fetchHistoricData()
    console.log(id)
  },[currency, days]);
  function commas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
    { historicData&&  <div className="chart">
    

   <Line
  data={{
    labels: historicData.map((element)=>{
      let date = new Date(element[0])
      let time = date.getHours()>12 ?
      `${date.getHours()-12}:${date.getMinutes()} PM` :
      `${date.getHours()}:${date.getMinutes()} AM`
      return days===1 ? time : date.toLocaleDateString()
    }),

    datasets: [
      {data: historicData.map((value)=>value[1]),
      label: `Price (Past ${days} days) in ${currency}`,
      borderColor: "gold",
     
    },
    ],
  }}

  options={{
    elements:{
      point:{
        radius: 3,
      },
    }
  }}

  
/>
{/* selected ={val.value === days} */}
<div className="change-btn">
  {chartDays.map((val)=>(
    <a  
    style={{backgroundColor: val.value === days ? 'gold':'',color: val.value === days ? 'black':'', fontWeight: val.value === days ? '700':'500'}} 
    
    onClick={()=> setDays(val.value)} >{val.label}
    
    </a>

    ))}
</div>


</div>}
   
      
    </>
  )
}

export default Chart
