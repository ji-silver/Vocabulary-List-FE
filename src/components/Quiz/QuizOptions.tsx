import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';
import styles from './QuizOptions.module.scss';

type TypeBookOptionProps = { onClick: () => void };
export function BookOption({ onClick }: TypeBookOptionProps) {
	return (
		<li className={styles.bookOption}>
			<p>문제 범위</p>
			<button onClick={onClick}>{/* {selectedBookNames} */}단어장 선택</button>
		</li>
	);
}

type TypeBookList = { id: string; name: string };

type TypeBookSelectOptionProps = {
	bookList: TypeBookList[];
	value: TypeBookList[];
	onChange: (value: TypeBookList[]) => void;
};
export function BookSelectOption({
	bookList,
	value,
	onChange,
}: TypeBookSelectOptionProps) {
	const handleCheckboxChange = (e: {
		target: { id: string; value: string };
	}) => {
		const inputId = e.target.id;
		const inputValue = e.target.value;
		if (value.find(option => option.id === inputId)) {
			const newTypeOption = value.filter(option => option.id !== inputId);
			onChange(newTypeOption);
		} else {
			const newTypeOption = [...value, { id: inputId, name: inputValue }];
			onChange(newTypeOption);
		}
	};

	return (
		<ul className={styles.bookList}>
			{bookList ? (
				bookList.map((book: TypeBookList) => (
					<li key={book.id}>
						<label>
							{book.name}
							<input
								id={book.id}
								value={book.name}
								name='book'
								type='checkbox'
								checked={
									value.find((option: TypeBookList) => option.id === book.id)
										? true
										: false
								}
								onChange={e => handleCheckboxChange(e)}
							/>
						</label>
					</li>
				))
			) : (
				<li>단어장을 만들어주세요.</li>
			)}
		</ul>
	);
}

type TypeOptionProps = { value: string; onChange: (value: string) => void };
export function TypeOption({ value, onChange }: TypeOptionProps) {
	return (
		<li className={styles.typeOption}>
			<p>문제 타입</p>
			<label htmlFor='word-type'>
				단어
				<input
					type='radio'
					id='word-type'
					name='type'
					value='word'
					checked={value === 'word'}
					onChange={e => {
						onChange(e.target.value);
					}}
				/>
			</label>
			<label htmlFor='meaning-type'>
				의미
				<input
					type='radio'
					id='meaning-type'
					name='type'
					value='meaning'
					checked={value === 'meaning'}
					onChange={e => {
						onChange(e.target.value);
					}}
				/>
			</label>
		</li>
	);
}

type NumberOptionProps = {
	value: number;
	onDecreaseBtnClick: () => void;
	onIncreaseBtnClick: () => void;
	onChangeNumInput: (value: number) => void;
};
export function NumberOption({
	value,
	onDecreaseBtnClick,
	onIncreaseBtnClick,
	onChangeNumInput,
}: NumberOptionProps) {
	return (
		<li className={styles.numberOption}>
			<p>문제 개수</p>
			<button className={styles.decBtn} onClick={() => onDecreaseBtnClick()}>
				-
			</button>
			<input
				type='number'
				step={5}
				min={5}
				max={50}
				value={value}
				onChange={e => {
					onChangeNumInput(Number(e.target.value));
				}}></input>
			개
			<button className={styles.incBtn} onClick={() => onIncreaseBtnClick()}>
				+
			</button>
		</li>
	);
}

type WordStatusOptionProps = {
	value: number[];
	onChange: (value: number[]) => void;
};
export function WordStatusOption({ value, onChange }: WordStatusOptionProps) {
	const handleCheckboxChange = (e: { target: { value: string } }) => {
		const inputValue = Number(e.target.value);
		if (value.includes(inputValue)) {
			const newTypeOption = value.filter(state => state !== inputValue);
			onChange(newTypeOption);
		} else {
			const newTypeOption = [...value, inputValue];
			onChange(newTypeOption);
		}
	};

	return (
		<li className={styles.statusOption}>
			<p>문제 상태</p>
			<label>
				미분류 단어
				<input
					id='0-type'
					type='checkbox'
					name='type'
					value='0'
					checked={value.includes(0)}
					onChange={e => handleCheckboxChange(e)}
				/>
			</label>
			<label>
				외운 단어
				<input
					id='1-type'
					type='checkbox'
					name='type'
					value='1'
					checked={value.includes(1)}
					onChange={e => handleCheckboxChange(e)}
				/>
			</label>
			<label>
				헷갈리는 단어
				<input
					id='2-type'
					type='checkbox'
					name='type'
					value='2'
					checked={value.includes(2)}
					onChange={e => handleCheckboxChange(e)}
				/>
			</label>
		</li>
	);
}
