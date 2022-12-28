import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../assets/redux/features/auth/authSlice';
import {
	getItems,
	selectIsOpenAddItemModal,
} from '../../assets/redux/features/item/itemSlice';
import AddItemModal from '../../components/Items/AddItemModal/AddItemModal';
import ItemsList from '../../components/Items/ItemsList/ItemsList';
import ItemsStats from '../../components/Items/ItemsStats/ItemsStats';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';

const Dashboard = () => {
	useRedirectLoggedOutUser('/login');

	const dispatch = useDispatch();

	const isLoggedIn = useSelector(selectIsLoggedIn);

	const isOpen = useSelector(selectIsOpenAddItemModal);

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
			{isOpen ? <AddItemModal /> : null}

			<ItemsStats items={items} />
			<ItemsList />
		</div>
	);
};

export default Dashboard;
