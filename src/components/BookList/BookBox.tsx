import React, { useState, useEffect } from 'react';
import styles from './Style.module.scss';
import Modal from './BookListModal';
import { getWords } from '../../apis/book';
import { BsFileEarmarkWord } from 'react-icons/bs';
import { BiMessageSquareCheck, BiMessageSquareError } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { RiMore2Fill } from 'react-icons/ri';

interface BookBoxProps {
	book: any;
	handleEdit: () => void;
	handleDelete: () => void;
}

function BookBox({ book, handleEdit, handleDelete }: BookBoxProps) {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [wordCount, setWordCount] = useState(0);
	const [memorizedWordCount, setMemorizedWordCount] = useState(0);
	const [confusedWordCount, setConfusedWordCount] = useState(0);
	const userToken = useRecoilValue(userTokenState);

	useEffect(() => {
		const fetchWordCount = async () => {
			try {
				const response = await getWords(book.short_id, userToken);
				setWordCount(response.data.length);
				setMemorizedWordCount(
					response.data.filter((word: { status: number }) => word.status === 1)
						.length,
				);
				setConfusedWordCount(
					response.data.filter((word: { status: number }) => word.status === 2)
						.length,
				);
			} catch (error) {
				console.log(error);
			}
		};

		fetchWordCount();
	}, [book, userToken]);

	const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleBoxClick = () => {
		navigate(`/word/list/${book.short_id}`);
	};

	return (
		<div className={styles.box} onClick={handleBoxClick}>
			<div className={styles.topContainer}>
				<div className={styles.subContent}>
					{book.start_lang} / {book.end_lang}
				</div>
				<div onClick={handleMenuClick} className={styles.modalButton}>
					<RiMore2Fill size={24} color={'#736ef3'} />
				</div>
				<Modal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			</div>
			<div className={styles.wordTitle}>{book.name}</div>
			<div className={styles.wordButton}>
				<span className={styles.totalWord}>
					<button>
						<BsFileEarmarkWord size={20} color={'#736ef3'} />
					</button>
					{wordCount}
				</span>
				<span className={styles.memorizedWord}>
					<button>
						<BiMessageSquareCheck size={20} color={'#736ef3'} />
					</button>
					{memorizedWordCount}
				</span>
				<span className={styles.confusedWord}>
					<button>
						<BiMessageSquareError size={20} color={'#736ef3'} />
					</button>
					{confusedWordCount}
				</span>
			</div>
		</div>
	);
}

export default BookBox;
