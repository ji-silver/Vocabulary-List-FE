/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { addedWord, selectedWord, updatedWord } from '../apis/word';
import { bookListAll, getBooks } from '../apis/book';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';

import Navigation from '../components/common/Navigation/Navigation';
import Header from '../components/common/Header/Header';
import WordHeader from '../components/WordForm/WordHeader';
import BookListModal from '../components/WordForm/BookListModal';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';
import AlertModal from '../components/common/AlertModal/AlertModal';
import WordFormDetail from '../components/WordForm/WordFormDetail';
import Modal from '../components/common/Modal/Modal';
import styles from '../components/WordForm/WordForm.module.scss';

function WordForm() {
	const { wordId } = useParams();
	const userToken = useRecoilValue(userTokenState);
	const editPage = location.pathname === `/word/edit/${wordId}`;
	const addPage = location.pathname === '/word/add';
	const bookIdLocation = useLocation();

	/** State */
	const [showModal, setShowModal] = useState(false);
	const [alertModalOpen, setAlertModalOpen] = useState(false);
	const [navigateBack, setNavigateBack] = useState(false);
	const [message, setMessage] = useState('');
	const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);
	const [bookList, setBookList] = useState([]);
	const [bookInfo, setBookInfo] = useState({
		name: '',
		startLang: '',
		endLang: '',
		short_id: '',
	});
	const [words, setWords] = useState({
		meaning: '',
		currMeaning: [] as string[],
		word: '',
	});
	const [bookId, setBookId] = useState('');

	/** API 연결 */
	type Book = {
		name: string;
		startLang: string;
		endLang: string;
		short_id: string;
	};

	// 단어장 가져오기 (로그인, 비로그인)
	const getBookList = async () => {
		try {
			const response = userToken
				? await bookListAll(userToken)
				: await getBooks();
			if (response.status === 200) {
				const bookLists = response.data;
				setBookList(bookLists);
				if (bookLists.length > 0) {
					// 해당 단어장에서 단어 추가 시 해당 단어장 선택되기 or nav 탭에서 단어 추가 시 첫번 째 단어장 선택되기
					// prettier-ignore
					const selectedBook = bookIdLocation.state
						? bookLists.find(
							(book: { short_id: string }) =>
								book.short_id === bookIdLocation.state.bookId,
						)
						: bookLists[0];
					if (selectedBook) {
						const { name, start_lang, end_lang, short_id } = selectedBook;
						setBookInfo({
							name,
							startLang: start_lang,
							endLang: end_lang,
							short_id,
						});
					}
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	// 단어 불러오기
	const getWords = async () => {
		try {
			if (!wordId) {
				return;
			}
			const response = await selectedWord(wordId, userToken);
			const { word, meanings, bookId } = response.data;
			if (response.status === 200) {
				setBookId(bookId);
				setWords(prevWords => ({
					...prevWords,
					word: word,
					currMeaning: meanings,
				}));
			}
		} catch (err) {
			console.log(err);
		}
	};

	// 단어 추가 및 수정
	const handleSubmit = async () => {
		if (!userToken) {
			setLoginAlertModalOpen(true);
			return;
		}

		if (!words.word || (!words.currMeaning.length && !words.meaning)) {
			setMessage('필드를 모두 입력해주세요');
			setAlertModalOpen(true);
			return;
		}

		// meaning 입력창에 값이 있을 경우 합치기
		const meanings = words.meaning
			? [words.meaning, ...words.currMeaning]
			: words.currMeaning;

		const addData = {
			word: words.word,
			meanings: meanings,
			bookId: bookInfo.short_id,
		};

		const editData = {
			word: words.word,
			meanings: meanings,
		};

		// 단어 추가 페이지
		if (addPage) {
			try {
				if (!bookInfo.name) {
					alert('단어장을 선택해주세요.');
					return;
				}
				const response = await addedWord(userToken, addData);
				if (response.status === 200) {
					setMessage(`[${words.word}] 단어 추가 완료`);
					setAlertModalOpen(true);
					setNavigateBack(false);
					setWords(prevWords => ({
						...prevWords,
						word: '',
						meaning: '',
						currMeaning: [],
					}));
				}
			} catch (err) {
				console.log(err);
			}
			// 단어 수정 페이지
		} else if (editPage) {
			try {
				if (!wordId) {
					return;
				}
				const response = await updatedWord(wordId, userToken, editData);
				if (response.status === 200) {
					setMessage(`[${words.word}] 단어 수정 완료`);
					setAlertModalOpen(true);
					setNavigateBack(true);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		getBookList();
		if (addPage) {
			clearData();
		} else if (editPage) {
			getWords();
		}
	}, [editPage]);

	useEffect(() => {
		if (bookId && bookList.length > 0) {
			const selectedBook = bookList.find(
				(book: Book) => book.short_id === bookId,
			);
			if (selectedBook) {
				const { start_lang, end_lang } = selectedBook;
				setBookInfo(prevBookInfo => ({
					...prevBookInfo,
					startLang: start_lang,
					endLang: end_lang,
				}));
			}
		}
	}, [bookId, bookList]);

	const clearData = () => {
		setWords(prevWords => ({
			...prevWords,
			word: '',
			currMeaning: [],
		}));
	};

	return (
		<>
			<Navigation></Navigation>
			{/* WordHeader */}
			<WordHeader
				bookInfo={bookInfo}
				setShowModal={setShowModal}
				words={words}
				handleSubmit={handleSubmit}
			/>
			<main>
				<div className={styles.container}>
					{/* WordFormDetail */}
					<WordFormDetail
						bookInfo={bookInfo}
						words={words}
						setWords={setWords}
					/>
				</div>
				<AlertModal
					isOpen={alertModalOpen}
					onClose={() => {
						setAlertModalOpen(false);
						if (navigateBack) {
							history.back();
						}
					}}
					message={message}
				/>
				{loginAlertModalOpen && (
					<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
				)}
			</main>
			{/* BookListModal */}
			{addPage && (
				<div className={styles.bookBtn}>
					<Modal
						showModal={showModal}
						setShowModal={setShowModal}
						title='단어장 선택'
					>
						<BookListModal
							setShowModal={setShowModal}
							bookList={bookList}
							bookInfo={bookInfo}
							setBookInfo={setBookInfo}
						/>
					</Modal>
				</div>
			)}
		</>
	);
}

export default WordForm;
