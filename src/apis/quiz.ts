import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export type TypeFourProngsQuiz = {
	bookOption: string[];
	numberOption: number;
	wordStatusOption: number[];
};

//사지선다 데이터 갖고오기
export const getFourProngsQuiz = async (
	token: string,
	formData: TypeFourProngsQuiz,
) => {
	const { bookOption, numberOption, wordStatusOption } = formData;

	const response = await axios.get(
		`${baseUrl}/quiz/four-prong?bookId=${bookOption.join(
			',',
		)}&number=${numberOption}&status=${wordStatusOption.join(',')}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response;
};

// 답안 데이터 post
export const postQuizResult = async (
	token: string,
	formData: {
		category: string;
		correctWords: string[];
		incorrectWords: string[];
	},
) => {
	await axios.post(`${baseUrl}/quiz`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return;
};
