import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { addNewItem, getAllItems } from '../../../../utils/api';

const initialState = {
	item: null,
	items: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

const addItem = createAsyncThunk(
	'products/create',
	async (newItem, thunkAPI) => {
		try {
			return await addNewItem(newItem);
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

const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		CALC_STORE_VALUE(state, action) {
			console.log('store value');
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
			});
	},
});

export const { CALC_STORE_VALUE } = itemSlice.actions;

export default itemSlice.reducer;
