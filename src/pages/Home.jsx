import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<button>
						<Link to="/login">Log in</Link>
					</button>
				</li>
				<li>
					<button>
						<Link to="/dashboard">Dashboard</Link>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Home;
