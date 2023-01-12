import { Link } from 'react-router-dom';
import HomeNav from '../../components/Nav/HomeNav/HomeNav';
import heroImg from '../../assets/inv-img.png';
import styles from './Home.module.scss';
import '../../styles/buttons.scss';

const Home = () => {
	return (
		<div className={styles.home}>
			<nav>
				<HomeNav />
			</nav>
			<section className={styles.home__container}>
				<header className={styles.home__hero_text}>
					<h2>Inventory {'&'} Stock Management Solution</h2>
					<p>
						Inventory system to control and manage proucts in the warehouse in
						real timeand integrated to make it easier to develop your business.
					</p>

					<button className="secondary-button-home">
						<Link to="/dashboard">Free Trial 1 Month</Link>
					</button>

					<div className={styles.home__numbers}>
						<NumberText num="14K" text="Brand Owners" />
						<NumberText num="23K" text="Active Users" />
						<NumberText num="500+" text="Partners" />
					</div>
				</header>
				<div className={styles.home__hero__img}>
					<img src={heroImg} alt="Inventory" />
				</div>
			</section>
		</div>
	);
};

const NumberText = ({ num, text }) => {
	return (
		<div className={styles.number__text}>
			<h3>{num}</h3>
			<p>{text}</p>
		</div>
	);
};

export default Home;
