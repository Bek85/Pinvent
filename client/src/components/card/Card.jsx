import styles from './Card.module.scss';

export default function Card({ children, cardClass }) {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
}
