import { useContext, useLayoutEffect, useRef } from 'react';
import styles from './Scrollable.module.scss';
import cx from 'util/shared/classnames';
import { UIContext } from 'contexts/UIContext';

export default function Scrollable(props) {
  const container = useRef();
  const UI = useContext(UIContext);

  useLayoutEffect(() => {
    container.current.addEventListener('mouseenter', e => {
      e.target.classList.add(styles['container--active']);
    });
    container.current.addEventListener('mouseleave', e => {
      e.target.classList.remove(styles['container--active']);
    });
  }, []);

  return (
    <div
      {...props}
      className={cx(styles.container, props.className, styles[UI.breakpoint])}
      ref={container}
    >
      { props.children }
    </div>
  );
}