import React, { Dispatch, SetStateAction } from 'react';
import styles from './WordForm.module.scss';
import { BsJournalBookmark } from 'react-icons/bs';

type Book = {
	name: string;
	start_lang: string;
	end_lang: string;
	short_id: string;
};

type BookListModalProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	bookList: Book[];
	bookInfo: {
		name: string;
		startLang: string;
		endLang: string;
		short_id: string;
	};
	setBookInfo: Dispatch<
		SetStateAction<{
			name: string;
			startLang: string;
			endLang: string;
			short_id: string;
		}>
	>;
};

function BookListModal({
	setShowModal,
	bookList,
	bookInfo,
	setBookInfo,
}: BookListModalProps) {
	return (
		<ul className={styles.modalBookList}>
			{bookList.map(({ name, start_lang, end_lang, short_id }, index) => (
				<li
					key={index}
					className={`${styles.modalBookItem} ${
						short_id === bookInfo.short_id ? styles.selected : ''
					}`}
					onClick={() => {
						setShowModal(false);
						setBookInfo({
							name,
							startLang: start_lang,
							endLang: end_lang,
							short_id,
						});
					}}
				>
					<div>
						<BsJournalBookmark className={styles.icon} />
					</div>
					{name}
				</li>
			))}
		</ul>
	);
}

export default BookListModal;
