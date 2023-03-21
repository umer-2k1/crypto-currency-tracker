import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { CryptoState } from '../Context/CryptoContext'
import {SingleCoin} from '../Config/coinApi'
import Chart from '../Components/Chart'
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
 import '../Style/Chart.css'

const CoinPage = () => {
  const { id } = useParams();
const {currency, symbol} = CryptoState()

    // useState
    const[coinInfo, setCoinInfo] = useState(null)
    
const fetchSingleCoin = async()=>{
    const {data} = await axios.get(SingleCoin(id))
    setCoinInfo(data)
  }
  useEffect (()=>{
    fetchSingleCoin()
  },[currency]);
  function commas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>

    <div id="main-container">

   { coinInfo&&  <div className="sidebar">


      <div className="coin-img">
        <img src={coinInfo.image.large} alt="" />  
    </div>

    <div className="coin-name">
    <h2>{coinInfo.name}</h2>
    </div>

    <div className="desc-coin">
    <p>{ReactHtmlParser(coinInfo.description.en.split(". ")[0]) }</p>
    </div>

    <div className="rank">
      <h2>Rank: {coinInfo.market_cap_rank}</h2>
    </div>

    <div className="current-prize">
      <h2>Current Price: {symbol}{" "}{commas(coinInfo.market_data.current_price[currency.toLowerCase()])}</h2>
    </div>

    <div className="market-cap">
      <h2>Market Cap: {symbol}{" "}{commas(coinInfo.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</h2>
    </div>

      </div>}


      <Chart coin = {coinInfo} />
    </div>

    </>
  )
}

export default CoinPage
