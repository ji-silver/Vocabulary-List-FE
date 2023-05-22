import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './AddButton.module.scss';

type Props = {
	url: string;
	bookId?: string | undefined;
};

const WordAddButton = ({ url, bookId }: Props) => {
	const nav = useNavigate();
	const newState = { bookId: bookId };
	return (
		<button
			onClick={() => nav(url, { state: newState })}
			className={styles.addButton}
		>
			<AiOutlinePlus style={{ color: 'white' }} />
		</button>
	);
};

export default WordAddButton;
