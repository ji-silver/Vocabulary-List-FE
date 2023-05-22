import React, { KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import styles from './WordForm.module.scss';
import { IoSearchOutline } from 'react-icons/io5';

type WordInputProps = {
	value: string;
	placeholder: string;
	className?: string;
	errorCaption?: string;
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function WordInput({
	value,
	onKeyDown,
	onChange,
	placeholder,
	onClick,
	className,
	errorCaption,
}: WordInputProps) {
	return (
		<div>
			<div className={`${styles.wordInput} ${className || ''}`}>
				<input
					type='text'
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				{onClick && (
					<button type='button' className={styles.searchBtn} onClick={onClick}>
						<IoSearchOutline className={styles.icon} />
					</button>
				)}
			</div>
			{errorCaption && <p className={styles.errorCaption}>{errorCaption}</p>}
		</div>
	);
}

export default WordInput;
