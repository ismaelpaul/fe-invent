import styles from './ItemsInfoCard.module.scss';

const ItemsInfoCard = ({ iconBackgroundColor, title, count, icon }) => {
	return (
		<div className={styles.info__card}>
			<span className={`${styles.info__iconBackground} ${iconBackgroundColor}`}>
				<span className={styles.info__icon}>{icon}</span>
			</span>
			<span className={styles.info__text}>
				<h4>{count}</h4>
				<p>{title}</p>
			</span>
		</div>
	);
};

export default ItemsInfoCard;
