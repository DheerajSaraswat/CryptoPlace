import { useContext, useEffect, useState } from "react"
import "./Home.css"
import { CoinContext } from "../../context/CoinContext"
import {Link} from "react-router-dom"

function Home() {

  const {coins, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value)
    if(e.target.value === ''){
      setDisplayCoin(coins);
    }
  }

  const searchHandler = async (e)=>{
    e.preventDefault();
    const coin = await coins.filter( (item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    } )
    setDisplayCoin(coin);
  }

  useEffect( ()=>{
    setDisplayCoin(coins)
  }, [coins] )

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search Crypto..."
            value={input}
            onChange={inputHandler}
            list="coinlist"
            required
          />

          <datalist id="coinlist">
            {coins.map( (item, index)=>( <option key={index} value={item.name} /> ) )}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h Change</p>
          <p style={{ textAlign: "right" }} className="market-cap">
            Market Cap
          </p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="Coin Image" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>{currency.symbol + item.current_price.toLocaleString()}</p>
            <p
              style={{ textAlign: "center" }}
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p style={{ textAlign: "right" }} className="market-cap">
              {currency.symbol + item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Home