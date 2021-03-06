import styles from './Chart.module.scss';
import api from 'util/api';
import cx from 'util/shared/classnames';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip
} from 'recharts';

export default function Chart(props) {
  const coin_id = props._id;
  const { data } = api.useGet(`/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  const percentageChange24h = data?.market_data.price_change_percentage_24h;
  const isPositive = percentageChange24h > 0;
  const changeSign = isPositive ? '+' : '';

  const { data: chartData } = api.useGet(`/coins/${coin_id}/market_chart?vs_currency=usd&days=30&interval=daily`);

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <img src={data?.image.thumb} alt={data?.name} />
        <span className={styles.container__header__symbol}>{data?.name}</span>
        <span className={styles.container__header__price}>${data?.market_data.current_price.usd || '-'}</span>
        <span className={
          cx(styles.container__header__percent, {
            [styles['container__header__percent--positive']]: data && isPositive,
            [styles['container__header__percent--negative']]: data && !isPositive,
          })
        }>{data && changeSign}{percentageChange24h}%</span>
      </div>
      <div className={styles.container__chart}>
        <div className={styles.container__chart__content}>
          <ResponsiveContainer>
            <LineChart
              data={chartData?.prices.map(([date, Price]) => ({ date: new Date(date).toDateString(), Price: Price.toFixed(2) }))}
            >
              <CartesianGrid strokeDasharray="2 5" stroke="#B1AEB880" vertical={false} />
              <XAxis dataKey="date" stroke="#B1AEB880" />
              <YAxis stroke="#B1AEB880" />
              <Tooltip
                cursor={{ stroke: '#6800D6' }}
                itemStyle={{ backgroundColor: '#6800D6', color: '#FFFC' }}
                contentStyle={{
                  backgroundColor: '#6800D6',
                  color: '#FFFC',
                  border: 0,
                  borderRadius: '.3em',
                  padding: '.5em 1em',
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              />
              <Line type="monotone" dataKey="Price" stroke="#6800D6"></Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}