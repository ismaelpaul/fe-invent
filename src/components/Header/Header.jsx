import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUser,
	SET_USER,
} from '../../assets/redux/features/auth/authSlice';
import { getUser } from '../../utils/api';
import DropdownProfile from '../DropdownProfile/DropdownProfile';
import styles from './Header.module.scss';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		async function getUserData() {
			const data = await getUser();

			dispatch(SET_USER(data));
		}
		getUserData();
	}, [dispatch]);

	return (
		<div className={styles.header}>
			{isOpen ? (
				<></>
			) : (
				<img
					className={styles.imageCropperHeader}
					src={user.picture}
					alt="Rounded image representing the profile picture of the user"
				/>
			)}

			<div className={styles.text}>
				<p>
					Welcome,
					<strong> {user.name}</strong>
				</p>
			</div>
			<IoIosArrowDown
				className={
					isOpen
						? `${styles.icon} ${styles.iconRotateDown}`
						: `${styles.icon} ${styles.iconRotateUp}`
				}
				onClick={toggleDropdown}
			/>
			{isOpen && <DropdownProfile />}
		</div>
	);
};

export default Header;
