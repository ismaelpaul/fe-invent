import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';
import Home from './pages/Home/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<Forgot />} />
				<Route path="/reset-password/:resetToken" element={<Reset />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
