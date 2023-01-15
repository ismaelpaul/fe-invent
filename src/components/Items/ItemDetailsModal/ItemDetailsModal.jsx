import { useDispatch, useSelector } from 'react-redux';
import { selectIsSidebarOpen } from '../../../redux/features/sidebar/sidebarSlice';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { SET_ITEM_DETAILS_MODAL } from '../../../redux/features/item/itemSlice';
import DOMPurify from 'dompurify';
import Moment from 'react-moment';
import { useState } from 'react';
import Card from '../../Card/Card';
import styles from './ItemDetailsModal.module.scss';

const ItemDetailsModal = () => {
	const [modalClassName, setModalClassName] = useState('item__details__open');

	const isSidebarOpen = useSelector(selectIsSidebarOpen);

	const { item } = useSelector((state) => state.item);

	const dispatch = useDispatch();

	const stockStatus = (quantity) => {
		if (quantity > 0) {
			return <span className={styles.item__in_stock}>In Stock</span>;
		}
		return <span className={styles.item__out_stock}>Out of Stock</span>;
	};

	const handleCloseModal = () => {
		setModalClassName('item__details__close');
		setTimeout(() => {
			dispatch(SET_ITEM_DETAILS_MODAL(false));
		}, 400);
	};
	return (
		<div
			className={
				isSidebarOpen
					? `${styles.item__modal__background} ${styles.modal__sidebarOpen}`
					: `${styles.item__modal__background} ${styles.modal__sidebarClose}`
			}
		>
			<Card cardClass={`item__details ${modalClassName}`}>
				<div className={styles.item__modal__header}>
					<div className={styles.modal__icon}>
						<HiArrowNarrowRight onClick={handleCloseModal} />
					</div>
					<h3>Item details</h3>
				</div>
				<div className={styles.item__info}>
					{item?.image ? (
						<div className={styles.item__img}>
							<img src={item.image.filePath} alt={item.image.fileName} />
						</div>
					) : (
						<p>No image set for this item.</p>
					)}
					<h4>Product Availability: {stockStatus(item.quantity)}</h4>
					<hr />
					<p>
						<span>Item:</span> {item.name}
					</p>
					<p>
						<span>SKU:</span> {item.sku}
					</p>
					<p>
						<span>Category:</span> {item.category}
					</p>
					<p>
						<span>Price:</span> {'£'}
						{item.price}
					</p>
					<p>
						<span>Quantity:</span> {item.quantity}
					</p>
					<p>
						<span>Total value:</span> {'£'}
						{item.price * item.quantity}
					</p>
					<p>
						<span>Description:</span>
					</p>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(item.description),
						}}
					></div>
					<hr />
					<p>
						<span>Created at:</span>{' '}
						<Moment format="DD/MM/YY">{item.createdAt}</Moment>
					</p>

					<p>
						<span>Last update:</span>{' '}
						<Moment format="DD/MM/YY">{item.updatedAt}</Moment>
					</p>
					<hr />
					<div className={styles.item__edit}>
						<BiMessageSquareEdit className={styles.icon} />
						<span>
							<p>Edit item</p>
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ItemDetailsModal;
