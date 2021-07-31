import { UIContext } from 'contexts/UIContext';
import { useContext } from 'react';
import styles from './CoinInfo.module.scss';
import cx from 'util/shared/classnames';
import Chart from './components/Chart';
import Converter from './components/Converter';
import InfoCard from './components/InfoCard';
import Scrollable from 'components/Scrollable';
import ic_arrow_back from './icons/ic_arrow_back_24px.svg';

export default function CoinInfo(props) {
  const UI = useContext(UIContext);
  const coin_id = props.match.params.coin_id;

  return (
    <div className={cx(styles.page, styles[UI.breakpoint])}>
      <div className={cx(styles.page__nav, styles[UI.breakpoint])}>
        <button className={styles.page__nav__button} onClick={() => props.history.goBack()}>
          <img src={ic_arrow_back} alt="back arrow" />
          <span>BACK</span>
        </button>
      </div>
      <div className={cx(styles.page__section, styles['page__section--chart'])}>
        <Chart _id={coin_id} />
      </div>
      <div className={cx(styles.page__section, styles['page__section--converter'])}>
        <Converter _id={coin_id} />
      </div>
      <div className={cx(styles.page__section, styles['page__section--info_card'])}>
        <Scrollable className={styles.page__section__scroll_view}>
          <div className={styles.page__section__scroll_view__content}>
            <InfoCard _id={coin_id} />
          </div>
        </Scrollable>
      </div>
    </div>
  );
}