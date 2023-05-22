import moment from 'moment';

/**Word 타입선언 */
export interface Word {
	bookId: string;
	createdAt: string;
	meanings: string[];
	ownerEmail: string;
	short_id: string;
	status: number;
	updatedAt: string;
	word: string;
	__v: number;
	_id: string;
}
export interface Quiz {
	_id: string;
	short_id: string;
	category: string;
	ownerEmail: string;
	correctWords: string[];
	incorrectWords: string[];
	createdAt: string;
}

export function joinMeanings(meanings: string[]): string {
	return meanings.join(', ');
}
/**createdAt 예쁜 문자열로 바꾸기 */
export function markDate(uglyDate: string): string {
	const originalDate = uglyDate;
	const formattedDate = moment(originalDate).format('YYYY-MM-DD');
	return formattedDate;
}

export function prettyDate(uglyDate: string): string {
	const originalDate = uglyDate;
	const formattedDate = moment(originalDate).format('MM.DD');
	return formattedDate;
}
