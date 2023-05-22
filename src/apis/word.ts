import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

//단어 가져오기
export const getWords = async (token: string) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

//샘플 단어 가져오기
export const getSampleWords = async () => {
	const response = await axios.get(`${baseUrl}/words/sample`);
	return response;
};

//특정 단어장의 단어 가져오기
export const getWordsByBook = async (token: string, id: string) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			bookId: id,
		},
	});
	return response;
};
//

//단어장 가져오기
export const getBookName = async (token: string, id: string) => {
	const response = await axios.get(`${baseUrl}/books/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log(response);
	return response;
};
//

//단어 검색
export const findWordById = async (token: string, word: string) => {
	const response = await axios.get(`${baseUrl}/search/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			word: word,
		},
	});
	console.log(response.data);
	return response;
};
//

//선택 단어 삭제
export const deleteWords = async (token: string, id: string) => {
	const response = await axios.delete(`${baseUrl}/words/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};
//

//patch
//단어 상태 설정
export const updateStatus = async (
	token: string,
	id: string,
	status: number,
) => {
	const response = await axios.patch(
		`${baseUrl}/words/${id}`,
		{ status: `${status}` },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	console.log(response);
	return response;
};

//get
//단어 필터링
export const filterByStatus = async (token: string, status: number) => {
	const response = await axios.get(`${baseUrl}/words/status/${status}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

type WordFormType = {
	word: string;
	meanings: string[];
	//bookId?: string;
};

// 단어 추가
export const addedWord = async (token: string, formData: WordFormType) => {
	const response = await axios.post(`${baseUrl}/words`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 특정 단어 가져오기
export const selectedWord = async (id: string, token: string) => {
	const response = await axios.get(`${baseUrl}/words/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 특정 단어 정보 수정
export const updatedWord = async (
	id: string,
	token: string,
	formData: WordFormType,
) => {
	const response = await axios.patch(`${baseUrl}/words/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log(response);
	return response;
};

// 단어 크롤링
export const crawlingWord = async (lang: string, searchWord: string) => {
	const response = await axios.get(`${baseUrl}/meanings`, {
		params: {
			lang: lang,
			word: searchWord,
		},
	});
	return response;
};

//여러개 단어 가져오기
export const multiWords = async (token: string, wordIds: string[]) => {
	const response = await axios.get(
		`${baseUrl}/words/multiple/${wordIds.join(',')}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response;
};

//퀴즈 결과 저장
export const postQuizResult = async (
	token: string,
	formData: {
		category: string;
		correctWords: string[];
		incorrectWords: string[];
	},
) => {
	const response = await axios.post(`${baseUrl}/quiz`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};
