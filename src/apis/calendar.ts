import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// 모든 단어장 조회
export const calendarGetAll = async (token: string) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

// 모든 단어장 조회
export const calendarGetAllWords = async (
	token: string,
	year: number,
	month: number,
) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
// 오늘 단어 가져오기
export const calendarGetToday = async (
	token: string,
	year: number,
	month: number,
	day: number,
) => {
	const response = await axios.get(
		`${baseUrl}/words/calendar?year=${year}&month=${month}&date=${day}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};
