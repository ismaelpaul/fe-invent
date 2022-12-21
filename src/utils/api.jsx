import axios from 'axios';
import { toast } from 'react-hot-toast';

const inventApi = axios.create({
	baseURL: 'http://localhost:9090/api',
	headers: {
		'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
		'Content-Type': 'application/json',
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
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
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
		const message =
			(error.response && error.response.data && error.response.message) ||
			error.message ||
			error.toString();
		toast.error(message);
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
