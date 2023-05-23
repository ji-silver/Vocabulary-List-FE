import React from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';

//단어 정보들에 대한 타입
type WordListItem = {
	short_id: string;
	word: string;
	meanings: Array<string>;
	status: number;
	createdAt: string;
};

//상위 컴포넌트(WordList)에서 받아온 props 타입
type Props = {
	setWordList: React.Dispatch<React.SetStateAction<WordListItem[]>>;
	originalWordList: React.MutableRefObject<WordListItem[]>;
};

function WordListFilterModal({ setWordList, originalWordList }: Props) {
	function handleFilterReset() {
		setWordList(originalWordList.current);
	}

	function handleFilterUnmark() {
		const filteredWordList = originalWordList.current.filter(
			list => list.status === 0,
		);
		setWordList(filteredWordList);
	}

	function handleFilterCheck() {
		const filteredWordList = originalWordList.current.filter(
			list => list.status === 1,
		);
		setWordList(filteredWordList);
	}

	function handleFilterUnknown() {
		const filteredWordList = originalWordList.current.filter(
			list => list.status === 2,
		);
		setWordList(filteredWordList);
	}

	return (
		<div className={styles.content}>
			<div className={styles.reset} onClick={handleFilterReset}>
				초기화
			</div>
			<div className={styles.unmark} onClick={handleFilterUnmark}>
				<div className={styles.markIcon}>
					<BiMessageSquare />
				</div>
				<div className={styles.markText}>미분류 단어</div>
			</div>
			<div className={styles.check} onClick={handleFilterCheck}>
				<div className={styles.markIcon}>
					<BiMessageSquareCheck />
				</div>
				<div className={styles.markText}>외운 단어</div>
			</div>
			<div className={styles.unknown} onClick={handleFilterUnknown}>
				<div className={styles.markIcon}>
					<BiMessageSquareError />
				</div>
				<div className={styles.markText}>헷갈리는 단어</div>
			</div>
		</div>
	);
}

export default WordListFilterModal;
