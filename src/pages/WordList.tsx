//React
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//SCSS
import styles from '../components/WordList/WordListStyle.module.scss';

//아이콘
import { CiMenuKebab } from 'react-icons/ci';
import { GiSettingsKnobs } from 'react-icons/gi';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlinePencil } from 'react-icons/hi';

//모듈
import WordListFilterModal from '../components/WordList/WordListFilterModal';
import WordListOptionsModal from '../components/WordList/WordListOptionModal';
import AddButton from '../components/common/AddButton/AddButton';
import ChangeStatus from '../components/common/Status/Status';
import Speaker from '../components/common/Speaker/Speaker';
import AlertModal from '../components/common/AlertModal/AlertModal';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';
import Navigation from '../components/common/Navigation/Navigation';
import Modal from '../components/common/Modal/Modal';

//Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import checkedWordList from '../recoil/checkedWordList';

//API
import {
	getSampleWords,
	getWordsByBook,
	getBookName,
	findWordById,
	findWords,
} from '../apis/word';
import Header from '../components/common/Header/Header';

//BookList에서 Params로 받아올 bookId
type RouteParams = {
	bookId: string | undefined;
};

//단어 정보들에 대한 타입
type WordListItem = {
	short_id: string;
	word: string;
	meanings: Array<string>;
	status: number;
	createdAt: string;
};

