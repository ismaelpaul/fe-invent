import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addItem,
	selectIsLoading,
	SET_ADD_ITEM_MODAL,
} from '../../../assets/redux/features/item/itemSlice';
import { selectIsOpen } from '../../../assets/redux/features/sidebar/sidebarSlice';
import ItemForm from '../ItemForm/ItemForm';
import { GrFormClose } from 'react-icons/gr';
import '../../../styles/buttons.scss';
import styles from './AddItemModal.module.scss';

const initialState = {
	name: '',
	category: '',
	quantity: '',
	price: '',
};

const AddItemModal = () => {
	const [item, setItem] = useState(initialState);
	const [itemImage, setItemImage] = useState('');
	const [imagePreview, setImagePreview] = useState(null);
	const [description, setDescription] = useState('');

	const isOpen = useSelector(selectIsOpen);

	const dispatch = useDispatch();

	const { name, category, quantity, price } = item;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setItem({ ...item, [name]: value });
	};

	const handleImageChange = (e) => {
		setItemImage(e.target.files[0]);
		setImagePreview(URL.createObjectURL(e.target.files[0]));
	};

	const generateSKU = (category) => {
		const letter = category.slice(0, 3).toUpperCase();
		const number = Date.now();
		const sku = letter + '-' + number;
		return sku;
	};

	const saveItem = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('sku', generateSKU(category));
		formData.append('category', category);
		formData.append('quantity', quantity);
		formData.append('price', price);
		formData.append('description', description);
		formData.append('image', itemImage);

		console.log(...formData);

		await dispatch(addItem(formData));
		await dispatch(SET_ADD_ITEM_MODAL(false));
	};
	return (
		<div
			className={
				isOpen
					? `${styles.modal__background} ${styles.modal__sidebarOpen}`
					: `${styles.modal__background} ${styles.modal__sidebarClose}`
			}
		>
			<div className={styles.modal__container}>
				<div className={styles.modal__header}>
					<h3>Add New Item</h3>
					<div className={styles.modal__close}>
						<GrFormClose onClick={() => dispatch(SET_ADD_ITEM_MODAL(false))} />
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
						onClick={() => dispatch(SET_ADD_ITEM_MODAL(false))}
					>
						Cancel
					</button>
					<button className="primary-button" type="submit" onClick={saveItem}>
						Save item
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddItemModal;
