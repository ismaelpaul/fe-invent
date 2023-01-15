import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSidebarOpen: false,
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		SET_SIDEBAR(state, action) {
			state.isSidebarOpen = action.payload;
		},
	},
});

export const { SET_SIDEBAR } = sidebarSlice.actions;

export const selectIsSidebarOpen = (state) => state.sidebar.isSidebarOpen;

export default sidebarSlice.reducer;
