import { useState } from 'react';
import sidebar from '../../data/sidebar';
import styles from './Sidebar.module.scss';
import { MdOutlineInventory2 } from 'react-icons/md';
import { CgMenu } from 'react-icons/cg';

const Sidebar = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => setIsOpen(!isOpen);

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
						<MdOutlineInventory2 />
						<p>Invent</p>
					</div>
					<div
						className={
							isOpen
								? `${styles.hamburguerIcon}`
								: `${styles.hamburguerIcon} ${styles.hamburguerIconClosed}`
						}
					>
						<CgMenu onClick={toggleSidebar} />
					</div>
				</div>
			</div>
			<main>{children}</main>
		</div>
	);
};

export default Sidebar;
