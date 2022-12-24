import { RxDashboard } from 'react-icons/rx';
import { HiOutlineMail } from 'react-icons/hi';

const sidebar = [
	{
		title: 'Dashboard',
		icon: <RxDashboard />,
		path: '/dashboard',
	},

	{
		title: 'Contact',
		icon: <HiOutlineMail />,
		path: '/contact-us',
	},
];

export default sidebar;
