import styles from './Converter.module.scss';
import api from 'util/api';
import { useEffect, useRef, useState } from 'react';

export default function Converter() {
  const { data: coins } = api.useGet('/simple/supported_vs_currencies');
  const [coin, setCoin] = useState(null);
  const [currency, setCurrency] = useState(null);
  // const { data: coinData } = api.useGet(`/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);

  const coinSelect = useRef();
  const currencySelect = useRef();

  useEffect(() => {
    setCoin(coinSelect.current.value);
    setCurrency(currencySelect.current.value);
  });

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        Exchange
      </div>
      <div className={styles.container__select}>
        <select name="coin" id="coin" ref={coinSelect} onChange={(e) => setCoin(e.target.value)}>
          {coins?.map(coin => <option key={coin} value={coin}>{coin}</option>)}
        </select>
        <span>TO</span>
        <select name="currency" id="currency" ref={currencySelect} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">usd</option>
        </select>
      </div>
      <div className={styles.container__values}>
        <span>Sell</span>
        <span className={styles.container__values__number}>-</span>
        <span>Buy</span>
        <span className={styles.container__values__number}>-</span>
      </div>
      <p>1 {coin} = - {currency}</p>
    </div>
  );
}