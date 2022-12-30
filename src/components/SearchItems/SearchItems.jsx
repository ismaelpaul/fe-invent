import { BiSearch } from 'react-icons/bi';
import styles from './SearchItems.module.scss';

const SearchItems = ({ value, onChange }) => {
	return (
		<div className={styles.search}>
			<BiSearch className={styles.search__icon} />
			<input
				type="text"
				placeholder="Search items"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchItems;
