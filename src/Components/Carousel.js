import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../Style/Carousel.css"
import { CryptoState } from '../Context/CryptoContext'
import {TrendingCoins} from '../Config/coinApi' 

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { Link } from 'react-router-dom'

// const  commas = (num)=>{
 function commas(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}
 

const Carousel = () => {
    
  const {currency, symbol} = CryptoState()
  
  const[trendingcoin, setTrendingcoin] = useState([])

  const fetchingTrendingCoins = async()=>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrendingcoin(data)
  }


  useEffect(() => {
    fetchingTrendingCoins()
 },[currency] );
 
//  console.log(trendingcoin)

const item = trendingcoin.map((element)=>{
  let profit = element.price_change_percentage_24h >= 0
  return <>
  <Link className="carouselItem" to ={`/coins/${element.id}`} >

<img src={element?.image} alt={element.name} />

<span className='coin-symbol'>
  {element.symbol}
  &nbsp;
  &nbsp;
  <span style={{color: profit>0 ? "green": "red", fontWeight:'bold'}} >
   {profit && '+'}{element.price_change_percentage_24h.toFixed(2)}%

  </span>
</span>

<div>
{symbol} {commas(element.current_price.toFixed(2))}
</div>

  </Link>
 
  </>
})


 const responsive ={
  0:{
    items:2,
  },
  512:{
    items:4,
  },
 }
  return (
    <>
     <div className="carousel-container">
   
     <AliceCarousel 
     autoPlayInterval = {1000}
     infinite
     mouseTracking
     animationDuration = {1000}
     responsive = {responsive}
     items= {item}
     autoPlay
     />
     </div>
    </>
  )
}

export default Carousel
