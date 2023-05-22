import React from 'react';
import styles from './LoginAlertModal.module.scss';
import { useLocation, useNavigate } from 'react-router';

interface AlertModalProps {
	onClose: () => void;
}

function LoginAlertModal({ onClose }: AlertModalProps) {
	const url = useLocation().pathname;
	const navigate = useNavigate();
	const moveToLogin = () => {
		const state = { url };
		navigate('/login', { state });
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal}>
				<p>로그인이 필요한 서비스입니다. </p>
				<p>로그인 하시겠습니까?</p>
				<div className={styles.buttonContainer}>
					<button onClick={moveToLogin} type='button'>
						확인
					</button>
					<button onClick={onClose} type='button'>
						취소
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginAlertModal;
