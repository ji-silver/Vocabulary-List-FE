import React, { useEffect, useState } from 'react';
/** 컴포넌트 */
import Navigation from '../components/common/Navigation/Navigation';
import CalendarPaper from '../components/Calendar/CalendarPaper';
import { CalendarToggle } from '../components/Calendar/CalendarToggle';
import Header from '../components/common/Header/Header';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';
import { CalendarTypeAtom } from './../recoil/calendar';
import { useRecoilValue, useRecoilState } from 'recoil';

function CalendarPage(): JSX.Element {
	const [toggle, setToggle] = useState<boolean>(true);
	const [loginAlertModalOpen, setLoginAlertModalOpen] =
		useState<boolean>(false);
	const [calendarType, setCalendarType] =
		useRecoilState<string[]>(CalendarTypeAtom);

	useEffect(() => {
		if (toggle) {
			setCalendarType(['words']);
		} else {
			setCalendarType(['quiz']);
		}
	}, [toggle, setCalendarType]);

	return (
		<>
			<Header title='달력' />
			<Navigation />
			<main>
				<CalendarToggle setToggle={setToggle} />
				<CalendarPaper setLoginAlertModal={setLoginAlertModalOpen} />
			</main>
			{loginAlertModalOpen && (
				<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
			)}
		</>
	);
}

export default CalendarPage;
