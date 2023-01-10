import sidebar from '../../data/sidebar';
import styles from './Sidebar.module.scss';
import { MdOutlineInventory2 } from 'react-icons/md';
import { CgMenu } from 'react-icons/cg';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import {
	selectIsSidebarOpen,
	SET_SIDEBAR,
} from '../../assets/redux/features/sidebar/sidebarSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsOpenAddItemModal,
	selectisOpenItemDetailsModal,
} from '../../assets/redux/features/item/itemSlice';

const Sidebar = ({ children }) => {
	const dispatch = useDispatch();

	const isSidebarOpen = useSelector(selectIsSidebarOpen);
	const isAddItemModalOpen = useSelector(selectIsOpenAddItemModal);
	const isItemDetailsModalOpen = useSelector(selectisOpenItemDetailsModal);

	const toggleSidebar = () => dispatch(SET_SIDEBAR(!isSidebarOpen));
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/');
	};

	return (
		<div className={styles.layout}>
			<div
				className={
					isSidebarOpen
						? `${styles.sidebar}`
						: `${styles.sidebar} ${styles.sidebarClosed}`
				}
			>
				<div className={styles.topSection}>
					<div
						className={styles.logo}
						style={{ display: isSidebarOpen ? 'flex' : 'none' }}
					>
						<MdOutlineInventory2 onClick={goHome} />
						<p>Invent</p>
					</div>
					<div
						className={
							isSidebarOpen
								? `${styles.hamburguerIcon}`
								: `${styles.hamburguerIcon} ${styles.hamburguerIconClosed}`
						}
					>
						<CgMenu
							onClick={
								isAddItemModalOpen || isItemDetailsModalOpen
									? null
									: toggleSidebar
							}
						/>
					</div>
				</div>
				{sidebar.map((item, index) => {
					return (
						<SidebarItem
							key={index}
							item={item}
							isSidebarOpen={isSidebarOpen}
						/>
					);
				})}
			</div>

			<main>{children}</main>
		</div>
	);
};

export default Sidebar;
