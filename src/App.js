import "./App.css";
import React, { useState, useEffect } from "react";
import Coin from "./Coin.js";
import "./Coin.css";

// Axios is an HTTP client library based on promises.
// It makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations.
import axios from "axios";
const api =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=40&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  // promises in javascript
  // axios.get returns the object ni JSON format do no need to stringify that
  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => alert("There's an API_ERROR !!!"));
  }, [search]);

  function handleChange(e) {
    setSearch(e.target.value);
  }
  const filteredContent = coins.filter((ele) => {
    return ele.name.toLowerCase().includes(search.toLowerCase());
  });

  // root -> coin-app -> {coin-search ->{ h1 , form } , multiples 'coin-container' for all the coins } ->
  return (
    <>
      {/* <button style={{ backgroundColor: "red" }}>Filter result</button> */}
      <div class="dropdown">
        <button className="dropbtn">Filter Result</button>
        <div className="dropdown-content">
          <input
            placeholder="Total Records"
            className="drop-inpt"
            type="number"
          ></input>
          <br />
          <button className="drop-cnt" onClick={() => console.log("clicked")}>
            Price: High-To-Low
          </button>
          {/* <br /> */}
          <button className="drop-cnt">Price: Low-To-High</button>
          {/* <br /> */}
          <button className="drop-cnt">Volume: High-To-Low</button>
          {/* <br /> */}
          <button className="drop-cnt">Volume: Loww-To-High</button>
          {/* <br /> */}
          <button className="drop-cnt">PriceChange: High-To-Low</button>
          {/* <br /> */}
          <button className="drop-cnt">PriceChange: Low-To-High</button>
        </div>
      </div>

      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="coin-input"
              onChange={handleChange}
              value={search}
            />
          </form>
        </div>
        {filteredContent.map((coin) => {
          return (
            <Coin
              key={coin.id}
              naam={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
