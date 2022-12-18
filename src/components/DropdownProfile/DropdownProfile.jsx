import { useSelector } from 'react-redux';
import { selectUser } from '../../assets/redux/features/auth/authSlice';
import dropdownProfile from '../../data/dropdownprofile';
import DropdownItems from './DropdownItems';
import styles from './DropdownProfile.module.scss';

const DropdownProfile = ({ setIsOpen, closeDropdown }) => {
	const user = useSelector(selectUser);

	return (
		<div ref={closeDropdown} className={styles.container}>
			<div className={styles.userInfo}>
				<img
					className={styles.imageCropper}
					src={user.picture}
					alt="Rounded image representing the profile picture of the user"
				/>
				<h3>{user.name}</h3>
				<p>{user.email}</p>
			</div>
			<div>
				{dropdownProfile.map((item, index) => {
					return (
						<>
							<hr />
							<DropdownItems key={index} item={item} setIsOpen={setIsOpen} />
						</>
					);
				})}
			</div>
		</div>
	);
};

export default DropdownProfile;
