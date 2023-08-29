import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizAnswerModal from './QuizAnswerModal';
import styles from './QuizResult.module.scss';
import { userTokenState } from '../../recoil/userState';
import { multiWords } from '../../apis/word';
import { useRecoilValue } from 'recoil';
import { postQuizResult } from '../../apis/quiz';

type TypeResultProps = {
	quizCategory: string;
	correctAnswers: string[];
	incorrectAnswers: string[];
	isDone: boolean;
	onClickQuizRestart: any;
};
type TypeAnswer = {
	isCorrect?: boolean;
	wordId: string;
	word: string;
	meanings: string[];
	status: number;
};
function QuizResult({
	quizCategory,
	correctAnswers,
	incorrectAnswers,
	isDone,
	onClickQuizRestart,
}: TypeResultProps) {
	const userToken = useRecoilValue(userTokenState);
	const numberOfCorrects = correctAnswers.length;
	const numberOfAll = correctAnswers.length + incorrectAnswers.length;
	const correctPercentage = (numberOfCorrects / numberOfAll) * 100;
	const radius = 90; // 반지름
	const circumference = 2 * Math.PI * radius; // 원둘레
	const progressLength = (circumference * correctPercentage) / 100;
	const remainingLength = circumference - progressLength;
	const navigate = useNavigate();

	const [isShowQuizAnswers, setIsShowQuizAnswers] = useState(false);
	const [answerList, setAnswerList] = useState<TypeAnswer[]>([]);

	useEffect(() => {
		if (isDone) {
			const answerIds = [...correctAnswers, ...incorrectAnswers];
			multiWords(userToken, answerIds).then(res => {
				const mappedAnswerData = res.data.map((wordData: any) => {
					return {
						isCorrect: correctAnswers.includes(wordData.short_id)
							? true
							: false,
						wordId: wordData.short_id,
						word: wordData.word,
						meanings: wordData.meanings,
						status: wordData.status,
					};
				});
				setAnswerList(mappedAnswerData);
				return;
			});
		}
	}, []);

	useEffect(() => {
		if (isDone && userToken) {
			const formData = {
				category: quizCategory,
				correctWords: [...correctAnswers],
				incorrectWords: [...incorrectAnswers],
			};
			postQuizResult(userToken, formData);
		}
	}, []);

	return (
		<div className={styles.resultContainer}>
			<div className={styles.result}>
				<svg viewBox='0 0 200 200'>
					<circle cx='100' cy='100' r='90' />
					<circle
						cx='100'
						cy='100'
						r='90'
						strokeDasharray={`${progressLength} ${remainingLength}`}
						transform='rotate(-90) translate(-200)'
						className={isDone ? styles.circleAnimation : undefined}
					/>
				</svg>
				<span>
					{numberOfCorrects}/{numberOfAll}
				</span>
			</div>
			<div className={styles.buttonContainer}>
				<button onClick={() => setIsShowQuizAnswers(true)}>
					퀴즈 정답보기
				</button>
				<button onClick={onClickQuizRestart()}>다시하기</button>
				<button
					onClick={() => {
						navigate('/quiz/list');
					}}
				>
					다른 퀴즈 풀기
				</button>
			</div>
			<QuizAnswerModal
				answerList={answerList}
				showModal={isShowQuizAnswers}
				setShowModal={setIsShowQuizAnswers}
			/>
		</div>
	);
}

export default QuizResult;
