import React from 'react';
import styles from './CalendarToggle.module.scss';

export function CalendarToggle({
	setToggle,
}: {
	setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div id={styles['container']}>
			<div className={styles['toggle_switch']}>
				<input
					type='checkbox'
					id='chkTog4'
					onClick={() => {
						setToggle((prevToggle: boolean) => !prevToggle);
					}}
				/>
				<label htmlFor='chkTog4'>
					<span className={styles['toggle_track']}></span>
				</label>
			</div>
		</div>
	);
}
