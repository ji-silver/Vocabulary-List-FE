import React, { useEffect, useState } from 'react';
/**컴포넌트 */
import Navigation from '../components/common/Navigation/Navigation';
import CalendarPaper from '../components/Calendar/CalendarPaper';
import { CalendarToggle } from '../components/Calendar/CalendarToggle';
import Header from '../components/common/Header/Header';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';

function CalendarPage() {
	const [toggle, setToggle] = useState(true);
	const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);

	return (
		<>
			<Header title='달력' />
			<Navigation />
			<main>
				<CalendarToggle />
				<CalendarPaper setLoginAlertModal={setLoginAlertModalOpen} />
			</main>
			{loginAlertModalOpen && (
				<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
			)}
		</>
	);
}

export default CalendarPage;
