import React, { useEffect, useRef } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

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
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	wordList: WordListItem[];
	setWordList: React.Dispatch<React.SetStateAction<WordListItem[]>>;
	originalWordList: React.MutableRefObject<WordListItem[]>;
};

function WordListFilterModal({
	setModalOpen,
	wordList,
	setWordList,
	originalWordList,
}: Props) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setModalOpen(false);
			}
		};

		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

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
		<div className={styles.modalBack}>
			<div className={styles.modal} ref={modalRef}>
				<div className={styles.header}>
					<div className={styles.title}>보기 설정</div>
					<div className={styles.close} onClick={() => setModalOpen(false)}>
						<IoIosCloseCircleOutline />
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.reset} onClick={handleFilterReset}>
						초기화
					</div>
					<div className={styles.mark} onClick={handleFilterUnmark}>
						<div className={styles.markIcon}>
							<BiMessageSquare />
						</div>
						<div className={styles.markText}>미분류 단어</div>
					</div>
					<div className={styles.mark} onClick={handleFilterCheck}>
						<div className={styles.markIcon}>
							<BiMessageSquareCheck />
						</div>
						<div className={styles.markText}>외운 단어</div>
					</div>
					<div className={styles.mark} onClick={handleFilterUnknown}>
						<div className={styles.markIcon}>
							<BiMessageSquareError />
						</div>
						<div className={styles.markText}>헷갈리는 단어</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WordListFilterModal;
