import { Link } from 'react-router-dom';
import {
	ShowOnLogin,
	ShowOnLogout,
} from '../../components/protect/hiddenlinks';

const Home = () => {
	return (
		<div>
			<ul>
				<ShowOnLogout>
					<li>
						<Link to="/register">Register</Link>
					</li>

					<li>
						<button>
							<Link to="/login">Log in</Link>
						</button>
					</li>
				</ShowOnLogout>
				<ShowOnLogin>
					<li>
						<button>
							<Link to="/dashboard">Dashboard</Link>
						</button>
					</li>
				</ShowOnLogin>
			</ul>
		</div>
	);
};

export default Home;
