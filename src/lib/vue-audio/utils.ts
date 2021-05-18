// 秒转化为 时分秒
export const secondToDate = (result: number) => {
	const h =
		Math.floor(result / 3600) < 10
			? '0' + Math.floor(result / 3600)
			: Math.floor(result / 3600);
	const m =
		Math.floor((result / 60) % 60) < 10
			? '0' + Math.floor((result / 60) % 60)
			: Math.floor((result / 60) % 60);
	const s =
		Math.floor(result % 60) < 10
			? '0' + Math.floor(result % 60)
			: Math.floor(result % 60);
	if (h === '00') return m + ':' + s;
	return h + ':' + m + ':' + s;
};
