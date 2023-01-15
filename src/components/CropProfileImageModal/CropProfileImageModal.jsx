import { Slider } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';

import Card from '../Card/Card';
import { selectIsSidebarOpen } from '../../redux/features/sidebar/sidebarSlice';
import { useSelector } from 'react-redux';
import styles from './CropProfileImageModal.module.scss';
import '../../styles/buttons.scss';

const CropProfileImageModal = ({ profileImage, setProfileImage }) => {
	const isSidebarOpen = useSelector(selectIsSidebarOpen);

	let editor = '';
	const handleSlider = (e, value) => {
		e.preventDefault();
		setProfileImage({
			...profileImage,
			zoom: value,
		});
	};

	const setEditorRef = (ed) => {
		editor = ed;
	};

	const handleCancel = () => {
		setProfileImage({ ...profileImage, img: null });
	};
	const handleSave = (e) => {
		e.preventDefault();
		if (setEditorRef) {
			const canvasScaled = editor.getImageScaledToCanvas();
			const croppedImage = canvasScaled.toDataURL();

			setProfileImage({
				...profileImage,
				img: null,

				croppedImage: croppedImage,
			});
		}
	};
	return (
		<div
			className={
				isSidebarOpen
					? `${styles.modal__background} ${styles.modal__sidebarOpen}`
					: `${styles.modal__background} ${styles.modal__sidebarClose}`
			}
		>
			<Card cardClass="crop__profile">
				<AvatarEditor
					className={styles.crop__avatar}
					ref={setEditorRef}
					image={profileImage.img}
					width={250}
					height={250}
					border={10}
					borderRadius={200}
					color={[108, 122, 137, 0.6]}
					rotate={0}
					scale={profileImage.zoom}
				/>
				<Slider
					aria-label="raceSlider"
					value={profileImage.zoom}
					min={1}
					max={3}
					step={0.1}
					onChange={handleSlider}
				></Slider>
				<div className={styles.buttons}>
					<button className="secondary-button" onClick={handleCancel}>
						Cancel
					</button>
					<button className="primary-button" onClick={handleSave}>
						Crop image
					</button>
				</div>
			</Card>
		</div>
	);
};

export default CropProfileImageModal;
