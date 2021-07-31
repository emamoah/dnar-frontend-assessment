import Scrollable from 'components/Scrollable';
import CoinIndexPreviewCard from './components/CoinIndexPreviewCard/CoinIndexPreviewCard';
import CoinNameCard from './components/CoinNameCard';
import EventCard from './components/EventCard';
import styles from './Home.module.scss';
import cx from 'util/shared/classnames';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { UIContext } from 'contexts/UIContext';
import api from 'util/api';
import ic_trend from './icons/ic_trending_up_24px.svg';
import ic_calendar from './icons/calendar-blank.svg';
import ic_coin from './icons/bitcoin.svg';

export default function Home(props) {
  const UI = useContext(UIContext);

  const { isPending:allCoinsIsPending, data:allCoins, error:allCoinsError } = api.useGet('/coins/list');
  const { isPending: marketLeadersIsPending, data: marketLeaders, error: marketLeadersError} = api.useGet('/coins/markets?vs_currency=usd&per_page=10&page=1&sparkline=false');
  const { isPending:eventsIsPending, data: events, error: eventsError} = api.useGet('/events');

  const marketLeadersSection = useRef();
  const allCoinsSection = useRef();
  const eventsSection = useRef();

  const [activeSection, setActiveSection] = useState(marketLeadersSection);

  const makeActive = (ref) => {
    if (activeSection !== ref) {
      activeSection.current.classList.remove(styles['home__section--active']);
      ref.current.classList.add(styles['home__section--active']);
      setActiveSection(ref);
    }
  }

  useLayoutEffect(() => {
    if (UI.breakpoint !== 'mobile') {
      marketLeadersSection.current.classList.add(styles['home__section--active']);
      allCoinsSection.current.classList.add(styles['home__section--active']);
      eventsSection.current.classList.add(styles['home__section--active']);
    }
  }, [UI.breakpoint]);

  return (
    <div className={cx(styles.home, styles[UI.breakpoint])}>
      <div className={cx(styles.home__mobile_nav, styles[UI.breakpoint])}>
        <Scrollable className={styles.home__mobile_nav__scroll_view}>
        <div className={cx(styles.home__mobile_nav__link, {[styles['home__mobile_nav__link--active']]: activeSection === marketLeadersSection})}
          onClick={() => makeActive(marketLeadersSection)}
        >
          <img src={ic_trend} alt="market leaders" />
          <span>Market Leaders</span>
        </div>
        <div className={cx(styles.home__mobile_nav__link, {[styles['home__mobile_nav__link--active']]: activeSection === allCoinsSection})}
          onClick={() => makeActive(allCoinsSection)}
        >
          <img src={ic_coin} alt="all coins" />
          <span>All coins</span>
        </div>
        <div className={cx(styles.home__mobile_nav__link, {[styles['home__mobile_nav__link--active']]: activeSection === eventsSection})}
          onClick={() => makeActive(eventsSection)}
        >
          <img src={ic_calendar} alt="events" />
          <span>Events</span>
        </div>
        </Scrollable>

      </div>
      <div ref={marketLeadersSection} className={cx(styles.home__section, styles.market_leaders, styles[UI.breakpoint], styles['home__section--active'])}>
        <span className={cx(styles.home__section__header, styles.market_leaders_header)}>
          Market Leaders
        </span>
        <div className={cx(styles.home__section__content, styles[UI.breakpoint])}>
          <Scrollable
            className={styles.home__section__content__scroll_view}
          >
            <div className={cx(styles.home__coin_index_preview_cards, styles[UI.breakpoint])}>
              {
                marketLeadersIsPending
                ? 'Loading market leaders...'
                : marketLeadersError
                  ? 'Error loading market leaders.'
                  : marketLeaders.map(leader => <CoinIndexPreviewCard key={leader.id} data={leader} className={styles.home__coin_index_preview_cards__card} />)
              }
            </div>
          </Scrollable>
        </div>
      </div>

      <div ref={allCoinsSection} className={cx(styles.home__section, styles.all_coins, styles[UI.breakpoint])}>
        <span className={styles.home__section__header}>
          All Coins
        </span>
        <div className={cx(styles.home__section__content, styles[UI.breakpoint])}>
          <Scrollable
            className={styles.home__section__content__scroll_view}
          >
            <div className={styles.home__all_coins}>
              {
                allCoinsIsPending
                ? 'Loading coins...'
                : allCoinsError
                  ? 'Error loading coins.'
                  : allCoins.map(coin => <CoinNameCard key={coin.id} _name={coin.name} symbol={coin.symbol} />)
              }
            </div>
          </Scrollable>
        </div>
      </div>

      <div ref={eventsSection} className={cx(styles.home__section, styles.events, styles[UI.breakpoint])}>
        <span className={styles.home__section__header}>
          Events
        </span>
        <div className={cx(styles.home__section__content, styles[UI.breakpoint])}>
          <Scrollable
            className={styles.home__section__content__scroll_view}
          >
            <div className={styles.home__event_cards}>
              {
                eventsIsPending
                ? 'Loading events...'
                : eventsError
                  ? 'Error loading events.'
                  : events.data.map(event =>
                    <EventCard
                      key={event.title}
                      _title={event.title}
                      screenshot={event.screenshot}
                      website={event.website}
                      description={event.description}
                      start_date={event.start_date}
                      end_date={event.end_date}
                      venue={event.venue}
                    />)
              }
            </div>
          </Scrollable>
        </div>
      </div>

    </div>
  );
}