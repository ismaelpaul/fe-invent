import styles from './ContactCard.module.scss';

const ContactCard = ({ children }) => {
	return <div className={`${styles.contact__card}`}>{children}</div>;
};

export default ContactCard;