function WordList() {
	const [wordList, setWordList] = useState<WordListItem[]>([]);
	const [checkedList, setCheckedList] = useRecoilState(checkedWordList);

	const [filterModal, setFilterModal] = useState<boolean>(false);
	const [optionModal, setOptionModal] = useState<boolean>(false);
	const [alertDeleteModalOpen, setAlertDeleteModalOpen] = useState(false);
	const [alertUnmarkModalOpen, setAlertUnmarkModalOpen] = useState(false);
	const [alertCheckModalOpen, setAlertCheckModalOpen] = useState(false);
	const [alertUnknownModalOpen, setAlertUnknownModalOpen] = useState(false);
	const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);

	const [booktitle, setBooktitle] = useState('샘플 단어장');
	const [findWord, setFindWord] = useState({
		findword: '',
	});

	const originalWordList = useRef(wordList);
	const prevWordList = useRef([]);

	const userToken = useRecoilValue(userTokenState);
	const { bookId } = useParams<RouteParams>();
	const nav = useNavigate();

	//단어장 이름
	useEffect(() => {
		if (bookId) {
			const fetchTitle = async () => {
				try {
					const response = await getBookName(userToken, bookId);
					const name = response.data[0].name;
					setBooktitle(name);
				} catch (err) {
					console.log(err);
				}
			};
			fetchTitle();
		}
	}, [bookId, userToken]);

	//단어장 리스트
	useEffect(() => {
		if (bookId && userToken) {
			const fetchWords = async () => {
				try {
					const response = await getWordsByBook(userToken, bookId);
					setWordList(response.data);
					originalWordList.current = response.data;
				} catch (err) {
					console.log(err);
				}
			};
			fetchWords();
			setCheckedList([]);
		} else if (!userToken) {
			const fetchWords = async () => {
				try {
					const response = await getSampleWords();
					setWordList(response.data);
					originalWordList.current = response.data;
				} catch (err) {
					console.log(err);
				}
			};
			fetchWords();
		}
	}, []);

	//단일 단어 체크
	const onCheckedItem = useCallback(
		(checked: boolean, item: string) => {
			setCheckedList(prev => {
				const newCheckedList = checked
					? [...prev, item]
					: prev.filter(el => el !== item);
				return newCheckedList;
			});
		},
		[checkedList],
	);

	//모든 단어 체크
	const onCheckedAllItems = useCallback(
		(checked: boolean) => {
			if (checked) {
				const checekdListArray: string[] = [];
				wordList.forEach((list: WordListItem) =>
					checekdListArray.push(list.short_id),
				);
				setCheckedList(checekdListArray);
			} else {
				setCheckedList([]);
			}
		},
		[wordList],
	);

	//단어 언어 확인
	const checkLang = (word: string) => {
		if (/[a-zA-Z]/g.test(word)) {
			return true;
		} else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(word)) {
			return false;
		}
	};

	//날짜 형식 포맷팅 함수
	function formatDate(str: string) {
		const date = new Date(str);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	const handleFilter = () => {
		setFilterModal(true);
	};

	const handleOption = () => {
		if (userToken) {
			setOptionModal(true);
		} else {
			setLoginAlertModalOpen(true);
		}
	};

	//Input창에 단어 검색
	const onChangeFindWord = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setFindWord({
			...findWord,
			[e.target.name]: e.target.value,
		});
	};

	//Input 창에 검색어가 없을 경우 bookId의 전체 단어 리스트 렌더링
	useEffect(() => {
		if (!findWord.findword && bookId) {
			if (userToken) {
				getWordsByBook(userToken, bookId).then(res => setWordList(res.data));
			} else {
				getSampleWords().then(res => setWordList(res.data));
			}
		}
	}, [findWord, userToken]);

	const handleFind = async (word: string, bookId: string | undefined) => {
		if (word) {
			if (userToken) {
				const response = await findWordById(userToken, word, bookId);
				setWordList(response.data);
			} else {
				const response = await findWords(word, bookId);
				setWordList(response.data);
			}
		} else {
			alert('검색어를 입력해주세요!');
		}
	};

	//Enter 키를 눌렀을 때 검색 확인
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleFind(findWord.findword, bookId);
			if (!wordList.length) {
				setWordList(prevWordList.current);
			}
		}
	};

	const handleEdit = (short_id: string) => {
		if (userToken) {
			nav(`/word/edit/${short_id}`);
		} else {
			setLoginAlertModalOpen(true);
		}
	};

	return (
		<>
			<Navigation />
			<main>
				<div className={styles.container}>
					<div className={styles.fixed}>
						<Header
							title={booktitle}
							addGoBackButton={true}
							rightComponent={
								<div className={styles.title}>
									<div className={styles.filter} onClick={handleFilter}>
										<GiSettingsKnobs size={24} color='#736ef3' />
									</div>
									<div className={styles.option} onClick={handleOption}>
										<CiMenuKebab size={24} color='#736ef3' />
									</div>
									{optionModal && (
										<WordListOptionsModal
											setModalOpen={setOptionModal}
											wordList={wordList}
											setWordList={setWordList}
											setAlertDeleteOpen={setAlertDeleteModalOpen}
											setAlertUnmarkOpen={setAlertUnmarkModalOpen}
											setAlertCheckOpen={setAlertCheckModalOpen}
											setAlertUnknownOpen={setAlertUnknownModalOpen}
										/>
									)}
								</div>
							}
						/>
						<div className={styles.search}>
							<input
								className={styles.input}
								name='findword'
								placeholder='검색어를 입력해 주세요!'
								onChange={onChangeFindWord}
								onKeyDown={handleKeyDown}
							/>
							<div
								className={styles.find}
								onClick={() => {
									handleFind(findWord.findword, bookId);
									if (!wordList.length) {
										setWordList(prevWordList.current);
									}
								}}
							>
								<IoSearchOutline />
							</div>
						</div>
					</div>
					<div className={styles.list}>
						<div className={styles.listHeader}>
							<div className={styles.selectAll}>
								<input
									type='checkbox'
									onChange={e => onCheckedAllItems(e.target.checked)}
									checked={
										checkedList.length === 0
											? false
											: checkedList.length === wordList.length
											? true
											: false
									}
								/>
							</div>
							<div className={styles.count}>전체 {wordList.length}</div>
						</div>
						{wordList.map((item: WordListItem) => (
							<div key={item.short_id} className={styles.box}>
								<div className={styles.menus}>
									<div className={styles.listInfo}>
										<input
											type='checkbox'
											value={item.short_id}
											onChange={e => {
												onCheckedItem(e.target.checked, e.target.value);
											}}
											checked={
												checkedList.includes(item.short_id) ? true : false
											}
										/>
										&nbsp;
										{formatDate(item.createdAt)}
									</div>
									<div
										className={styles.edit}
										onClick={() => handleEdit(item.short_id)}
									>
										<HiOutlinePencil />
									</div>
									<div className={styles.status}>
										<ChangeStatus
											id={item.short_id}
											initialStatus={item.status}
											setLoginAlertModal={setLoginAlertModalOpen}
										/>
									</div>
									<div className={styles.speaker}>
										<Speaker
											text={item.word}
											lang={checkLang(item.word) ? 'english' : 'korean'}
										/>
									</div>
								</div>
								<div className={styles.word}>{item.word}</div>
								<div className={styles.meanings}>
									{item.meanings.map((meaning, index) => {
										return (
											<div className={styles.meaningBlock} key={index}>
												{meaning}
											</div>
										);
									})}
								</div>
							</div>
						))}
						{userToken && <AddButton url='/word/add' bookId={bookId} />}
					</div>
				</div>
				{checkedList.length !== 0 ? (
					<AlertModal
						isOpen={alertDeleteModalOpen}
						onClose={() => {
							setAlertDeleteModalOpen(false);
						}}
						message='삭제가 완료되었습니다.'
					/>
				) : (
					<AlertModal
						isOpen={alertDeleteModalOpen}
						onClose={() => {
							setAlertDeleteModalOpen(false);
						}}
						message='삭제할 단어를 선택해주세요.'
					/>
				)}
				{wordList.length !== 0 ? (
					<AlertModal
						isOpen={alertUnmarkModalOpen}
						onClose={() => {
							setAlertUnmarkModalOpen(false);
							location.reload();
						}}
						message='전체 단어 미분류 처리되었습니다.'
					/>
				) : (
					<AlertModal
						isOpen={alertUnmarkModalOpen}
						onClose={() => {
							setAlertUnmarkModalOpen(false);
						}}
						message='단어장에 단어가 없습니다.'
					/>
				)}
				{wordList.length !== 0 ? (
					<AlertModal
						isOpen={alertCheckModalOpen}
						onClose={() => {
							setAlertCheckModalOpen(false);
							location.reload();
						}}
						message='전체 단어 외움 처리되었습니다.'
					/>
				) : (
					<AlertModal
						isOpen={alertCheckModalOpen}
						onClose={() => {
							setAlertCheckModalOpen(false);
						}}
						message='단어장에 단어가 없습니다.'
					/>
				)}
				{wordList.length !== 0 ? (
					<AlertModal
						isOpen={alertUnknownModalOpen}
						onClose={() => {
							setAlertUnknownModalOpen(false);
							location.reload();
						}}
						message='전체 단어 헷갈림 처리되었습니다.'
					/>
				) : (
					<AlertModal
						isOpen={alertUnknownModalOpen}
						onClose={() => {
							setAlertUnknownModalOpen(false);
						}}
						message='단어장에 단어가 없습니다.'
					/>
				)}

				{loginAlertModalOpen && (
					<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
				)}
				<Modal
					showModal={filterModal}
					setShowModal={setFilterModal}
					title='보기 설정'
				>
					<WordListFilterModal
						setWordList={setWordList}
						originalWordList={originalWordList}
					/>
				</Modal>
			</main>
		</>
	);
}

export default WordList;
