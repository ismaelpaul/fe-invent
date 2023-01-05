import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { addNewItem, deleteItem, getAllItems } from '../../../../utils/api';

const initialState = {
	item: null,
	items: [],
	isOpenModal: false,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	totalStoreValue: 0,
	itemsOutOfStock: 0,
};

export const addItem = createAsyncThunk(
	'products/create',
	async (formData, thunkAPI) => {
		try {
			return await addNewItem(formData);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getItems = createAsyncThunk(
	'products/getAll',
	async (_, thunkAPI) => {
		try {
			return await getAllItems();
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteItem = createAsyncThunk(
	'products/delete',
	async (id, thunkAPI) => {
		try {
			return await deleteItem(id);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		CALC_STORE_VALUE(state, action) {
			const items = action.payload;
			const allItemsValue = [];
			items.map((item) => {
				const { price, quantity } = item;
				const itemValue = price * quantity;
				return allItemsValue.push(itemValue);
			});
			const totalValue = allItemsValue.reduce((a, b) => {
				return a + b;
			}, 0);
			state.totalStoreValue = totalValue;
		},
		CALC_OUT_OF_STOCK(state, action) {
			const items = action.payload;
			const allItemsOutOfStock = [];
			items.filter((item) => {
				const { quantity } = item;
				if (quantity == 0) {
					return allItemsOutOfStock.push(quantity);
				}
			});

			const totalItems = allItemsOutOfStock.length;
			state.totalItemsOutOfStock = totalItems;
		},
		SET_ADD_ITEM_MODAL(state, action) {
			state.isOpenAddItemModal = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.items.push(action.payload);
				toast.success('Item added succesfully.');
			})
			.addCase(addItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(getItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.items = action.payload;
			})
			.addCase(getItems.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(deleteItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteItem.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				toast.success('Item successfully deleted');
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			});
	},
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, SET_ADD_ITEM_MODAL } =
	itemSlice.actions;

export const selectIsLoading = (state) => state.item.isLoading;
export const selectIsOpenAddItemModal = (state) =>
	state.item.isOpenAddItemModal;
export const selectTotalStoreValue = (state) => state.item.totalStoreValue;
export const selectItemsOutOfStock = (state) => state.item.totalItemsOutOfStock;
export default itemSlice.reducer;
