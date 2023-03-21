import React from 'react'
import '../Style/Banner.css'
import Carousel from './Carousel';
const Banner = () => {
  const myStyle={
    backgroundImage: 
"url(./banner2.jpg)",
    height:'65vh',
    marginTop:'20px',
    fontFamily: 'Open Sans' || 'sans-serif',
    fontSize: '2rem',

    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',



};

  return (
    <>
      <div style={myStyle}>
        <div style={{display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',}} className="container">
    <h1 className='heading-txt'>CryptoCity</h1>
    <p className='info' >Get all the Info regarding your Favourite Crypto Currency</p>

        </div>
  
  <Carousel />

      </div>
    </>
  )
}

export default Banner
