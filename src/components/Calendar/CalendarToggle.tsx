import React from 'react';
import styles from './CalendarToggle.module.scss';
export function CalendarToggle() {
	return (
		<div id={styles['container']}>
			<div className={styles['toggle_switch']}>
				<input type='checkbox' id='chkTog4' />
				<label htmlFor='chkTog4'>
					<span className={styles['toggle_track']}></span>
				</label>
			</div>
		</div>
	);
}
