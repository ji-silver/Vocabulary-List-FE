import React from 'react';
import Modal from '../common/Modal/Modal';
import ChangeStatus from '../common/Status/Status';
import styles from '../Quiz/QuizAnswerModal.module.scss';
type TypeAnswer = {
	isCorrect?: boolean;
	wordId: string;
	word: string;
	meanings: string[];
	status: number;
};
type TypeQuizAnswerModalProps = {
	answerList: TypeAnswer[];
	showModal: boolean;
	setShowModal: any;
};
function QuizAnswerModal({
	answerList,
	showModal,
	setShowModal,
}: TypeQuizAnswerModalProps) {
	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			title='퀴즈 정답 보기'
		>
			<ul className={styles.listContainer}>
				{answerList.map((answer, index) => (
					<li key={answer.wordId} className={styles.answerList}>
						<div
							className={`${styles.answerContainer} ${
								answer.isCorrect ? styles.correct : styles.incorrect
							}`}
						>
							<span>{index + 1}.</span>
							<span className={styles.word}>{answer.word}</span>
							<ChangeStatus id={answer.wordId} initialStatus={answer.status} />
						</div>
						<ul className={styles.meaningList}>
							{answer.meanings.map((meaning: string, index: number) => (
								<li key={index}>{meaning}</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</Modal>
	);
}

export default QuizAnswerModal;
