import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import {
	FILTER_ITEMS,
	selectFilteredItems,
} from '../../../assets/redux/features/item/filterSlice';
import { SET_ADD_ITEM_MODAL } from '../../../assets/redux/features/item/itemSlice';
import { SET_SIDEBAR } from '../../../assets/redux/features/sidebar/sidebarSlice';
import { shortenText } from '../../../utils/utils';
import Moment from 'react-moment';
import SearchItems from '../../SearchItems/SearchItems';
import styles from './ItemsList.module.scss';
import '../../../styles/buttons.scss';
import ReactPaginate from 'react-paginate';

const ItemsList = ({ items, isLoading }) => {
	const [search, setSearch] = useState('');
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;

	const filteredItems = useSelector(selectFilteredItems);

	const dispatch = useDispatch();

	const handleOpenModal = () => {
		dispatch(SET_ADD_ITEM_MODAL(true));
		dispatch(SET_SIDEBAR(false));
	};

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;

		setCurrentItems(filteredItems.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, filteredItems]);

	const handlePageClick = (e) => {
		const newOffset = (e.selected * itemsPerPage) % filteredItems.length;
		setItemOffset(newOffset);
	};

	useEffect(() => {
		dispatch(FILTER_ITEMS({ items, search }));
	}, [items, search]);

	return (
		<div className={styles.list__container}>
			<hr />
			<div className={styles.list__topSection}>
				<h3>Items List</h3>
				<SearchItems
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className="primary-button" onClick={handleOpenModal}>
					+ Add Item
				</button>
			</div>

			{isLoading && <PulseLoader />}
			<div className={styles.list__table}>
				{!isLoading && items.length === 0 ? (
					<p>No items found, please add an item.</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Number</th>
								<th>Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Value</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{currentItems.map((item, index) => {
								const { _id, name, category, price, quantity, createdAt } =
									item;
								return (
									<tr key={_id}>
										<td>{index + 1 + '.'}</td>
										<td>{shortenText(name, 15)}</td>
										<td>{category}</td>
										<td>
											{'£'}
											{price}
										</td>
										<td>{quantity}</td>
										<td>
											{'£'}
											{price * quantity}
										</td>
										<td>
											<Moment format="DD/MM/YY">{createdAt}</Moment>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
			<ReactPaginate
				breakLabel="..."
				nextLabel="Next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel="< Prev"
				renderOnZeroPageCount={null}
				containerClassName={styles.pagination}
				pageLinkClassName={styles.page__num}
				previousLinkClassName={styles.page__next__prev}
				nextLinkClassName={styles.page__next__prev}
				activeLinkClassName={styles.page__active}
				disabledClassName={styles.page__disabled}
				disabledLinkClassName={styles.page__disabled__link}
			/>
		</div>
	);
};

export default ItemsList;
