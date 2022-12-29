import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUser,
	SET_USER,
} from '../../assets/redux/features/auth/authSlice';
import { getUser } from '../../utils/api';
import DropdownProfile from '../DropdownProfile/DropdownProfile';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from './Header.module.scss';
import { selectIsOpenAddItemModal } from '../../assets/redux/features/item/itemSlice';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const isAddItemModalOpen = useSelector(selectIsOpenAddItemModal);
	const user = useSelector(selectUser);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const closeDropdown = useOnclickOutside((e) => {
		if (!e.target.className.includes('ignoreOnOutsideClick')) {
			setIsOpen(false);
		}
	});

	useEffect(() => {
		async function getUserData() {
			const data = await getUser();

			dispatch(SET_USER(data));
		}
		getUserData();
	}, [dispatch]);

	return (
		<div className={styles.header}>
			<div className={styles.imageCropperHeader}>
				<img
					src={user.picture}
					alt="Rounded image representing the profile picture of the user"
				/>
			</div>

			<div className={styles.text}>
				<p>
					Welcome,
					<strong> {user.name}</strong>
				</p>
			</div>
			<IoIosArrowDown
				className={
					isOpen
						? `${styles.icon} ${styles.iconRotateDown} ${styles.ignoreOnOutsideClick}`
						: `${styles.icon} ${styles.iconRotateUp}`
				}
				onClick={!isAddItemModalOpen ? toggleDropdown : null}
			/>
			{isOpen && (
				<DropdownProfile closeDropdown={closeDropdown} setIsOpen={setIsOpen} />
			)}
		</div>
	);
};

export default Header;
