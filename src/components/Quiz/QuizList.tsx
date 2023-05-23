import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import styles from './QuizList.module.scss';
import Modal from '../common/Modal/Modal';
import {
	BookOption,
	BookSelectOption,
	NumberOption,
	TypeOption,
	WordStatusOption,
} from './QuizOptions';
import { bookListAll, getBooks } from '../../apis/book';
import { getFourProngsQuiz } from '../../apis/quiz';
import AlertModal from '../common/AlertModal/AlertModal';

export interface InterfaceQuiz {
	id: string;
	title: string;
	description: string;
	icon: any;
}

interface ListProps {
	quizInfo: InterfaceQuiz;
}
type TypeBookList = { id: string; name: string };

function QuizList({ quizInfo }: ListProps) {
	const navigate = useNavigate();
	const userToken = useRecoilValue(userTokenState);

	const [showOptionModal, setShowOptionModal] = useState(false);
	const [showBookSelectModal, setShowBookSelectModal] = useState(false);

	const { id, title, description, icon } = quizInfo;

	const [bookList, setBookList] = useState<TypeBookList[]>([]);
	const [bookOption, setBookOption] = useState<TypeBookList[] | any>([]);
	// const [typeOption, setTypeOption] = useState<string>('word');
	const [numberOption, setNumberOption] = useState<number>(5);
	const [wordStatusOption, setWordStatusOption] = useState<number[]>([0, 1, 2]);
	const [isUnopenedAlertShow, setIsUnopenedAlertShow] = useState(false);

	const handleQuizListClick = () => {
		if (id === 'dictation' || id === 'word-card' || id === 'flicker') {
			setIsUnopenedAlertShow(true);
		} else {
			setShowOptionModal(true);
		}
	};

	const handleStartQuiz = () => {
		const quizData = {
			bookOption: bookOption.map((book: TypeBookList) => book.id),
			numberOption,
			wordStatusOption,
		};

		// 네비게이션으로 사지선다 리스트를 클릭하면 해당 api 호출 +
		if (id === 'four-prong')
			getFourProngsQuiz(userToken, quizData).then(res => {
				navigate('/quiz/four-prong', { state: res.data });
			});
	};

	const handleBookSelectButtonClick = () => {
		setShowBookSelectModal(true);
	};

	const handleBookInputChange = (value: TypeBookList[]) => {
		setBookOption(() => {
			return value;
		});
	};

	// const handleTypeInputChange = (value: string) => {
	// 	setTypeOption(() => {
	// 		return value;
	// 	});
	// };

	// const handleDecreaseButtonClick = () => {
	// 	setNumberOption((prev) => {
	// 		return prev-1
	// 	});
	// };

	const handleWordStatusInputChange = (value: number[]) => {
		setWordStatusOption(() => {
			return value;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = userToken
				? await bookListAll(userToken)
				: await getBooks();
			if (response.status === 200) {
				const bookLists = response.data;
				const newBookList = bookLists.reduce(
					(
						acc: TypeBookList[],
						current: { name: string; short_id: string },
					) => {
						const { short_id, name } = current;
						return [...acc, { id: short_id, name }];
					},
					[],
				);
				setBookList(newBookList);
				setBookOption(newBookList);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div className={styles.list} onClick={handleQuizListClick}>
				<div className={styles.iconContainer}>{icon}</div>
				<div className={styles.desContainer}>
					<p>{title}</p>
					<p>{description}</p>
				</div>
			</div>
			<Modal
				showModal={showOptionModal}
				setShowModal={setShowOptionModal}
				title='퀴즈 옵션 설정'>
				<ul className={styles.optionContainer}>
					<BookOption onClick={handleBookSelectButtonClick} />
					{/* <TypeOption value={typeOption} onChange={handleTypeInputChange} /> */}
					<NumberOption
						value={numberOption}
						onDecreaseBtnClick={() =>
							setNumberOption(prev => (numberOption > 5 ? prev - 5 : prev))
						}
						onIncreaseBtnClick={() =>
							setNumberOption(prev => (numberOption <= 95 ? prev + 5 : prev))
						}
						onChangeNumInput={(value: number) => setNumberOption(value)}
					/>

					<WordStatusOption
						value={wordStatusOption}
						onChange={handleWordStatusInputChange}
					/>
				</ul>
				<div className={styles.quizStartContainer}>
					<button onClick={handleStartQuiz}>퀴즈 시작</button>
				</div>
			</Modal>
			<Modal
				showModal={showBookSelectModal}
				setShowModal={setShowBookSelectModal}
				title='단어장 선택'>
				<BookSelectOption
					bookList={bookList}
					value={bookOption}
					onChange={handleBookInputChange}
				/>
			</Modal>
			{isUnopenedAlertShow && (
				<AlertModal
					isOpen={isUnopenedAlertShow}
					onClose={() => setIsUnopenedAlertShow(false)}
					message='준비 중 입니다.'
				/>
			)}
		</>
	);
}

export default QuizList;
