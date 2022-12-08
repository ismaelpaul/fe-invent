import { RiLockPasswordLine } from 'react-icons/ri';
import styles from './auth.module.scss';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Reset = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className={styles.formTop}>
						<RiLockPasswordLine className={styles.icon} />
						<h2>Reset Password</h2>
					</div>

					<form>
						<div className={styles.input}>
							<input
								type="password"
								placeholder="New Password"
								required
								name="password"
							/>
							<input
								type="password"
								placeholder="Confirm New Password"
								required
								name="password"
							/>
						</div>

						<button className={styles.authButton} type="submit">
							Reset Password
						</button>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default Reset;
