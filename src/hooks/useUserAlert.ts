import { useState } from 'react';

function useUserAlert() {
	const initAlertModal = {
		isOpen: false,
		onClose: null as (() => void) | null,
		message: '',
	};
	const [alertModal, setAlertModal] = useState(initAlertModal);

	const handleOpenAlert = (message: string, onClose: null | (() => void)) => {
		setAlertModal({
			isOpen: true,
			onClose,
			message,
		});
	};

	const handleCloseAlert = () => {
		setAlertModal(prev => ({ ...prev, isOpen: false }));
	};

	return { alertModal, handleCloseAlert, handleOpenAlert };
}

export default useUserAlert;
