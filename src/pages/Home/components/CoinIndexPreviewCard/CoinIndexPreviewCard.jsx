import styles from './CoinIndexPreviewCard.module.scss';
import cx from 'util/shared/classnames';

export default function CoinIndexPreviewCard(props) {
  const percentageChange24h = props.data?.price_change_percentage_24h;
  const isPositive = percentageChange24h > 0;
  const changeSign = isPositive ? '+' : '';

  return (
    <a {...props} href={`/coin/${props.data.id}`} className={cx(styles.card, props.className)}>
      <span className={styles.card__coin_symbol}>{props.data.symbol}</span>
      <span className={styles.card__coin_name}>{props.data.name}</span>
      <div className={styles.card__mini_chart}></div>
      <span className={styles.card__coin_value}>${props.data.current_price}</span>
      <span className={cx(styles.card__coin_percentage, {
        [styles['card__coin_percentage--positive']]: isPositive,
        [styles['card__coin_percentage--negative']]: !isPositive,
      })}>{props.data && changeSign}{percentageChange24h}%</span>
    </a>
  );
}