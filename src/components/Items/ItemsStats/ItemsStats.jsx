import { BsCart, BsCartX } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import ItemsInfoCard from '../../Cards/ItemsInfoCard/ItemsInfoCard';
import styles from './ItemsStats.module.scss';

const cartIcon = <BsCart color="#6D1BE7" />;
const outOfStock = <BsCartX color="#FA3B3B" />;
const storeValueIcon = <MdAttachMoney color="#009764" />;

const ItemsStats = ({ items }) => {
	return (
		<div className={styles.itemsStats__container}>
			<h3>Items Stats</h3>
			<div className={styles.itemsStats__info}>
				<ItemsInfoCard
					iconBackgroundColor={styles.icon1}
					icon={cartIcon}
					title={'Total Items'}
					count={items.length}
				/>
				<ItemsInfoCard
					iconBackgroundColor={styles.icon2}
					icon={storeValueIcon}
					title={'Total Store Value'}
					count={0}
				/>
				<ItemsInfoCard
					iconBackgroundColor={styles.icon3}
					icon={outOfStock}
					title={'Items Out of Stock'}
					count={0}
				/>
			</div>
		</div>
	);
};

export default ItemsStats;
