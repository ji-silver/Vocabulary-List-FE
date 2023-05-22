import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { infoUser } from '../../apis/user';
import { userTokenState } from '../../recoil/userState';
import { SiRabbitmq } from 'react-icons/si';

type PropsTypes = {
	openAlert: (message: string, onClose: null | (() => void)) => void;
};

function UserInfoDetail({ openAlert }: PropsTypes) {
	const navigate = useNavigate();
	const userToken = useRecoilValue(userTokenState);
	const [userInfo, setUserInfo] = useState({
		email: '',
		nickname: '',
	});

	const getUserInfo = async () => {
		if (!userToken) return navigate('/login');
		try {
			const response = await infoUser(userToken);
			const { userEmail, nickname } = response.data;
			if (response.status === 200) {
				setUserInfo({
					email: userEmail,
					nickname,
				});
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return navigate('/login');
				}
			}

			//console.log(err);
			openAlert('회원 정보를 불러오는데 실패하였습니다.', null);
		}
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<>
			<li>
				<span>
					<SiRabbitmq />
					이메일
				</span>
				{userInfo.email && userInfo.email}
			</li>
			<li>
				<span>
					<SiRabbitmq />
					닉네임
				</span>
				{userInfo.nickname && userInfo.nickname}
			</li>
		</>
	);
}

export default UserInfoDetail;
