import React, { useState, useEffect, useRef } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { deleteWords, updateStatus } from '../../apis/word';
import checkedWordList from '../../recoil/checkedWordList';

//단어 정보들에 대한 타입
type WordListItem = {
	short_id: string;
	word: string;
	meanings: Array<string>;
	status: number;
	createdAt: string;
};

type Props = {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	wordList: WordListItem[];
	setWordList: React.Dispatch<React.SetStateAction<WordListItem[]>>;
};

function WordListOptionsModal({ setModalOpen, wordList, setWordList }: Props) {
	const userToken = useRecoilValue(userTokenState);
	const checkedList = useRecoilValue(checkedWordList);
	const setCheckedList = useRecoilState(checkedWordList);

	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setModalOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	//선택목록 삭제
	const handleDelete = async () => {
		if (checkedList.length === 0) {
			alert('삭제할 단어를 선택해주세요!');
			return;
		} else {
			for (let i = 0; i < checkedList.length; i++) {
				await deleteWords(userToken, checkedList[i]);
			}
			const newList = wordList.filter(
				list => !checkedList.includes(list.short_id),
			);
			setWordList(newList);
			alert('삭제되었습니다.');
		}
	};

	//전체 미분류로
	const handleAllUnmark = async () => {
		console.log(wordList);
		// for (let i = 0; i < wordList.length; i++) {
		// 	await updateStatus(userToken, wordList[i].short_id);
		// }
	};

	//전체 외운 단어로
	const handleAllCheck = () => {
		alert('외운 단어로 처리되었습니다.');
	};

	//전체 헷갈리는 단어로
	const handleAllUnknown = () => {
		alert('헷갈리는 단어로 처리되었습니다.');
	};

	//모든 단어가 체크됐는지 확인
	useEffect(() => {
		console.log(checkedList);
	}, [checkedList]);

	return (
		<div>
			<div>
				<div className={styles.optionscontainer} ref={modalRef}>
					<div className={styles.delete} onClick={handleDelete}>
						<AiOutlineDelete />
						&nbsp;&nbsp;선택된 단어 삭제
					</div>
					<div className={styles.unmark} onClick={handleAllUnmark}>
						<BiMessageSquare />
						&nbsp;&nbsp;마크 해제
					</div>
					<div className={styles.check} onClick={handleAllCheck}>
						<BiMessageSquareCheck />
						&nbsp;&nbsp;외운 단어 마크
					</div>
					<div className={styles.unknown} onClick={handleAllUnknown}>
						<BiMessageSquareError />
						&nbsp;&nbsp;헷갈리는 단어 마크
					</div>
				</div>
			</div>
		</div>
	);
}

export default WordListOptionsModal;