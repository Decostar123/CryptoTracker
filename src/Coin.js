import React, { useReducer } from "react";

// root -> coin-app -> coin-search , multiple 'coin-container' for all the coins
// coin-container -> coin-row -> {{ coin -> img , h1 , p } ,
//  { coin-data -> coin-price, coin-value, coin-percent, coin-market-cap} }

//toLocaleString gives language sensitive repredsent of data
// for example numbers with ',' or date with proper format of '/'
const ACTIONS = {
  OVER: "over",
  OUT: "out",
};
function reducer(arr, params) {
  console.log(params.ind);
  switch (params.type) {
    case ACTIONS.OVER:
      return arr.map((ele, ind) => {
        if (ind === params.ind) return true;
        return false;
      });

    case ACTIONS.OUT:
      return arr.map(() => false);
    default:
      return arr;
  }
}
function Coin({ image, naam, symbol, price, volume, priceChange, marketcap }) {
  // const [val, setVal] = useState(false);
  // const a = "";
  const [state, dispatch] = useReducer(reducer, [false, false, false, false]);
  // const brk = <br />;

  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{naam}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p
            className="coin-price"
            style={{ color: state[0] ? "orange" : "white" }}
            onMouseOver={() => dispatch({ type: ACTIONS.OVER, ind: 0 })}
            onMouseOut={() => dispatch({ type: ACTIONS.OUT })}
          >
            {state[0] ? "Price " : ""}
            {state[0] ? <br /> : ""}₹{price}
          </p>
          <p
            className="coin-value"
            style={{ color: state[1] ? "orange" : "white" }}
            onMouseOver={() => dispatch({ type: ACTIONS.OVER, ind: 1 })}
            onMouseOut={() => dispatch({ type: ACTIONS.OUT })}
          >
            {state[1] ? "Volume " : ""}
            {state[1] ? <br /> : ""}₹{volume.toLocaleString()}
          </p>

          {/* {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(3)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(3)}%</p>
          )} */}

          <p
            className="coin-percent"
            style={{
              color: state[2] ? "orange" : priceChange < 0 ? "red" : "green",
            }}
            onMouseOver={() => dispatch({ type: ACTIONS.OVER, ind: 2 })}
            onMouseOut={() => dispatch({ type: ACTIONS.OUT })}
          >
            {state[2] ? "PriceChange " : ""}
            {state[2] ? <br /> : ""}
            {priceChange.toFixed(3)}%
          </p>

          <p
            className="coin-marketcap"
            style={{ color: state[3] ? "orange" : "white" }}
            onMouseOver={() => dispatch({ type: ACTIONS.OVER, ind: 3 })}
            onMouseOut={() => dispatch({ type: ACTIONS.OUT })}
          >
            {state[3] ? `Mkt Cap` : ""}
            {state[3] ? <br /> : ""}₹{marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Coin;
