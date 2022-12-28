import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import itemReducer from './features/item/itemSlice';
import sidebarReducer from './features/sidebar/sidebarSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		item: itemReducer,
		sidebar: sidebarReducer,
	},
});
