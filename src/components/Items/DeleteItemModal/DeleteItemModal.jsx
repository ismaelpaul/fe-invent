import { useDispatch, useSelector } from 'react-redux';
import { selectIsSidebarOpen } from '../../../assets/redux/features/sidebar/sidebarSlice';
import { GrFormClose } from 'react-icons/gr';
import '../../../styles/buttons.scss';
import styles from './DeleteItemModal.module.scss';
import {
	deleteSingleItem,
	getItems,
	selectItemID,
	SET_DELETE_ITEM_MODAL,
} from '../../../assets/redux/features/item/itemSlice';
import Card from '../../Card/Card';

const DeleteItemModal = () => {
	const isSidebarOpen = useSelector(selectIsSidebarOpen);
	const itemID = useSelector(selectItemID);

	const dispatch = useDispatch();

	const handleDeleteItem = async (itemID) => {
		await dispatch(deleteSingleItem(itemID));
		await dispatch(getItems());
		await dispatch(SET_DELETE_ITEM_MODAL(false));
	};
	return (
		<div
			className={
				isSidebarOpen
					? `${styles.delete__modal__background} ${styles.modal__sidebarOpen}`
					: `${styles.delete__modal__background} ${styles.modal__sidebarClose}`
			}
		>
			<Card cardClass="delete__item">
				<div className={styles.delete__modal__header}>
					<h3>Delete item</h3>
					<div className={styles.delete__modal__close}>
						<GrFormClose
							onClick={() => dispatch(SET_DELETE_ITEM_MODAL(false))}
						/>
					</div>
				</div>
				<div className={styles.delete__modal__text}>
					<p>Are you sure that you want to delete this item?</p>
					<p>This is a non-reversible action.</p>
				</div>
				<div className={styles.delete__modal__buttons}>
					<button
						className="secondary-button"
						onClick={() => dispatch(SET_DELETE_ITEM_MODAL(false))}
					>
						Cancel
					</button>
					<button
						className="primary-button-delete"
						onClick={() => handleDeleteItem(itemID)}
					>
						Delete item
					</button>
				</div>
			</Card>
		</div>
	);
};

export default DeleteItemModal;
