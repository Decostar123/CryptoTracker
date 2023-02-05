import "./App.css";
import React, { useState, useEffect } from "react";
import Coin from "./Coin.js";
import "./Coin.css";

// Axios is an HTTP client library based on promises.
// It makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations.
import axios from "axios";
let number = 15;

console.log(number);
const ACTION_TYPE = {
  NONE: "none",
  PLTOH: "price-low-to-high",
  PHTOL: "price-high-to-low",
  VLTOH: "volume-low-to-high",
  VHTOL: "volume-high-to-low",
  PCLTOH: "volume-low-to-high",
  PCHTOL: "volume-high-to-low",
  RCRD: "total-records",
};
// let api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${number}&page=1&sparkline=false`;
// function reducer(arr, params) {
//   switch (params.type) {
//     case ACTION_TYPE.PHTOL:
//       console.log("hi");
//       console.log(arr);
//       return arr.sort((ele1, ele2) => ele2.current_price - ele1.current_price);
//     default:
//       return arr;
//   }
// }
// const[ a , b ]  = useState(15) ;
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [dsply, setDisplay] = useState(false);
  const [arrange, setArrange] = useState({ type: ACTION_TYPE });
  const [nmbr, setNmbr] = useState(15);
  const [clr, setClr] = useState(true);
  // const [record, serRecord] = useState(15);
  switch (arrange.type) {
    case ACTION_TYPE.PLTOH:
      console.log("price low to high ");
      coins.sort((ele1, ele2) => ele1.current_price - ele2.current_price);
      break;
    case ACTION_TYPE.PHTOL:
      console.log("price high to low ");
      coins.sort((ele1, ele2) => ele2.current_price - ele1.current_price);
      break;
    case ACTION_TYPE.VLTOH:
      coins.sort((ele1, ele2) => ele1.total_volume - ele2.total_volume);
      break;
    case ACTION_TYPE.VHTOL:
      coins.sort((ele1, ele2) => ele2.total_volume - ele1.total_volume);
      break;
    case ACTION_TYPE.PCLTOH:
      console.log("price low to high ");
      coins.sort(
        (ele1, ele2) =>
          ele1.price_change_percentage_24h - ele2.price_change_percentage_24h
      );
      break;
    case ACTION_TYPE.PCHTOL:
      console.log("price high to ow ");
      coins.sort(
        (ele1, ele2) =>
          ele2.price_change_percentage_24h - ele1.price_change_percentage_24h
      );
      break;

    default:
      // coins = coins;
      console.log("default one ");
  }
  // const [state, dispatch] = useReducer(reducer, coins );

  // promises in javascript
  // axios.get returns the object ni JSON format do no need to stringify that
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${nmbr}&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => alert("There's an API_ERROR !!!"));
  }, [nmbr]);

  function handleChange(e) {
    setSearch(e.target.value);
  }
  // let filteredContent = [];
  // function recordShow() {
  const filteredContent = coins.filter((ele) => {
    return ele.name.toLowerCase().includes(search.toLowerCase());
  });
  // }
  // recordShow();
  // root -> coin-app -> {coin-search** ->{ h1 , form } , multiples 'coin-container' for all the coins } ->
  return (
    <>
      {/* <button style={{ backgroundColor: "red" }}>Filter result</button> */}
      <div className="title">
        <h1
          style={{ color: clr ? "white" : "orange" }}
          onMouseOver={() => setClr(false)}
          onMouseOut={() => setClr(true)}
        >
          <span style={{ color: clr ? "orange" : "white" }}>C</span>rypto
          <span style={{ color: clr ? "orange" : "white" }}> T</span>racker
        </h1>
      </div>
      <div className="coin-heading">
        <div className="coin-search">
          {/* <h1 className="coin-text">Search a currency</h1> */}
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

        <div
          class="dropdown"
          onClick={() => {
            console.log("in");
            return setDisplay(!dsply);
          }}
          onMouseOut={() => {
            return console.log("out");
            // return setDisplay(false);
          }}
        >
          <button className="dropbtn">Filter Result</button>
        </div>
      </div>

      <div style={{ display: dsply ? "block" : "none" }}>
        <div className="drop-input">
          <input
            className="drop-inpt"
            placeholder="Total Records"
            type="Number"
            onChange={(e) => {
              number = Number(e.target.value);
              // console.log(number);
              // api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${number}&page=1&sparkline=false`;

              // axios
              //   .get(api)
              //   .then((res) => {
              //     setCoins(res.data);
              //     console.log(res.data);
              //   })
              //   .catch((error) => alert("There's an API_ERROR !!!"));
              // // filteredContent = coins;
              // recordShow();
              setNmbr(number);
            }}
          />
        </div>
        <div className="drop-btn">
          <button
            className="drop-cnt"
            onClick={() => setArrange({ type: ACTION_TYPE.PHTOL })}
          >
            Price: High-To-Low
          </button>
          {/* <br /> */}
          <button
            className="drop-cnt"
            onClick={() => setArrange({ type: ACTION_TYPE.PLTOH })}
          >
            Price: Low-To-High
          </button>
          {/* <br /> */}
          <button
            className="drop-cnt"
            onClick={() => setArrange({ type: ACTION_TYPE.VHTOL })}
          >
            Volume: High-To-Low
          </button>
          {/* <br /> */}
          <button
            className="drop-cnt"
            onClick={() => setArrange({ type: ACTION_TYPE.VLTOH })}
          >
            Volume: Low-To-High
          </button>
          {/* <br /> */}
          <button
            className="drop-cnt"
            onClick={() => setArrange({ type: ACTION_TYPE.PCHTOL })}
          >
            PriceChange: High-To-Low
          </button>
          {/* <br /> */}
          <button
            className="drop-cnt"
            onClick={() => setArrange({ type: ACTION_TYPE.PCLTOH })}
          >
            PriceChange: Low-To-High
          </button>
        </div>
      </div>

      <div className="coin-app">
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
