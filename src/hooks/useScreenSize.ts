import React, { useEffect, useState } from 'react';

function useScreenSize() {
	const [isPcView, setIsPcView] = useState(
		window.matchMedia('(min-width: 850px)').matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 850px)');

		const handleMediaQueryChange = (e: {
			matches: boolean | ((prevState: boolean) => boolean);
		}) => {
			setIsPcView(e.matches);
		};

		mediaQuery.addEventListener('change', handleMediaQueryChange);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaQueryChange);
		};
	}, []);

	return isPcView;
}

export default useScreenSize;
