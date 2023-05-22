import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './Navigation.module.scss';
import {
	BsPencil,
	BsJournalBookmark,
	BsPatchQuestion,
	BsCalendar4Week,
} from 'react-icons/bs';
import { TbLogin } from 'react-icons/tb';

const Navigation = () => {
	const location = useLocation();
	const params = useParams();

	return (
		<div className={styles.container}>
			<nav className={styles.menu}>
				<ul className={styles.menuList}>
					<li className={styles.menuItem}>
						<NavLink
							to='/word/add'
							style={{
								color:
									location.pathname === '/word/add'
										? '#7353ea'
										: 'rgb(113 113 113)',
							}}
						>
							<div className={styles.iconWrapper}>
								<BsPencil size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/book/list'
							style={{
								color:
									location.pathname === '/book/list' ||
									location.pathname === '/book/add' ||
									location.pathname === `/book/edit/${params.bookId}` ||
									location.pathname === '/word/list' ||
									location.pathname === `/word/list/${params.bookId}` ||
									location.pathname === `/word/edit/${params.wordId}`
										? '#7353ea'
										: 'rgb(113 113 113)',
							}}
						>
							<div className={styles.iconWrapper}>
								<BsJournalBookmark size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/quiz/list'
							style={{
								color:
									location.pathname === '/quiz/list'
										? '#7353ea'
										: 'rgb(113 113 113)',
							}}
						>
							<div className={styles.iconWrapper}>
								<BsPatchQuestion size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/calendar'
							style={{
								color:
									location.pathname === '/calendar'
										? '#7353ea'
										: 'rgb(113 113 113)',
							}}
						>
							<div className={styles.iconWrapper}>
								<BsCalendar4Week size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/login'
							style={{
								color:
									location.pathname === '/login' ||
									location.pathname === '/register' ||
									location.pathname === '/user/info' ||
									location.pathname === '/user/edit'
										? '#7353ea'
										: 'rgb(113 113 113)',
							}}
						>
							<div className={styles.iconWrapper}>
								<TbLogin size={24} />
							</div>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
