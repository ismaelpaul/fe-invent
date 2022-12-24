import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUser } from '../../assets/redux/features/auth/authSlice';
import ProfileCard from '../../components/Cards/Profile/ProfileCard';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { BiMessageSquareEdit } from 'react-icons/bi';

import styles from './Profile.module.scss';

const Profile = () => {
	useRedirectLoggedOutUser();

	const user = useSelector(selectUser);

	return (
		<div className={styles.container}>
			<ProfileCard>
				<div className={styles.profile}>
					<img src={user.picture} alt="Profile" />

					<span className={styles.profile__info}>
						<p>
							<strong>Name:</strong> {user.name}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Phone number:</strong> {user.phone}
						</p>
						<p>
							<strong>Bio:</strong> {user.bio}
						</p>
						<hr />
						<Link to={'/update-profile'} className={styles.profile__edit}>
							<BiMessageSquareEdit className={styles.icon} />
							<span>
								<p>Edit Profile</p>
							</span>
						</Link>
					</span>
				</div>
			</ProfileCard>
		</div>
	);
};

export default Profile;
