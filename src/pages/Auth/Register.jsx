import styles from './auth.module.scss';
import { HiOutlineUserAdd } from 'react-icons/hi';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className={styles.formTop}>
						<HiOutlineUserAdd className={styles.icon} />
						<h2>Register</h2>
					</div>

					<form>
						<div className={styles.input}>
							<input type="text" placeholder="Name" required name="name" />
							<input type="email" placeholder="Email" required name="email" />
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								required
								name="password"
							/>
						</div>

						<button className={styles.authButton} type="submit">
							Log in
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
