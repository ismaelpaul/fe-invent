import DashboardHeader from '../Headers/DashboardHeader/DashboardHeader';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
	return (
		<>
			<DashboardHeader />
			<section className={styles.children}>{children}</section>
			<Footer />
		</>
	);
};

export default Layout;
