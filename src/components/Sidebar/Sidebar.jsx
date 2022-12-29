import sidebar from '../../data/sidebar';
import styles from './Sidebar.module.scss';
import { MdOutlineInventory2 } from 'react-icons/md';
import { CgMenu } from 'react-icons/cg';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import {
	selectIsOpen,
	SET_SIDEBAR,
} from '../../assets/redux/features/sidebar/sidebarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpenAddItemModal } from '../../assets/redux/features/item/itemSlice';

const Sidebar = ({ children }) => {
	const dispatch = useDispatch();

	const isOpen = useSelector(selectIsOpen);
	const isAddItemModalOpen = useSelector(selectIsOpenAddItemModal);

	const toggleSidebar = () => dispatch(SET_SIDEBAR(!isOpen));
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/');
	};

	return (
		<div className={styles.layout}>
			<div
				className={
					isOpen
						? `${styles.sidebar}`
						: `${styles.sidebar} ${styles.sidebarClosed}`
				}
			>
				<div className={styles.topSection}>
					<div
						className={styles.logo}
						style={{ display: isOpen ? 'flex' : 'none' }}
					>
						<MdOutlineInventory2 onClick={goHome} />
						<p>Invent</p>
					</div>
					<div
						className={
							isOpen
								? `${styles.hamburguerIcon}`
								: `${styles.hamburguerIcon} ${styles.hamburguerIconClosed}`
						}
					>
						<CgMenu onClick={!isAddItemModalOpen ? toggleSidebar : null} />
					</div>
				</div>
				{sidebar.map((item, index) => {
					return <SidebarItem key={index} item={item} isOpen={isOpen} />;
				})}
			</div>

			<main>{children}</main>
		</div>
	);
};

export default Sidebar;
