import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addItem,
	SET_ADD_ITEM_MODAL,
} from '../../../redux/features/item/itemSlice';
import { selectIsSidebarOpen } from '../../../redux/features/sidebar/sidebarSlice';
import ItemForm from '../ItemForm/ItemForm';
import { GrFormClose } from 'react-icons/gr';
import Card from '../../Card/Card';
import styles from './AddItemModal.module.scss';
import '../../../styles/buttons.scss';

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

	const isSidebarOpen = useSelector(selectIsSidebarOpen);

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

		await dispatch(SET_ADD_ITEM_MODAL(false));
		await dispatch(addItem(formData));
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
			</Card>
		</div>
	);
};

export default AddItemModal;
