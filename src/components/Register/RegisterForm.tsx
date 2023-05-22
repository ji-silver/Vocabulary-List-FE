import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import useUserValidator from '../../hooks/useUserValidator';
import { registerUser } from '../../apis/user';
import styles from './Register.module.scss';
import UserInput from '../common/UserInput/UserInput';
import UserButton from '../common/UserButton/UserButton';

type PropsTypes = {
	openAlert: (message: string, onClose: null | (() => void)) => void;
};

function RegisterForm({ openAlert }: PropsTypes) {
	const navigate = useNavigate();
	const initValues = {
		email: '',
		nickname: '',
		password: '',
		passwordConfirm: '',
	};
	const [values, setValues] = useState(initValues);
	const {
		errors,
		setErrors,
		userValidator,
		validationPass,
		setValidationPass,
	} = useUserValidator(initValues);

	const handleSubmit = async () => {
		try {
			const data = {
				userEmail: values.email,
				password: values.password,
				nickname: values.nickname,
			};
			const response = await registerUser(data);
			if (response.status === 200) {
				openAlert('회원가입이 완료되었습니다.', () => {
					navigate('/login');
				});
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					const errMsg = err.response.data.reason;
					return setErrors(prev => ({ ...prev, email: errMsg }));
				}
			}

			//console.log(err);
			openAlert('회원가입에 실패하였습니다.', null);
		}
	};

	useEffect(() => {
		if (validationPass) {
			handleSubmit();
			//유효성 검사 성공 여부 초기화
			setValidationPass(false);
		}
	}, [validationPass]);

	return (
		<form className={styles.form}>
			<ul>
				<li>
					<UserInput
						type='text'
						name='email'
						label='이메일'
						setValues={setValues}
						error={errors.email}
					/>
				</li>
				<li>
					<UserInput
						type='text'
						name='nickname'
						label='닉네임'
						setValues={setValues}
						condition='10자 이하 (특수 문자, 공백 제외)'
						error={errors.nickname}
					/>
				</li>
				<li>
					<UserInput
						type='password'
						name='password'
						label='비밀번호'
						condition='8자 이상 (대소문자, 특수 문자, 숫자 포함)'
						setValues={setValues}
						error={errors.password}
					/>
				</li>
				<li>
					<UserInput
						type='password'
						name='passwordConfirm'
						label='비밀번호 확인'
						setValues={setValues}
						error={errors.passwordConfirm}
					/>
				</li>
				<li>
					<UserButton
						type='submit'
						onClick={e => {
							e.preventDefault();
							userValidator(values);
						}}
					>
						가입하기
					</UserButton>
				</li>
			</ul>
		</form>
	);
}

export default RegisterForm;
