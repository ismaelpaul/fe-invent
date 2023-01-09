import Footer from '../Footer/Footer';
import DashboardNav from '../Nav/DashboardNav/DashboardNav';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
	return (
		<>
			<DashboardNav />
			<section className={styles.children}>{children}</section>
			<Footer />
		</>
	);
};

export default Layout;
