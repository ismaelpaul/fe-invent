import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		SET_SIDEBAR(state, action) {
			state.isOpen = action.payload;
		},
	},
});

export const { SET_SIDEBAR } = sidebarSlice.actions;

export const selectIsOpen = (state) => state.sidebar.isOpen;

export default sidebarSlice.reducer;
