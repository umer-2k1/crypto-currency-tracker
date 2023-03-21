import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { CryptoState } from '../Context/CryptoContext'
import {CoinList} from '../Config/coinApi'
import '../Style/CoinsTable.css'
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom'

const CoinsTable = () => {
const {currency, symbol} = CryptoState()
const[coinlist, setCoinList] = useState([])
const[search, setSearch] = useState("")
const[page, setPage] = useState(1)
const[totalPages, setTotalPages] = useState(null)

const itemPerPage = 15

let count = 0


const fetchCoinList = async()=>{
  const {data} = await axios.get(CoinList(currency))
  setCoinList(data)
  setTotalPages(data.length)
}
useEffect (()=>{
  fetchCoinList()
},[currency]);

const paginationHandler = ({selected}) =>{
  console.log(selected+1)
  setPage(selected+1)
  window.scroll(0,450)
}

function commas(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <>
      <div className="main-container">
      <h1>CryptoCurrency Prices</h1>

<div className="input-tag">
<input placeholder='Search for CryptoCurrency' onChange={(e)=>setSearch(e.target.value)} type="text" id="fname"/>
</div>

<div className="table-section">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Coins</th>
        <th>Price</th>
        <th>24th Change</th>
        <th>Market Cap</th>
        <th>Chart</th>
      </tr>
    </thead>

    <tbody>

    {coinlist.filter((elem)=>{
if (search =="") {
return elem
}
else if (elem.name.toLowerCase().includes(search.toLowerCase())
||elem.symbol.toLowerCase().includes(search.toLowerCase())) {
return elem
}
}).slice((page-1)*itemPerPage, (page-1)*itemPerPage+itemPerPage).map((elem,index)=>{


let profit = elem.price_change_percentage_24h >= 0
count++


return <>
<tr key={index}>
        {/* <td>{key+1}</td> */}
        <td data-label="#" >{count}</td>
<td data-label="Coins" className='product-img' >
<img src={elem.image}  alt="" />

<Link to={`/coins/${elem.id}`}>
<h6 id='coin-name'>{elem.name}
<sup style={{paddingLeft:"1rem" ,color: "#929D82",textTransform: "uppercase"}}> {elem.symbol}</sup>
</h6>
</Link>


</td>
        <td data-label="Price"  >{symbol}{commas(elem.current_price.toFixed(2))}</td>
        <td data-label="24th Change" style={{color: profit>0 ? "green": "red", fontWeight:'bold'}} > {profit && '+'}{elem.price_change_percentage_24h.toFixed(2)}%	</td>
        <td data-label="Market Cap" >{symbol}{" "}{commas(elem.market_cap.toString().slice(0,-6))}M</td>
        <td data-label="Chart" >Chart.js</td>
      </tr>



</>
})}





      
    </tbody>


  </table>
</div>






<ReactPaginate
breakLabel="..."
nextLabel="next >"
previousLabel="< previous"
onPageChange={paginationHandler}
pageRangeDisplayed={3}
// pageCount={10}
pageCount={Math.round(totalPages/itemPerPage)}
// pageCount={10}
marginPagesDisplayed = {2}
containerClassName= {"pagination"}
pageLinkClassName = {"page-link"}
previousLinkClassName = {"prevBtn"}
nextLinkClassName = {"nxtBtn"}
disabledClassName	= {"disabledPagination"}
activeClassName = {"activePagination"}
/>





      </div>
    </>
  )
}

export default CoinsTable
