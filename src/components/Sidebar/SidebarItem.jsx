import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.scss';

const SidebarItem = ({ item, isOpen }) => {
	const activeSublink = ({ isActive }) => (isActive ? `${styles.active}` : '');

	return (
		<NavLink className={activeSublink} to={item.path}>
			<div className={styles.sidebarTitle}>
				<span>
					{item.icon && <div className={styles.icon}>{item.icon}</div>}
					{isOpen && <div>{item.title}</div>}
				</span>
			</div>
		</NavLink>
	);
};

export default SidebarItem;
