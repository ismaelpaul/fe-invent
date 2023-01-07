import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.scss';

const SidebarItem = ({ item, isSidebarOpen }) => {
	const activeSublink = ({ isActive }) => (isActive ? `${styles.active}` : '');

	return (
		<NavLink className={activeSublink} to={item.path}>
			<div className={styles.sidebarTitle}>
				<span>
					{item.icon && <div className={styles.icon}>{item.icon}</div>}
					{isSidebarOpen && <div>{item.title}</div>}
				</span>
			</div>
		</NavLink>
	);
};

export default SidebarItem;
