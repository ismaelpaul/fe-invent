import styles from './auth/auth.module.scss';
import { FiLogIn } from 'react-icons/fi';
import Card from '../../components/Card/Card';

const Login = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div>
						<FiLogIn />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Login;
