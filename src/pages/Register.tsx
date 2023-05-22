import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import useUserAlert from '../hooks/useUserAlert';
import styles from '../components/Register/Register.module.scss';
import Navigation from '../components/common/Navigation/Navigation';
import Logo from '../components/common/Logo/Logo';
import RegisterForm from '../components/Register/RegisterForm';
import AlertModal from '../components/common/AlertModal/AlertModal';
import Header from '../components/common/Header/Header';

function Register() {
	const userToken = useRecoilValue(userTokenState);
	const navigate = useNavigate();
	const { alertModal, handleCloseAlert, handleOpenAlert } = useUserAlert();

	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	useEffect(() => {
		if (userToken) navigate('/user/info');
	}, []);

	return (
		<>
			<Header title={'회원가입'} addGoBackButton={true} />
			<Navigation />
			<main className={styles.container}>
				<Logo style={logoStyle} />
				<RegisterForm openAlert={handleOpenAlert} />
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

export default Register;
