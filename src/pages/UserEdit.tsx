import React, { useState } from 'react';
import styles from '../components/UserEdit/UserEdit.module.scss';
import useUserAlert from '../hooks/useUserAlert';
import Navigation from '../components/common/Navigation/Navigation';
import Logo from '../components/common/Logo/Logo';
import UserEditForm from '../components/UserEdit/UserEditForm';
import UserDeleteForm from '../components/UserEdit/UserDeleteForm';
import AlertModal from '../components/common/AlertModal/AlertModal';
import ConfirmAlertModal from '../components/UserEdit/ConfirmAlertModal';
import Header from '../components/common/Header/Header';

function UserEdit() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const [enableDelete, setEnableDelete] = useState(false);
	const [confirmAlertModal, setConfirmAlertModal] = useState({
		isOpen: false,
		handleConfirm: () => {
			/* determined later */
		},
	});
	const { alertModal, handleCloseAlert, handleOpenAlert } = useUserAlert();

	return (
		<>
			<Header title='회원 정보 수정' addGoBackButton={true} />
			<Navigation />
			<main className={styles.container}>
				<Logo style={logoStyle} />
				{!enableDelete ? (
					<UserEditForm
						setEnableDelete={setEnableDelete}
						openAlert={handleOpenAlert}
					/>
				) : (
					<UserDeleteForm
						setEnableDelete={setEnableDelete}
						openAlert={handleOpenAlert}
						openConfirmAlert={(handleConfirm: () => void) =>
							setConfirmAlertModal({
								isOpen: true,
								handleConfirm,
							})
						}
					/>
				)}
				{alertModal.isOpen && (
					<AlertModal
						isOpen={alertModal.isOpen}
						onClose={alertModal.onClose ? alertModal.onClose : handleCloseAlert}
						message={alertModal.message}
					/>
				)}
				{confirmAlertModal.isOpen && (
					<ConfirmAlertModal
						onClose={() =>
							setConfirmAlertModal(prev => ({ ...prev, isOpen: false }))
						}
						onConfirm={confirmAlertModal.handleConfirm}
					/>
				)}
			</main>
		</>
	);
}

export default UserEdit;
