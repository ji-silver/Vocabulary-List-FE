import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import './calendar.scss';
import styles from './CalendarPaper.module.scss';
import {
	calendarGetAllQuiz,
	calendarGetAllWords,
	calendarGetToday,
	calendarGetTodayQuiz,
	calendarGetWords,
} from '../../apis/calendar';
import { Word, Quiz, prettyDate, joinMeanings, markDate } from './CalendarType';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import Speaker from '../common/Speaker/Speaker';
import ChangeStatus from '../common/Status/Status';
import { CalendarTypeAtom } from '../../recoil/calendar';

type PaperProps = {
	setLoginAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
};
function CalendarPaper({ setLoginAlertModal }: PaperProps) {
	const [wordsList, setWordsList] = useState<Word[]>([]);
	const [quizList, setQuizList] = useState<Quiz[]>([]);
	const userToken = useRecoilValue(userTokenState);
	const [value, onChange] = useState<Date>(new Date());
	const [mark, setMark] = useState<string[]>([]);
	const calendarType = useRecoilValue<string[]>(CalendarTypeAtom);
	const handleClickDate = async (date: Date) => {
		const currentDate = moment(date);
		const year = currentDate.year();
		const month = currentDate.month() + 1;
		const day = currentDate.date();

		try {
			if (calendarType.includes('words')) {
				const 데이터: Word[] = await calendarGetToday(
					userToken,
					year,
					month,
					day,
				);
				setWordsList(데이터);
			}
			if (calendarType.includes('quiz')) {
				const 데이터: Quiz[] = await calendarGetTodayQuiz(
					userToken,
					year,
					month,
					day,
				);
				const correctWord = 데이터.map(cw => {
					return cw.correctWords;
				});
				const incorrectWords = 데이터.map(iw => {
					return iw.incorrectWords;
				});
				const correct = await calendarGetWords(userToken, correctWord);
				const incorrect = await calendarGetWords(userToken, incorrectWords);
				setQuizList(incorrect);
			}
		} catch (error) {
			console.error(error);
		}
	};

	//단어 언어 확인
	const checkLang = (word: string) => {
		if (/[a-zA-Z]/g.test(word)) {
			return true;
		} else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(word)) {
			return false;
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			const currentDate = moment();
			const year = currentDate.year();
			const month = currentDate.month() + 1;
			let marks: Word[] = [];
			try {
				if (calendarType.includes('words')) {
					marks = await calendarGetAllWords(userToken, year, month);
				}
				if (calendarType.includes('quiz')) {
					marks = await calendarGetAllQuiz(userToken, year, month);
				}
				const createdAtList = marks.map(item => markDate(item.createdAt));
				setMark(createdAtList);
				handleClickDate(value); // 초기 로딩 시 현재 날짜의 데이터를 가져오도록 수정
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [userToken, value, calendarType]);

	return (
		<>
			<Calendar
				calendarType='US'
				locale='ko-KR'
				formatDay={(locale, date) => moment(date).format('D')}
				value={value}
				next2Label={null}
				prev2Label={null}
				view='month'
				// @ts-ignore
				onChange={onChange}
				onClickDay={handleClickDate}
				tileContent={({ date }) => {
					const dateStr = moment(date).format('YYYY-MM-DD');
					const wordCount = mark.filter(
						createdAt => createdAt === dateStr,
					).length;
					return (
						<div className='tile-content'>
							{wordCount > 0 && <div className={styles.dot}>{wordCount}</div>}
						</div>
					);
				}}
			/>
			<ul className={styles['list_container']}>
				{calendarType.includes('words') && (
					<>
						{wordsList.map((word, index) => (
							<li key={index} className={styles['list']}>
								<h3>{word.word}</h3>
								<div>{joinMeanings(word.meanings)}</div>
								<div>{prettyDate(word.createdAt)}</div>
								<div>
									<div className={styles.status}>
										<ChangeStatus
											id={word.short_id}
											initialStatus={word.status}
											setLoginAlertModal={setLoginAlertModal}
										/>
									</div>
									<div className={styles.speaker}>
										<Speaker
											text={word.word}
											lang={checkLang(word.word) ? 'english' : 'korean'}
										/>
									</div>
								</div>
							</li>
						))}
					</>
				)}
				{calendarType.includes('quiz') && (
					<>
						{quizList.map((quiz, index) => (
							<li className={`${styles.list} ${styles.quiz_list}`} key={index}>
								<h3>{quiz.word}</h3>
								<div>{joinMeanings(quiz.meanings)}</div>
								<div className={`${styles.quiz_list}`}>
									{prettyDate(quiz.createdAt)}
								</div>
								<div>
									<div className={styles.status}>
										<ChangeStatus
											id={quiz.short_id}
											initialStatus={quiz.status}
											setLoginAlertModal={setLoginAlertModal}
										/>
									</div>
									<div className={styles.speaker}>
										<Speaker
											text={quiz.word}
											lang={checkLang(quiz.word) ? 'english' : 'korean'}
										/>
									</div>
								</div>
							</li>
						))}
					</>
				)}
			</ul>
		</>
	);
}

export default CalendarPaper;
