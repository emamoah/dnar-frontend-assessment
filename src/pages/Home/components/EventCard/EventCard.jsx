import Scrollable from 'components/Scrollable';
import styles from './EventCard.module.scss';
import ic_calendar from './icons/calendar-blank.svg';
import ic_place from './icons/map-marker.svg';
import ic_open from './icons/open-in-new.svg';
import cx from 'util/shared/classnames';
import { useContext } from 'react';
import { UIContext } from 'contexts/UIContext';

export default function EventCard(props) {
  const UI = useContext(UIContext);

  const formatDate = str => new Date(str).toDateString().split(' ').splice(1).join(' ');

  return (
    <div className={cx(styles.card, styles[UI.breakpoint])}>
      <div className={styles.card__image}>
        <img src={props.screenshot} alt={props._title} />
        <a href={props.website} rel="external noopener nofollow" className={styles.card__image__overlay}>
          <img src={ic_open} alt="open" />
        </a>
      </div>
      <div className={styles.card__content}>
        <p className={styles.card__title}>{props._title}</p>
        <Scrollable className={styles.card__text}>
          <p>{props.description}</p>
        </Scrollable>
        <div className={styles.card__info}>
          <div className={styles.card__info__item}><img src={ic_calendar} alt="date" /><span>{formatDate(props.start_date)} - {formatDate(props.end_date)}</span></div>
          <div className={styles.card__info__item}><img src={ic_place} alt="venue" /><span>{props.venue}</span></div>
        </div>
      </div>
    </div>
  );
}