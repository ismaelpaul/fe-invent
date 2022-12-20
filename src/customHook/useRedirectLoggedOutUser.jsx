import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../assets/redux/features/auth/authSlice';
import { getLoginStatus } from '../utils/api';
import { BsInfoCircle } from 'react-icons/bs';

const useRedirectLoggedOutUser = (path) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const redirectLoggedOutUser = async () => {
			const isLoggedIn = await getLoginStatus();
			dispatch(SET_LOGIN(isLoggedIn));

			if (!isLoggedIn) {
				toast('Session expired, please log in to continue.', {
					icon: <BsInfoCircle />,
				});
				navigate(path);
				return;
			}
		};
		redirectLoggedOutUser();
	}, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
