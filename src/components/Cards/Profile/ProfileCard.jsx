import styles from './ProfileCard.module.scss';

const ProfileCard = ({ children }) => {
	return <div className={styles.profile__card}>{children}</div>;
};

export default ProfileCard;
