import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export type BookFormType = {
	name: string;
	description: string;
	start_lang: string;
	end_lang: string;
	short_id?: string;
};

// 단어장 추가
export const addedBook = async (token: string, formData: BookFormType) => {
	const response = await axios.post(`${baseUrl}/books`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 모든 단어장 조회
export const bookListAll = async (token: string) => {
	const response = await axios.get(`${baseUrl}/books/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 특정 단어장 조회
export const selectedBook = async (id: string, token: string) => {
	const response = await axios.get(`${baseUrl}/books/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 특정 단어장 정보 수정
export const updatedBook = async (
	id: string,
	token: string,
	formData: BookFormType,
) => {
	const response = await axios.put(`${baseUrl}/books/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 단어장 리스트 조회
export const getBooks = async (token?: string) => {
	let url = `${baseUrl}/books/sample`;
	let headers = {};

	if (token) {
		url = `${baseUrl}/books`;
		headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	const response = await axios.get(url, { headers });
	return response;
};

// 단어장 삭제
export const deleteBook = async (bookId: string, token: string) => {
	return await axios.delete(`${baseUrl}/books/${bookId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// 단어장 상태 정보 조회
export const getWords = async (bookId: string, token?: string) => {
	let url = `${baseUrl}/words/sample?bookId=${bookId}`;
	let headers = {};

	if (token) {
		url = `${baseUrl}/words?bookId=${bookId}`;
		headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	const response = await axios.get(url, { headers });
	return response;
};
