import axios from 'axios';
import { toast } from 'react-hot-toast';

const inventApi = axios.create({
	baseURL: 'https://be-invent-dxgx.onrender.com/api',
	headers: {
		'Access-Control-Allow-Origin': 'https://invent-app.netlify.app',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	},
	withCredentials: true,
	credentials: 'include',
});

export const registerUser = async (userData) => {
	try {
		const response = await inventApi.post('/user/register', userData);

		if (response.statusText === 'OK') {
			toast.success('User registered successfully!');
		}
		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};

export const loginUser = async (userData) => {
	try {
		const response = await inventApi.post('/user/login', userData);

		return response.data;
	} catch (error) {
		toast.error(error.response.data.message);
	}
};

export const logoutUser = async () => {
	try {
		await inventApi.get('/user/logout');
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};

export const getLoginStatus = async () => {
	try {
		const response = await inventApi.get('user/loggedin');

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};

export const forgotPassword = async (userData) => {
	try {
		const response = await inventApi.post('/user/forgot-password', userData);

		toast.success(response.data.message);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};

export const resetPassword = async (userData, resetToken) => {
	try {
		const response = await inventApi.put(
			`/user/reset-password/${resetToken}`,
			userData
		);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};

export const getUser = async () => {
	try {
		const response = await inventApi.get('/user/profile');

		return response.data;
	} catch (error) {
		toast.error(error.response.data.message);
	}
};

export const addNewItem = async (newItem) => {
	const response = await inventApi.post('/products', newItem);
	return response.data;
};

export const getAllItems = async () => {
	const response = await inventApi.get('/products');
	return response.data;
};

export const getSingleItem = async (id) => {
	const response = await inventApi.get(`/products/${id}`);
	return response.data;
};

export const updateSingleItem = async (id, formData) => {
	const response = await inventApi.patch(`/products/${id}`, formData);
	return response.data;
};

export const deleteItem = async (id) => {
	const response = await inventApi.delete(`/products/${id}`);
	return response.data;
};

export const updateUserProfile = async (formData) => {
	try {
		const response = await inventApi.patch('/user/update-profile', formData);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};

export const updatePassword = async (formData) => {
	try {
		const response = await inventApi.patch('/user/update-password', formData);

		return response.data;
	} catch (error) {
		toast.error(error.response.data.message);
	}
};

export const sendContactMessage = async (message) => {
	try {
		const response = await inventApi.post('/contact', message);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};
