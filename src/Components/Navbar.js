import React from 'react'
import '../Style/Navbar.css'
import { CryptoState } from '../Context/CryptoContext'
const Navbar = () => {
  const {currency,setCurrency, symbol} = CryptoState()
  console.log(currency)
  console.log(symbol)
  return (
    <>
      <nav>
        <a className='logo'>CryptoCity</a>
        <select value={currency} onChange={(e)=> setCurrency(e.target.value)}>
          <option value={"USD"}>USD</option>
          <option value={"PKR"}>PKR</option>
        </select>
      </nav>
    </>
  )
}

export default Navbar
