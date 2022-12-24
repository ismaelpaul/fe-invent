import styles from './AuthCard.module.scss';

const AuthCard = ({ children, cardClass }) => {
	return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default AuthCard;
