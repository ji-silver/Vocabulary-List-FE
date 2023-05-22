import React from 'react';
import styles from '../common/LoginAlertModal/LoginAlertModal.module.scss';

interface AlertModalProps {
	onClose: () => void;
	onConfirm: () => void;
}

function ConfirmAlertModal({ onClose, onConfirm }: AlertModalProps) {
	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal}>
				<p>정말 탈퇴하시겠습니까?😲</p>
				<div className={styles.buttonContainer}>
					<button onClick={onConfirm} type='button'>
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

export default ConfirmAlertModal;
