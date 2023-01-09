import { Avatar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../assets/redux/features/auth/authSlice';
import ProfileCard from '../../components/Cards/Profile/ProfileCard';
import CropProfileImageModal from '../../components/CropProfileImageModal/CropProfileImageModal';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { updateUserProfile } from '../../utils/api';
import { GrFormClose } from 'react-icons/gr';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import '../../styles/buttons.scss';

const EditProfile = () => {
	useRedirectLoggedOutUser('/login');

	const navigate = useNavigate();
	const user = useSelector(selectUser);

	const inputImageRef = useRef();

	const triggerInputImage = () => {
		inputImageRef.current.click();
	};

	const { email } = user;

	useEffect(() => {
		if (!email) {
			navigate('/profile');
		}
	});
	const initialState = {
		name: user?.name,
		email: user?.email,
		phone: user?.phone,
		bio: user?.bio,
		picture: user?.picture,
	};

	const [profile, setProfile] = useState(initialState);
	const [profileImage, setProfileImage] = useState({
		img: null,
		zoom: 2,
		croppedImage: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	const handleImageChange = (e) => {
		let url = URL.createObjectURL(e.target.files[0]);
		setProfileImage({ ...profileImage, img: url });
	};

	const saveProfile = async (e) => {
		e.preventDefault();

		try {
			let imageURL;
			if (profileImage.croppedImage) {
				const image = new FormData();
				image.append('file', profileImage.croppedImage);
				image.append('cloud_name', 'dbm544gs6');
				image.append('upload_preset', 'or5lxeft');

				const response = await fetch(
					'https://api.cloudinary.com/v1_1/dbm544gs6/image/upload',
					{ method: 'post', body: image }
				);

				const imageData = await response.json();
				imageURL = imageData.url.toString();
			}

			const formData = {
				picture: profileImage.croppedImage ? imageURL : profile.picture,
				name: profile.name,
				phone: profile.phone,
				bio: profile.bio,
			};

			await updateUserProfile(formData);

			toast.success('Profile updated succesfully.');
			navigate('/profile');
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.container}>
			{profileImage.img !== null ? (
				<CropProfileImageModal
					profileImage={profileImage}
					setProfileImage={setProfileImage}
				/>
			) : (
				<ProfileCard>
					<div className={styles.profile__image}>
						<Avatar
							src={
								profileImage.croppedImage
									? profileImage.croppedImage
									: user.picture
							}
							alt="Profile"
							style={{ width: '100%', height: 'auto', margin: 'auto' }}
						/>
						<div
							className={styles.profile__image__edit}
							onClick={triggerInputImage}
						>
							<BiMessageSquareEdit />
							<p>Edit</p>
						</div>
					</div>
					<form onSubmit={saveProfile}>
						<input
							ref={inputImageRef}
							type="file"
							name="image"
							onChange={handleImageChange}
							style={{ display: 'none' }}
						/>

						<div className={styles.profile__info}>
							<Link to={'/profile'}>
								<GrFormClose className={styles.icon__close} />
							</Link>
							<div className={styles.profile__info__edit}>
								<label>Name</label>

								<input
									type="text"
									name="name"
									value={profile?.name}
									onChange={handleInputChange}
								/>
							</div>
							<div className={styles.profile__info__edit}>
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={profile?.email}
									disabled
								/>
								<p>Email can't be changed.</p>
							</div>
							<div className={styles.profile__info__edit}>
								<label>Phone number</label>
								<input
									type="text"
									name="phone"
									value={profile?.phone}
									onChange={handleInputChange}
								/>
							</div>
							<div className={styles.profile__info__edit}>
								<label>Bio</label>
								<textarea
									name="bio"
									value={profile?.bio}
									onChange={handleInputChange}
									cols="20"
									rows="5"
								/>
							</div>

							<button type="submit" className="primary-button">
								Save changes
							</button>
						</div>
					</form>
				</ProfileCard>
			)}
		</div>
	);
};

export default EditProfile;
