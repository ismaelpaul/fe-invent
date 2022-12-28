import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ItemForm.module.scss';

const ItemForm = ({
	item,
	itemImage,
	imagePreview,
	description,
	setDescription,
	handleInputChange,
	handleImageChange,
	saveItem,
}) => {
	return (
		<div>
			<form onSubmit={saveItem}>
				<div className={styles.card__image}>
					<label>Choose an image</label>
					<span>(Supported formats: .jpg, .jpeg, .png)</span>
					{imagePreview !== null ? (
						<div className={styles.image__preview}>
							<img src={imagePreview} alt="Item image" />
						</div>
					) : (
						<p>No image set for this product</p>
					)}
					<input
						type="file"
						name="image"
						onChange={(e) => handleImageChange(e)}
					/>
				</div>
				<div>
					<div className={styles.form__item}>
						<label>Item</label>
						<input
							type="text"
							placeholder="Enter item name"
							name="name"
							value={item?.name}
							onChange={handleInputChange}
						/>
					</div>
					<div className={styles.form__category}>
						<label>Category</label>
						<input
							type="text"
							placeholder="Enter category"
							name="category"
							value={item?.category}
							onChange={handleInputChange}
						/>
					</div>
					<div className={styles.form__price}>
						<label>Price</label>
						<input
							type="text"
							placeholder="Enter price"
							name="price"
							value={item?.price}
							onChange={handleInputChange}
						/>
					</div>
					<div className={styles.form__quantity}>
						<label>Quantity</label>
						<input
							type="text"
							placeholder="Enter quantity"
							name="quantity"
							value={item?.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className={styles.form__description}>
						<label>Description</label>
						<ReactQuill
							theme="snow"
							value={description}
							onChange={setDescription}
							modules={ItemForm.modules}
							formats={ItemForm.formats}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

ItemForm.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ align: [] }],
		[{ color: [] }, { background: [] }],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['clean'],
	],
};
ItemForm.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'color',
	'background',
	'list',
	'bullet',
	'indent',
	'link',
	'video',
	'image',
	'code-block',
	'align',
];

export default ItemForm;
