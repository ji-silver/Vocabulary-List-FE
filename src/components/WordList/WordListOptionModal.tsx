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
import AlertModal from '../common/AlertModal/AlertModal';

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
	setAlertDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAlertUnmarkOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAlertCheckOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAlertUnknownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function WordListOptionsModal({
	setModalOpen,
	wordList,
	setWordList,
	setAlertDeleteOpen,
	setAlertUnmarkOpen,
	setAlertCheckOpen,
	setAlertUnknownOpen,
}: Props) {
	const userToken = useRecoilValue(userTokenState);
	const checkedList = useRecoilValue(checkedWordList);

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
		try {
			for (let i = 0; i < checkedList.length; i++) {
				await deleteWords(userToken, checkedList[i]);
			}
			const newList = wordList.filter(
				list => !checkedList.includes(list.short_id),
			);
			setWordList(newList);
			setAlertDeleteOpen(true);
		} catch (err) {
			console.log(err);
		}
	};

	//전체 미분류로
	const handleAllUnmark = async () => {
		try {
			for (let i = 0; i < wordList.length; i++) {
				await updateStatus(userToken, wordList[i].short_id, 0);
			}
			setAlertUnmarkOpen(true);
		} catch (err) {
			console.log(err);
		}
	};

	//전체 외운 단어로
	const handleAllCheck = async () => {
		try {
			for (let i = 0; i < wordList.length; i++) {
				await updateStatus(userToken, wordList[i].short_id, 1);
			}
			setAlertCheckOpen(true);
		} catch (err) {
			console.log(err);
		}
	};

	//전체 헷갈리는 단어로
	const handleAllUnknown = async () => {
		if (wordList) {
			try {
				for (let i = 0; i < wordList.length; i++) {
					await updateStatus(userToken, wordList[i].short_id, 2);
				}
				setAlertUnknownOpen(true);
			} catch (err) {
				console.log(err);
			}
		}
	};

	//모든 단어가 체크됐는지 확인
	useEffect(() => {
		console.log(checkedList);
	}, [checkedList]);

	return (
		<>
			<div className={styles.optionscontainer} ref={modalRef}>
				<div className={styles.delete} onClick={handleDelete}>
					<AiOutlineDelete />
					&nbsp;&nbsp;선택된 단어 삭제
				</div>
				<div className={styles.unmark} onClick={handleAllUnmark}>
					<BiMessageSquare />
					&nbsp;&nbsp;전체 마크 해제
				</div>
				<div className={styles.check} onClick={handleAllCheck}>
					<BiMessageSquareCheck />
					&nbsp;&nbsp;전체 외운 단어 마크
				</div>
				<div className={styles.unknown} onClick={handleAllUnknown}>
					<BiMessageSquareError />
					&nbsp;&nbsp;전체 헷갈리는 단어 마크
				</div>
			</div>
		</>
	);
}

export default WordListOptionsModal;
