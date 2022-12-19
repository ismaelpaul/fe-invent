import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../../assets/redux/features/auth/authSlice';
import { logoutUser } from '../../utils/api';
import styles from './DropdownItems.module.scss';

const DropdownItems = ({ item, setIsOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = async () => {
		await logoutUser();
		dispatch(SET_LOGIN(false));
		navigate('/login');
	};
	return (
		<NavLink to={item.path} onClick={() => setIsOpen(false)}>
			<div className={styles.dropdownTitle}>
				<span>
					{item.icon && <div className={styles.icon}>{item.icon}</div>}

					{item.title}
				</span>
			</div>
		</NavLink>
	);
};

export default DropdownItems;
