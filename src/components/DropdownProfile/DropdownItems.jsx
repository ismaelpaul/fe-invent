import { NavLink } from 'react-router-dom';
import styles from './DropdownItems.module.scss';

const DropdownItems = ({ item }) => {
	return (
		<NavLink to={item.path}>
			<div className={styles.dropdownTitle}>
				<span>
					{item.icon && <div className={styles.icon}>{item.icon}</div>}
					{<div>{item.title}</div>}
				</span>
			</div>
		</NavLink>
	);
};

export default DropdownItems;
