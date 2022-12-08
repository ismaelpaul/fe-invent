import styles from './auth.module.scss';
import { FiLogIn } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className={styles.formTop}>
						<FiLogIn className={styles.icon} />
						<h2>Log in</h2>
					</div>

					<form>
						<div className={styles.input}>
							<input type="email" placeholder="Email" required name="email" />
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
							/>
						</div>
						<span className={styles.forgotPassword}>
							<Link to="/forgot-password">
								<strong>Forgot password?</strong>
							</Link>
						</span>
						<button className={styles.authButton} type="submit">
							Log in
						</button>
					</form>
					<hr />
					<span className={styles.register}>
						Don't have an account yet?
						<Link to="/register">
							<strong> Register</strong>
						</Link>
					</span>
				</div>
			</Card>
		</div>
	);
};

export default Login;
