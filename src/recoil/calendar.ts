import { atom } from 'recoil';

export const CalendarTypeAtom = atom<string[]>({
	key: 'CalendarTypeAtom',
	default: [],
});
