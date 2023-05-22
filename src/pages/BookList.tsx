import React, { useState, useEffect } from 'react';
import styles from '../components/BookList/Style.module.scss';
import AddButton from '../components/common/AddButton/AddButton';
import WordSearch from '../components/BookList/WordSearch';
import BookBox from '../components/BookList/BookBox';
import ConfirmModal from '../components/BookList/ConfirmModal';
import AlertModal from '../components/common/AlertModal/AlertModal';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation/Navigation';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';
import { getBooks, deleteBook } from '../apis/book';
import Header from '../components/common/Header/Header';

function BookList() {
	const userToken = useRecoilValue(userTokenState);
	const navigate = useNavigate();
	const [books, setBooks] = useState<any[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [bookToDelete, setBookToDelete] = useState('');
	const [alertModalOpen, setAlertModalOpen] = useState(false);
	const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await getBooks(userToken);
				const booksData = response.data;
				setBooks(booksData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchBooks();
	}, [userToken]);

	const handleEdit = (bookShortId: string) => {
		if (!userToken) {
			setLoginAlertModalOpen(true);
		} else {
			navigate(`/book/edit/${bookShortId}`);
		}
	};

	const handleDeleteRequest = (bookShortId: string) => {
		if (!userToken) {
			setLoginAlertModalOpen(true);
		} else {
			setBookToDelete(bookShortId);
			setDeleteModalOpen(true);
		}
	};

	const handleDeleteConfirm = async () => {
		try {
			await deleteBook(bookToDelete, userToken);
			setBooks(books.filter(book => book.short_id !== bookToDelete));
			setDeleteModalOpen(false);
			setAlertModalOpen(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header title={'단어장 리스트'} />
			<Navigation />
			<main>
				<WordSearch />
				<div className={styles.boxContainer}>
					{books.map(book => (
						<BookBox
							key={book.short_id}
							book={book}
							handleEdit={() => handleEdit(book.short_id)}
							handleDelete={() => handleDeleteRequest(book.short_id)}
						/>
					))}
				</div>
				<AddButton url={'/book/add'} />
				<ConfirmModal
					isOpen={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onConfirm={handleDeleteConfirm}
				/>
				<AlertModal
					isOpen={alertModalOpen}
					onClose={() => setAlertModalOpen(false)}
					message='삭제가 완료되었습니다.'
				/>
				{loginAlertModalOpen && (
					<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
				)}
			</main>
		</>
	);
}

export default BookList;
