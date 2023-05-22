import React from 'react';
import useUserAlert from '../hooks/useUserAlert';
import styles from '../components/UserInfo/UserInfo.module.scss';
import Navigation from '../components/common/Navigation/Navigation';
import Logo from '../components/common/Logo/Logo';
import UserInfoDetail from '../components/UserInfo/UserInfoDetail';
import UserInfoButtons from '../components/UserInfo/UserInfoButtons';
import AlertModal from '../components/common/AlertModal/AlertModal';
import Header from '../components/common/Header/Header';

function UserInfo() {
	const { alertModal, handleCloseAlert, handleOpenAlert } = useUserAlert();
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	return (
		<>
			<Header title='마이페이지' />
			<Navigation />
			<main className={styles.container}>
				<Logo style={logoStyle} />
				<ul className={styles.info}>
					<UserInfoDetail openAlert={handleOpenAlert} />
					<UserInfoButtons openAlert={handleOpenAlert} />
				</ul>
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

export default UserInfo;
