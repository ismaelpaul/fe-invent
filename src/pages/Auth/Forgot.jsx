import { HiOutlineMail } from 'react-icons/hi';
import Card from '../../components/Card/Card';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPassword } from '../../utils/api';
import styles from './auth.module.scss';
import { validateEmail } from '../../utils/utils';

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
			<Card>
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

						<button className={styles.authButton} type="submit">
							Send Reset Link
						</button>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default Forgot;
