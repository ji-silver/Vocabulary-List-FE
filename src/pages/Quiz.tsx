import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import styles from '../components/Quiz/QuizList.module.scss';
import QuizList, { InterfaceQuiz } from '../components/Quiz/QuizList';
import Navigation from '../components/common/Navigation/Navigation';
import Header from '../components/common/Header/Header';
import { BsFillDice4Fill, BsInputCursorText, BsStars } from 'react-icons/bs';
import { TbCards } from 'react-icons/tb';

const quizList: InterfaceQuiz[] = [
	{
		id: 'four-prong',
		title: '사지선다',
		description: '올바른 정답을 선택하세요!',
		icon: <BsFillDice4Fill size='50' color='#ffff' />,
	},
	{
		id: 'dictation',
		title: '받아쓰기',
		description: '받아쓰기를 하며 단어를 외워요!',
		icon: <BsInputCursorText size='50' color='#ffff' />,
	},
	{
		id: 'word-card',
		title: '단어카드',
		description: '카드를 넘기며 단어를 외워요!',
		icon: <TbCards size='50' color='#ffff' />,
	},
	{
		id: 'flicker',
		title: '깜빡이',
		description: '반복해서 보고 들어요!',
		icon: <BsStars size='50' color='#ffff' />,
	},
];

function Quiz() {
	return (
		<>
			<Header title={'퀴즈'} />
			<main className={styles.container}>
				{quizList.map(quiz => (
					<QuizList key={quiz.id} quizInfo={quiz} />
				))}
			</main>
			<Navigation />
		</>
	);
}

export default Quiz;
