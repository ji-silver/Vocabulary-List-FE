import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import useUserAlert from '../hooks/useUserAlert';
import styles from '../components/Login/Login.module.scss';
import Navigation from '../components/common/Navigation/Navigation';
import Logo from '../components/common/Logo/Logo';
import LoginForm from '../components/Login/LoginForm';
import AlertModal from '../components/common/AlertModal/AlertModal';
import Header from '../components/common/Header/Header';

function Login() {
	const userToken = useRecoilValue(userTokenState);
	const { alertModal, handleCloseAlert, handleOpenAlert } = useUserAlert();
	const navigate = useNavigate();
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	useEffect(() => {
		if (userToken) navigate('/user/info');
	}, []);

	return (
		<>
			<Header title={'로그인'} />
			<Navigation />
			<main className={styles.container}>
				<Logo style={logoStyle} />
				<LoginForm openAlert={handleOpenAlert} />
				{alertModal.isOpen && (
					<AlertModal
						isOpen={alertModal.isOpen}
						onClose={alertModal.onClose ? alertModal.onClose : handleCloseAlert}
						message={alertModal.message}
					/>
				)}
			</main>
		</>
	);
}

export default Login;
