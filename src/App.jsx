import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { SET_LOGIN } from './assets/redux/features/auth/authSlice';
import { useEffect } from 'react';
import { getLoginStatus } from './utils/api';
import EditProfile from './pages/Profile/EditProfile';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const loginStatus = async () => {
			const status = await getLoginStatus();
			dispatch(SET_LOGIN(status));
		};
		loginStatus();
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Toaster />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<Forgot />} />
				<Route path="/reset-password/:resetToken" element={<Reset />} />

				<Route
					path="/dashboard"
					element={
						<Sidebar>
							<Layout>
								<Dashboard />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/profile"
					element={
						<Sidebar>
							<Layout>
								<Profile />
							</Layout>
						</Sidebar>
					}
				></Route>
				<Route
					path="/update-profile"
					element={
						<Sidebar>
							<Layout>
								<EditProfile />
							</Layout>
						</Sidebar>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
