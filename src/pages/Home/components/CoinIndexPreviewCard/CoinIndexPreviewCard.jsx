import styles from './CoinIndexPreviewCard.module.scss';
import cx from 'util/shared/classnames';
import api from 'util/api';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip
} from 'recharts';

export default function CoinIndexPreviewCard(props) {
  const coin_id = props.data.id;

  const percentageChange24h = props.data?.price_change_percentage_24h;
  const isPositive = percentageChange24h > 0;
  const changeSign = isPositive ? '+' : '';

  const { data: chartData } = api.useGet(`/coins/${coin_id}/market_chart?vs_currency=usd&days=10&interval=daily`);


  return (
    <a {...props} href={`/coin/${coin_id}`} className={cx(styles.card, props.className)}>
      <span className={styles.card__coin_symbol}>{props.data.symbol}</span>
      <span className={styles.card__coin_name}>{props.data.name}</span>
      <div className={styles.card__mini_chart}>
        <div className={styles.card__mini_chart__content}>
          <ResponsiveContainer>
            <LineChart
              data={chartData?.prices.map(([date, Price]) => ({ date: new Date(date).toDateString(), Price }))}
            >
              {/* <CartesianGrid strokeDasharray="2 5" stroke="#B1AEB880" vertical={false} /> */}
              {/* <XAxis dataKey="date" /> */}
              {/* <YAxis stroke="#B1AEB880" /> */}
              <Line type="linear" dataKey="Price" stroke="#FFFA"></Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <span className={styles.card__coin_value}>${props.data.current_price}</span>
      <span className={cx(styles.card__coin_percentage, {
        [styles['card__coin_percentage--positive']]: isPositive,
        [styles['card__coin_percentage--negative']]: !isPositive,
      })}>{props.data && changeSign}{percentageChange24h}%</span>
    </a>
  );
}