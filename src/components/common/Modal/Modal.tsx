import React, { ReactNode } from 'react';
import styles from './modal.module.scss';
import { RiCloseLine } from 'react-icons/ri';
import { relative } from 'path';

type ModalProps = {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	title: string;
	children?: ReactNode;
};

function Modal({ showModal, setShowModal, title, children }: ModalProps) {
	return (
		<>
			{showModal && (
				<div className={styles.modalBack}>
					<div className={styles.modalBox}>
						<div className={styles.modalHeader}>
							<span className={styles.title}>{title}</span>
							<button
								className={styles.closeBtn}
								onClick={() => setShowModal(false)}
							>
								<RiCloseLine className={styles.icon} />
							</button>
						</div>
						{children}
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
