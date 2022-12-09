import { FaTh } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const sidebar = [
	{
		title: 'Dashboard',
		icon: <FaTh />,
		path: '/dashboard',
	},

	{
		title: 'Contact Us',
		icon: <HiOutlineMail />,
		path: '/contact-us',
	},
];

export default sidebar;
