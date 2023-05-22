import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdArrowBackIosNew } from 'react-icons/md';
import styles from './WordForm.module.scss';

type WordHeaderProps = {
	bookInfo: { name: string };
	words: {
		meaning: string;
		currMeaning: string[];
		word: string;
	};
	setShowModal: (show: boolean) => void;
	handleSubmit: () => void;
};

function WordHeader({
	bookInfo,
	setShowModal,
	words,
	handleSubmit,
}: WordHeaderProps) {
	const navigate = useNavigate();
	const { wordId } = useParams();
	const editPage = location.pathname === `/word/edit/${wordId}`;
	const addPage = location.pathname === '/word/add';
	return (
		<div className={styles.wordHeader}>
			{addPage ? (
				<span>
					<p>선택된 단어장</p>
					{bookInfo.name ? (
						<button
							onClick={() => setShowModal(true)}
							className={styles.modalArrow}
						>
							<h1 className={styles.bookTitle}>
								{bookInfo.name}
								<div>
									<IoIosArrowDropdownCircle className={styles.icon} />
								</div>
							</h1>
						</button>
					) : (
						<h1 className={styles.bookTitle}>단어장을 만들어주세요!</h1>
					)}
				</span>
			) : editPage ? (
				<div className={styles.editHeader}>
					<button className={styles.arrowBtn} onClick={() => navigate(-1)}>
						<MdArrowBackIosNew className={styles.icon} />
					</button>
					<h1 className={styles.bookTitle}>단어</h1>
				</div>
			) : null}

			<div
				className={`${styles.submitBtn} ${
					words.word && (words.currMeaning.length || words.meaning)
						? styles.active
						: ''
				}`}
				onClick={handleSubmit}
			>
				{addPage ? '추가' : editPage ? '수정' : null}
			</div>
		</div>
	);
}

export default WordHeader;
