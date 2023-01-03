import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	selectUser,
	SET_USER,
} from '../../assets/redux/features/auth/authSlice';
import ProfileCard from '../../components/Cards/Profile/ProfileCard';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { getUser } from '../../utils/api';
import { Avatar } from '@mui/material';

const Profile = () => {
	useRedirectLoggedOutUser('/login');

	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getUserData() {
			const data = await getUser();

			dispatch(SET_USER(data));
		}
		getUserData();
	}, [user]);

	return (
		<div className={styles.container}>
			<ProfileCard>
				<div className={styles.profile__image}>
					<Avatar
						src={user.picture}
						alt="Profile"
						style={{ width: '100%', height: 'auto', margin: 'auto' }}
					/>
				</div>
				{/* <div className={styles.vl}></div> */}
				<div className={styles.profile__info}>
					<p>
						<span>Name:</span> {user.name}
					</p>
					<p>
						<span>Email:</span> {user.email}
					</p>
					<p>
						<span>Phone number:</span> {user.phone}
					</p>
					<p>
						<span>Bio:</span> {user.bio}
					</p>
					<hr />
					<Link to={'/update-profile'} className={styles.profile__edit}>
						<BiMessageSquareEdit className={styles.icon} />
						<span>
							<p>Edit Profile</p>
						</span>
					</Link>
					<Link to={'/update-profile'} className={styles.profile__edit}>
						<RiLockPasswordLine className={styles.icon} />
						<span>
							<p>Change Password</p>
						</span>
					</Link>
				</div>
			</ProfileCard>
		</div>
	);
};

export default Profile;
