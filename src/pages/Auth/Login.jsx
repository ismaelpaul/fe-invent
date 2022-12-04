import styles from './auth.module.scss';
import { FiLogIn } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div>
						<FiLogIn />
					</div>
					<h2>Log in</h2>
					<form>
						<div className={styles.email}>
							<label htmlFor="email">Email</label>
							<input type="email" placeholder="Email" required name="email" />
						</div>
						<div className={styles.password}>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								placeholder="Password"
								required
								name="Password"
							/>
						</div>
						<button type="submit">Log in</button>
					</form>
					<Link to="/forgot-password">Forgot password?</Link>
					<Link to="/register">Register</Link>
				</div>
			</Card>
		</div>
	);
};

export default Login;
