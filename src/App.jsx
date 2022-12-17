import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import EditProfile from './pages/ Edit Profile/EditProfile';

function App() {
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
