import { HiOutlineMail } from 'react-icons/hi';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPassword } from '../../utils/api';
import { validateEmail } from '../../utils/utils';
import AuthCard from '../../components/Cards/Auth/AuthCard';
import styles from './auth.module.scss';
import '../../styles/buttons.scss';

const Forgot = () => {
	const [email, setEmail] = useState('');

	const forgotPass = async (e) => {
		e.preventDefault();

		if (!email) {
			return toast.error('Please enter your email.');
		}
		if (!validateEmail(email)) {
			return toast.error('Please enter a valid email.');
		}

		const userData = {
			email,
		};

		await forgotPassword(userData);
		setEmail('');
	};

	return (
		<div className={`container ${styles.auth}`}>
			<AuthCard>
				<div className={styles.form}>
					<div className={styles.formTop}>
						<HiOutlineMail className={styles.icon} />
						<h2>Forgot Password?</h2>
					</div>

					<form onSubmit={forgotPass}>
						<div className={styles.input}>
							<input
								type="email"
								placeholder="Email"
								// required
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<button
							className={`${styles.authButton} primary-button`}
							type="submit"
						>
							Send Reset Link
						</button>
					</form>
				</div>
			</AuthCard>
		</div>
	);
};

export default Forgot;
