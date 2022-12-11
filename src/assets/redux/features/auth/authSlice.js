import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
	isLoggedIn: false,
	name: name ? name : '',
	user: {
		name: '',
		email: '',
		phone: '',
		bio: '',
		picture: '',
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin(state, action) {
			state.isLoggedIn = action.payload;
		},
		setName(state, action) {
			localStorage.setItem('name', JSON.stringify(action.payload));
			state.name = action.payload;
		},
		setUser(state, action) {
			const profile = action.payload;
			state.user.name = profile.name;
			state.user.email = profile.email;
			state.user.phone = profile.phone;
			state.user.bio = profile.bio;
			state.user.picture = profile.picture;
		},
	},
});

export const { setLogin, setName, setUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
