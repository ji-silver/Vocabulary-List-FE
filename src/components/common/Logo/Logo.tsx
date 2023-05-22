import React from 'react';
import styles from './Logo.module.scss';
import { SiRabbitmq } from 'react-icons/si';

type LogoProps = {
	style?: React.CSSProperties;
};

function Logo({ style }: LogoProps) {
	return (
		<div className={styles.container} style={style}>
			<div className={styles.image}>
				<SiRabbitmq />
			</div>
			<h1>뿅뿅 단어장</h1>
		</div>
	);
}

export default Logo;
