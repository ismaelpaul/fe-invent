import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<section className={styles.children}>{children}</section>
			<Footer />
		</>
	);
};

export default Layout;
