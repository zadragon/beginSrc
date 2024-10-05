import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [selectCoin, setSelectCoin] = useState("");
  const [calcCoin, setCalcCoin] = useState("");

  const onChangeMoney = (e) => {
    setMoney(e.target.value);
  };
  const onChangeCoin = (e) => {
    console.log(e.target.value);
    setSelectCoin(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const percent = money / selectCoin;

    setCalcCoin(1 * percent);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}

      <form onSubmit={onSubmit}>
        <label>코인을 선택해주세요.</label>
        <select onChange={onChangeCoin}>
          <option value={0}>코인을 선택해주세요.</option>
          {coins.map((item, index) => (
            <option key={index} value={item.quotes.USD.price}>
              {item.name} {item.symbol} (${item.quotes.USD.price})
            </option>
          ))}
        </select>
        <hr />
        <label>금액을 선택해주세요.</label>
        <div>
          <input type="number" value={money} onChange={onChangeMoney} />
          <button type="submit">달러 당 코인 계산</button>
        </div>
        <hr />
        {calcCoin && `${money}달러 당 ${calcCoin}개`}
      </form>
    </div>
  );
}

export default App;
