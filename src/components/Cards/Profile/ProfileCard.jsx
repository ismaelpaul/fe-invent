import styles from './ProfileCard.module.scss';

const ProfileCard = ({ children, cardClass }) => {
	return (
		<div className={`${styles.profile__card} ${cardClass}`}>{children}</div>
	);
};

export default ProfileCard;
