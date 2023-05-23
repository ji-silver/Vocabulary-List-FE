import React, { ReactNode } from 'react';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

function Header({
	title,
	addGoBackButton,
	rightComponent,
}: {
	title: ReactNode;
	addGoBackButton?: boolean;
	rightComponent?: any;
}) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.headerContainer}>
			<header className={styles.commonHeader}>
				<span>
					{addGoBackButton && (
						<button onClick={() => goBack()}>
							<MdOutlineNavigateBefore size={24} color='rgb(84 84 84)' />
						</button>
					)}
				</span>
				<span>{title}</span>
				<span>{rightComponent}</span>
			</header>
		</div>
	);
}

export default Header;
