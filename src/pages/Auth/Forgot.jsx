import styles from './auth.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Forgot = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className={styles.formTop}>
						<HiOutlineMail className={styles.icon} />
						<h2>Forgot Password?</h2>
					</div>

					<form>
						<div className={styles.input}>
							<input type="email" placeholder="Email" required name="email" />
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
