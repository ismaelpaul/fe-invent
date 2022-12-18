import { HiOutlineUser } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';

const dropdownProfile = [
	{
		title: 'Profile',
		icon: <HiOutlineUser />,
		path: '/profile',
	},

	{
		title: 'Log out',
		icon: <FiLogOut />,
		path: '/logout',
	},
];

export default dropdownProfile;
