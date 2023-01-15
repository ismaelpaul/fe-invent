import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
	addNewItem,
	deleteItem,
	getAllItems,
	getSingleItem,
	updateSingleItem,
} from '../../../utils/api';

const initialState = {
	item: null,
	items: [],
	isAddItemModalOpen: false,
	isDeleteItemModalOpen: false,
	isItemDetailsModalOpen: false,
	isEditItemModalOpen: false,
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

export const getItem = createAsyncThunk(
	'products/getSingleItem',
	async (id, thunkAPI) => {
		try {
			return await getSingleItem(id);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const updateItem = createAsyncThunk(
	'products/updateItem',
	async (id, formData, thunkAPI) => {
		console.log(id, '<<< id slice');
		console.log(formData, '<<< formData slice');
		try {
			return await updateSingleItem(id, formData);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteSingleItem = createAsyncThunk(
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
			state.isAddItemModalOpen = action.payload;
		},
		SET_EDIT_ITEM_MODAL(state, action) {
			state.isEditItemModalOpen = action.payload;
		},
		SET_DELETE_ITEM_MODAL(state, action) {
			state.isDeleteItemModalOpen = action.payload;
		},
		SET_ITEM_DETAILS_MODAL(state, action) {
			state.isItemDetailsModalOpen = action.payload;
		},
		SET_ITEM_ID(state, action) {
			state.itemID = action.payload;
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
			.addCase(deleteSingleItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteSingleItem.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				toast.success('Item successfully deleted');
			})
			.addCase(deleteSingleItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(getItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.item = action.payload;
			})
			.addCase(getItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(updateItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateItem.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				toast.success('Item succesfully updated');
			})
			.addCase(updateItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			});
	},
});

export const {
	CALC_STORE_VALUE,
	CALC_OUT_OF_STOCK,
	SET_ADD_ITEM_MODAL,
	SET_EDIT_ITEM_MODAL,
	SET_DELETE_ITEM_MODAL,
	SET_ITEM_ID,
	SET_ITEM_DETAILS_MODAL,
} = itemSlice.actions;

export const selectIsLoading = (state) => state.item.isLoading;
export const selectIsOpenAddItemModal = (state) =>
	state.item.isAddItemModalOpen;
export const selectIsOpenEditItemModal = (state) =>
	state.item.isEditItemModalOpen;
export const selectIsOpenDeleteItemModal = (state) =>
	state.item.isDeleteItemModalOpen;
export const selectisOpenItemDetailsModal = (state) =>
	state.item.isItemDetailsModalOpen;
export const selectItemID = (state) => state.item.itemID;
export const selectTotalStoreValue = (state) => state.item.totalStoreValue;
export const selectItemsOutOfStock = (state) => state.item.totalItemsOutOfStock;

export default itemSlice.reducer;
