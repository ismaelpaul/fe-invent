import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<div className={styles.header}>
			<img
				className={styles.imageCropperHeader}
				src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
				alt="Rounded image representing the profile picture of the user"
			/>
			<div className={styles.text}>
				<p>
					Welcome,
					<strong> Ismael</strong>
				</p>
			</div>
			<IoIosArrowDown className={styles.icon} />
		</div>
	);
};

export default Header;
