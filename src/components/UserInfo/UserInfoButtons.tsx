import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import Cookies from 'js-cookie';
import UserButton from '../common/UserButton/UserButton';

type PropsTypes = {
	openAlert: (message: string, onClose: null | (() => void)) => void;
};

function UserInfoButtons({ openAlert }: PropsTypes) {
	const setUserToken = useSetRecoilState(userTokenState);
	const handleLogout = () => {
		openAlert('로그아웃 되었습니다.', () => {
			Cookies.remove('token');
			setUserToken('');
			window.location.reload();
		});
	};

	return (
		<>
			<li>
				<UserButton type='link' path='/user/edit'>
					회원 정보 수정
				</UserButton>
			</li>
			<li>
				<UserButton onClick={handleLogout}>로그아웃</UserButton>
			</li>
		</>
	);
}

export default UserInfoButtons;
