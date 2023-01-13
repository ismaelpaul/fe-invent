import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import {
	FILTER_ITEMS,
	selectFilteredItems,
} from '../../../assets/redux/features/item/filterSlice';
import {
	SET_ADD_ITEM_MODAL,
	SET_ITEM_ID,
	SET_DELETE_ITEM_MODAL,
	SET_ITEM_DETAILS_MODAL,
	getItem,
} from '../../../assets/redux/features/item/itemSlice';
import { SET_SIDEBAR } from '../../../assets/redux/features/sidebar/sidebarSlice';
import { shortenText } from '../../../utils/utils';
import Moment from 'react-moment';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import SearchItems from '../../SearchItems/SearchItems';
import ReactPaginate from 'react-paginate';
import styles from './ItemsList.module.scss';
import '../../../styles/buttons.scss';

const ItemsList = ({ items, isLoading }) => {
	const [search, setSearch] = useState('');
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 10;

	const filteredItems = useSelector(selectFilteredItems);

	const dispatch = useDispatch();

	const handleClickOnRow = async (id) => {
		await dispatch(getItem(id));
		dispatch(SET_ITEM_DETAILS_MODAL(true));
		dispatch(SET_SIDEBAR(false));
	};

	const handleOpenAddItemModal = () => {
		dispatch(SET_ADD_ITEM_MODAL(true));
		dispatch(SET_SIDEBAR(false));
	};
	const handleOpenDeleteItemModal = (id) => {
		dispatch(SET_DELETE_ITEM_MODAL(true));
		dispatch(SET_SIDEBAR(false));
		dispatch(SET_ITEM_ID(id));
	};

	const handlePageClick = (e) => {
		const newOffset = (e.selected * itemsPerPage) % filteredItems.length;
		setItemOffset(newOffset);
	};

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;

		setCurrentItems(filteredItems.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, filteredItems]);

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
				<button className="primary-button" onClick={handleOpenAddItemModal}>
					+ Add Item
				</button>
			</div>

			{isLoading ? (
				<div className={styles.list__loader}>
					<PulseLoader />
				</div>
			) : (
				<div className={styles.list__table}>
					{!isLoading && items.length === 0 ? (
						<p>No items found, please add an item.</p>
					) : (
						<table>
							<thead>
								<tr className={styles.list__title}>
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
										<tr className={styles.list__info} key={_id}>
											<td onClick={() => handleClickOnRow(_id)}>
												{index + 1 + '.'}
											</td>
											<td onClick={() => handleClickOnRow(_id)}>
												{shortenText(name, 15)}
											</td>
											<td onClick={() => handleClickOnRow(_id)}>{category}</td>
											<td onClick={() => handleClickOnRow(_id)}>
												{'£'}
												{price}
											</td>
											<td onClick={() => handleClickOnRow(_id)}>{quantity}</td>
											<td onClick={() => handleClickOnRow(_id)}>
												{'£'}
												{price * quantity}
											</td>
											<td>
												<Moment format="DD/MM/YY" className={styles.list__date}>
													{createdAt}
												</Moment>
												<>
													<BiMessageSquareEdit className={styles.list__icons} />
													<BsTrash
														color="#fc0330"
														className={styles.list__icons}
														onClick={() => handleOpenDeleteItemModal(_id)}
													/>
												</>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</div>
			)}

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
