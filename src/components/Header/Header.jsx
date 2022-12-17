import { useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUser,
	SET_USER,
} from '../../assets/redux/features/auth/authSlice';
import { getUser } from '../../utils/api';
import styles from './Header.module.scss';

const Header = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useEffect(() => {
		async function getUserData() {
			const data = await getUser();

			dispatch(SET_USER(data));
		}
		getUserData();
	}, [dispatch]);

	return (
		<div className={styles.header}>
			<img
				className={styles.imageCropperHeader}
				src={user.picture}
				alt="Rounded image representing the profile picture of the user"
			/>
			<div className={styles.text}>
				<p>
					Welcome,
					<strong> {user.name}</strong>
				</p>
			</div>
			<IoIosArrowDown className={styles.icon} />
		</div>
	);
};

export default Header;
