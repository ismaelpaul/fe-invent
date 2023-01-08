import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../assets/redux/features/auth/authSlice';
import {
	getItems,
	selectIsOpenAddItemModal,
	selectIsOpenDeleteItemModal,
	selectisOpenItemDetailsModal,
} from '../../assets/redux/features/item/itemSlice';
import AddItemModal from '../../components/Items/AddItemModal/AddItemModal';
import DeleteItemModal from '../../components/Items/DeleteItemModal/DeleteItemModal';
import ItemDetailsModal from '../../components/Items/ItemDetailsModal/ItemDetailsModal';
import ItemsList from '../../components/Items/ItemsList/ItemsList';
import ItemsStats from '../../components/Items/ItemsStats/ItemsStats';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';

const Dashboard = () => {
	useRedirectLoggedOutUser('/login');

	const dispatch = useDispatch();

	const isLoggedIn = useSelector(selectIsLoggedIn);

	const isAddItemModalOpen = useSelector(selectIsOpenAddItemModal);
	const isDeleteModalOpen = useSelector(selectIsOpenDeleteItemModal);
	const isItemDetailsModalOpen = useSelector(selectisOpenItemDetailsModal);

	const { items, isLoading, isError, message } = useSelector(
		(state) => state.item
	);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(getItems());
		}

		if (isError) {
			toast.error(message);
		}
	}, [isLoggedIn, isError]);

	return (
		<div>
			{isAddItemModalOpen ? <AddItemModal /> : null}
			{isDeleteModalOpen ? <DeleteItemModal /> : null}
			{isItemDetailsModalOpen ? <ItemDetailsModal /> : null}

			<ItemsStats items={items} />
			<ItemsList items={items} isLoading={isLoading} />
		</div>
	);
};

export default Dashboard;
