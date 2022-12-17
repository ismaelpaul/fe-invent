import { BiMessageSquareEdit } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

const dropdownProfile = [
	{
		title: 'Edit Profile',
		icon: <BiMessageSquareEdit />,
		path: '/update-profile',
	},

	{
		title: 'Log out',
		icon: <FiLogOut />,
		path: '/logout',
	},
];

export default dropdownProfile;
