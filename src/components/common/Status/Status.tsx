import React, { ReactElement, useState } from 'react';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { updateStatus } from '../../../apis/word';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../recoil/userState';

type ChangeStatusProps = {
	initialStatus: number;
	id: string;
	setLoginAlertModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChangeStatus({
	initialStatus,
	id,
	setLoginAlertModal,
}: ChangeStatusProps): ReactElement {
	const [status, setStatus] = useState<number>(initialStatus);
	const userToken = useRecoilValue(userTokenState);

	const handleChangeStatus = async () => {
		if (userToken) {
			try {
				const updatedStatus = (status + 1) % 3;
				await updateStatus(userToken, id, updatedStatus);
				setStatus(updatedStatus);
			} catch (err) {
				console.log(err);
			}
		} else {
			if (setLoginAlertModal) setLoginAlertModal(true);
		}
	};

	function getStatusIcon() {
		switch (status) {
			case 1:
				return <BiMessageSquareCheck />;
			case 2:
				return <BiMessageSquareError />;
			default:
				return <BiMessageSquare />;
		}
	}
	return <div onClick={handleChangeStatus}>{getStatusIcon()}</div>;
}

export default ChangeStatus;
