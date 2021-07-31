import styles from './Chart.module.scss';
import api from 'util/api';
import cx from 'util/shared/classnames';

export default function Chart(props) {
  const coin_id = props._id;
  const { data } = api.useGet(`/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  const percentageChange24h = data?.market_data.price_change_percentage_24h;
  const isPositive = percentageChange24h > 0;
  const changeSign = isPositive ? '+' : '';

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
      <div className={styles.container__chart}></div>
    </div>
  );
}