import React from 'react';
import { useParams } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import Header from '../common/Header/Header';
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
	const { wordId } = useParams();
	const editPage = location.pathname === `/word/edit/${wordId}`;
	const addPage = location.pathname === '/word/add';

	const rightComponentClassName = `${styles.submitBtn} ${
		words.word && (words.currMeaning.length || words.meaning)
			? styles.active
			: ''
	}`;
	return (
		<div>
			{addPage && (
				<Header
					title={
						<div className={styles.subTitle}>
							선택된 단어장
							{bookInfo.name ? (
								<div
									onClick={() => setShowModal(true)}
									className={styles.modalArrow}
								>
									<div className={styles.bookTitle}>
										{bookInfo.name}
										<div className={styles.modalBtn}>
											<IoIosArrowDropdownCircle className={styles.icon} />
										</div>
									</div>
								</div>
							) : null}
							{!bookInfo.name && (
								<p className={styles.bookTitle}>단어장을 만들어주세요!</p>
							)}
						</div>
					}
					rightComponent={
						<div onClick={handleSubmit} className={rightComponentClassName}>
							{'추가'}
						</div>
					}
				/>
			)}
			{editPage && (
				<Header
					title={'단어'}
					addGoBackButton={true}
					rightComponent={
						<div onClick={handleSubmit} className={rightComponentClassName}>
							{'수정'}
						</div>
					}
				/>
			)}
		</div>
	);
}

export default WordHeader;
