import React, { useRef, useEffect } from 'react';
import styles from './Style.module.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

function Modal({ isOpen, onClose, onEdit, onDelete }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	if (!isOpen) {
		return null;
	}

	return (
		<div
			ref={modalRef}
			className={styles.modal}
			onClick={event => event.stopPropagation()}
		>
			<button
				onClick={event => {
					event.stopPropagation();
					onEdit();
				}}
			>
				<HiOutlinePencil size={20} color='#9b97ff' />
				수정
			</button>
			<button
				onClick={event => {
					event.stopPropagation();
					onDelete();
				}}
			>
				<AiOutlineDelete size={20} color='#9b97ff' />
				삭제
			</button>
		</div>
	);
}

export default Modal;
