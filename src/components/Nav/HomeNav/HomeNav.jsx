import { ShowOnLogin, ShowOnLogout } from '../../protect/hiddenlinks';
import { Link } from 'react-router-dom';
import { MdOutlineInventory2 } from 'react-icons/md';
import styles from './HomeNav.module.scss';
import '../../../styles/buttons.scss';

const HomeNav = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<MdOutlineInventory2 />
					<p>Invent</p>
				</div>
				<div>
					<ul>
						<ShowOnLogout>
							<li>
								<Link to="/register">Register</Link>
							</li>

							<li>
								<button className="primary-button-home">
									<Link to="/login">Log in</Link>
								</button>
							</li>
						</ShowOnLogout>
						<ShowOnLogin>
							<li>
								<button className="primary-button-home">
									<Link to="/dashboard">Dashboard</Link>
								</button>
							</li>
						</ShowOnLogin>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default HomeNav;
