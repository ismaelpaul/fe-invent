import { useDispatch, useSelector } from 'react-redux';
import { selectIsSidebarOpen } from '../../../redux/features/sidebar/sidebarSlice';
import Card from '../../Card/Card';
import { GrFormClose } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import {
	getItems,
	selectItemID,
	SET_EDIT_ITEM_MODAL,
	updateItem,
} from '../../../redux/features/item/itemSlice';
import ItemForm from '../ItemForm/ItemForm';
import styles from './EditItemModal.module.scss';
import '../../../styles/buttons.scss';

const EditItemModal = () => {
	const itemEdit = useSelector((state) => state.item.item);

	const [item, setItem] = useState(itemEdit);
	const [itemImage, setItemImage] = useState('');
	const [imagePreview, setImagePreview] = useState(null);
	const [description, setDescription] = useState('');

	const isSidebarOpen = useSelector(selectIsSidebarOpen);
	const itemID = useSelector(selectItemID);

	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setItem({ ...item, [name]: value });
	};

	const handleImageChange = (e) => {
		setItemImage(e.target.files[0]);
		setImagePreview(URL.createObjectURL(e.target.files[0]));
	};

	useEffect(() => {
		setImagePreview(
			itemEdit && itemEdit.image ? `${itemEdit.image.filePath}` : null
		);

		setDescription(
			itemEdit && itemEdit.description ? itemEdit.description : ''
		);
	}, [itemEdit]);

	const saveItem = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', item?.name);
		formData.append('category', item?.category);
		formData.append('quantity', item?.quantity);
		formData.append('price', item?.price);
		formData.append('description', description);

		if (itemImage) {
			formData.append('image', itemImage);
		}

		await dispatch(updateItem({ itemID, formData }));
		await dispatch(SET_EDIT_ITEM_MODAL(false));
		await dispatch(getItems());
	};

	return (
		<div
			className={
				isSidebarOpen
					? `${styles.modal__background} ${styles.modal__sidebarOpen}`
					: `${styles.modal__background} ${styles.modal__sidebarClose}`
			}
		>
			<Card cardClass="add__item">
				<div className={styles.modal__header}>
					<h3>Edit item</h3>
					<div className={styles.modal__close}>
						<GrFormClose onClick={() => dispatch(SET_EDIT_ITEM_MODAL(false))} />
					</div>
				</div>
				<ItemForm
					item={item}
					itemImage={itemImage}
					imagePreview={imagePreview}
					description={description}
					setDescription={setDescription}
					handleInputChange={handleInputChange}
					handleImageChange={handleImageChange}
					saveItem={saveItem}
				/>
				<div className={styles.modal__buttons}>
					<button
						className="secondary-button"
						onClick={() => dispatch(SET_EDIT_ITEM_MODAL(false))}
					>
						Cancel
					</button>
					<button className="primary-button" type="submit" onClick={saveItem}>
						Update item
					</button>
				</div>
			</Card>
		</div>
	);
};

export default EditItemModal;
