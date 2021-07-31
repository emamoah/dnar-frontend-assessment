import Scrollable from 'components/Scrollable';
import styles from './InfoCard.module.scss';
import ic_web from './icons/web.svg';
import ic_reddit from './icons/reddit.svg';
import ic_github from './icons/github.svg';
import cx from 'util/shared/classnames';
import api from 'util/api';

export default function InfoCard(props) {
  const coin_id = props._id;
  const { isPending, data, error } = api.useGet(`/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);

  return (
    <div className={styles.card}>
      <div className={styles.card__section}>
        <p className={styles.card__section__heading}>About</p>
        <div className={styles.card__description}>
          <p className={styles.card__section__heading}>Description</p>
          <Scrollable className={styles.card__description__text}>
            <p dangerouslySetInnerHTML={{__html:
              (!isPending && error)
              ? 'Error fetching data.'
              : isPending
                ? 'Loading description...'
                : data?.description.en || 'No description available.'
            }}>
            </p>
          </Scrollable>
        </div>
      </div>
      <div className={styles.card__section}>
        <p className={styles.card__section__heading}>Links</p>
        <div className={styles.card__links}>
          <a href={data?.links.homepage[0]} rel="external nofollow noopener">
            <img src={ic_web} alt="website" />
          </a>
          <a href={data?.links.subreddit_url} rel="external nofollow noopener">
            <img src={ic_reddit} alt="reddit" />
          </a>
          <a href={data?.links.repos_url.github[0]} rel="external nofollow noopener">
            <img src={ic_github} alt="github" />
          </a>
        </div>
      </div>
      <div className={styles.card__section}>
        <p className={styles.card__section__heading}>Facts</p>
        <div className={styles.card__table}>
          <span className={styles.card__table__key}>Hashing Algorithm</span>
          <span className={styles.card__table__value}>{data?.hashing_algorithm || '-'}</span>
          <span className={styles.card__table__key}>Country of Origin</span>
          <span className={styles.card__table__value}>{data?.country_origin || '-'}</span>
          <span className={styles.card__table__key}>Category</span>
          <span className={styles.card__table__value}>{data?.categories[0] || '-'}</span>
        </div>
        <div className={styles.card__divider}></div>
        <div className={styles.card__table}>
          <span className={styles.card__table__key}>Total Supply</span>
          <span className={styles.card__table__value}>{data?.market_data.total_supply || '-'}</span>
          <span className={styles.card__table__key}>Max Supply</span>
          <span className={styles.card__table__value}>{data?.market_data.max_supply || '-'}</span>
          <span className={styles.card__table__key}>Circulating</span>
          <span className={styles.card__table__value}>{data?.market_data.circulating_supply || '-'}</span>
        </div>
        <div className={styles.card__divider}></div>
        <div className={styles.card__table}>
          <span className={styles.card__table__key}>Alexa rank</span>
          <span className={cx(styles.card__table__value, styles.card__table__alexa_rank)}>{data?.public_interest_stats.alexa_rank || '-'}</span>
        </div>
      </div>
    </div>
  );
}