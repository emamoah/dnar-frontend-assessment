import { Link } from 'react-router-dom';
import styles from './CoinNameCard.module.scss';

export default function CoinNameCard(props) {
  return (
    <Link to={`/coin/${props._id}`} className={styles.card}>
      {/* <img src="/#" alt="coin" /> */}
      <span className={styles.card__coin_symbol}>{props._id}</span>
      <span className={styles.card__coin_name}>{props._name}</span>
    </Link>
  );
}