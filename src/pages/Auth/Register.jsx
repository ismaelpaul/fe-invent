import styles from './auth.module.scss';
import { HiOutlineUserAdd } from 'react-icons/hi';
import Card from '../../components/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { validateEmail } from '../../utils/utils';
import { registerUser } from '../../utils/api';
import { useDispatch } from 'react-redux';
import {
	SET_LOGIN,
	SET_NAME,
} from '../../assets/redux/features/auth/authSlice';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialState = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [formData, setFormData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);

	const { name, email, password, confirmPassword } = formData;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const register = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			return toast.error('All fields are required.');
		}
		if (password.length < 6) {
			return toast.error('Passwords must be up to 6 characters.');
		}
		if (!validateEmail(email)) {
			return toast.error('Please enter a valid email.');
		}
		if (password !== confirmPassword) {
			return toast.error('Passwords do not match.');
		}

		const userData = {
			name,
			email,
			password,
		};

		setIsLoading(true);
		try {
			const data = await registerUser(userData);
			await dispatch(SET_LOGIN(true));
			await dispatch(SET_NAME(data.name));
			navigate('/dashboard');
			setIsLoading(false);
		} catch (error) {
			setIsLoading(true);
		}
	};

	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className={styles.formTop}>
						<HiOutlineUserAdd className={styles.icon} />
						<h2>Register</h2>
					</div>

					<form onSubmit={register}>
						<div className={styles.input}>
							<input
								type="text"
								placeholder="Name"
								required
								name="name"
								value={name}
								onChange={handleInputChange}
							/>
							<input
								type="email"
								placeholder="Email"
								required
								name="email"
								value={email}
								onChange={handleInputChange}
							/>
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
								value={password}
								onChange={handleInputChange}
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								required
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleInputChange}
							/>
						</div>

						<button className={styles.authButton} type="submit">
							Register
						</button>
					</form>
					<hr />
					<span className={styles.register}>
						Already have an account?
						<Link to="/login">
							<strong> Log in</strong>
						</Link>
					</span>
				</div>
			</Card>
		</div>
	);
};

export default Register;
