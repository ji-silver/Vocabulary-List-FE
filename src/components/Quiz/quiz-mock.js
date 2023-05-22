const fourProngProblems = [
	{
		answer: {
			wordId: '123wadfas',
			word: 'it',
			meanings: ['그것', '아기'],
			status: 0,
		},
		selections: [
			{ word: 'animal', meanings: ['짐승', '동물', '동물적'] },
			{ word: 'quick', meanings: ['빠른', '빨리', '속살'] },
			{ word: 'desk', meanings: ['책상', '프런트', '데스크'] },
		],
	},
	{
		answer: {
			wordId: '135dfas',
			word: 'animal',
			meanings: ['짐승', '동물', '동물적'],
			status: 0,
		},
		selections: [
			{ word: 'quick', meanings: ['빠른', '빨리', '속살'] },
			{ word: 'desk', meanings: ['책상', '프런트', '데스크'] },
			{ word: 'it', meanings: ['그것', '아기'] },
		],
	},
	{
		answer: {
			wordId: '125wadfas',
			word: 'quick',
			meanings: ['빠른', '빨리', '속살'],
			status: 0,
		},
		selections: [
			{ word: 'animal', meanings: ['짐승', '동물', '동물적'] },
			{ word: 'desk', meanings: ['책상', '프런트', '데스크'] },
			{ word: 'it', meanings: ['그것', '아기'] },
		],
	},
	{
		answer: {
			wordId: '113wadfas',
			word: 'desk',
			meanings: ['책상', '프런트', '데스크'],
			status: 0,
		},
		selections: [
			{ word: 'animal', meanings: ['짐승', '동물', '동물적'] },
			{ word: 'it', meanings: ['그것', '아기'] },
			{ word: 'quick', meanings: ['빠른', '빨리', '속살'] },
		],
	},
	{
		answer: {
			wordId: '113wadfas2',
			word: 'sad',
			meanings: ['슬픈'],
			status: 0,
		},
		selections: [
			{ word: 'animal', meanings: ['짐승', '동물', '동물적'] },
			{ word: 'it', meanings: ['그것', '아기'] },
			{ word: 'quick', meanings: ['빠른', '빨리', '속살'] },
		],
	},
	{
		answer: {
			wordId: '113wadfas1',
			word: 'happy',
			meanings: ['행복한'],
			status: 0,
		},
		selections: [
			{ word: 'animal', meanings: ['짐승', '동물', '동물적'] },
			{ word: 'it', meanings: ['그것', '아기'] },
			{ word: 'quick', meanings: ['빠른', '빨리', '속살'] },
		],
	},
];

const quizAnswers = [
	{ wordId: '123wadfas', word: 'it', meanings: ['그것', '아기'], status: 0 },
	{
		wordId: '135dfas',
		word: 'animal',
		meanings: ['짐승', '동물', '동물적'],
		status: 0,
	},
	{
		wordId: '125wadfas',
		word: 'quick',
		meanings: ['빠른', '빨리', '속살'],
		status: 1,
	},
	{
		wordId: '113wadfas',
		word: 'desk',
		meanings: ['책상', '프런트', '데스크'],
		status: 1,
	},
	{
		wordId: '113wadfas1',
		word: 'happy',
		meanings: ['행복한'],
		status: 0,
	},
	{
		wordId: '113wadfas2',
		word: 'sad',
		meanings: ['슬픈'],
		status: 0,
	},
];

export { fourProngProblems, quizAnswers };
