import cookie from 'js-cookie';

export const setAppState = (token: string) => {
	console.log(token, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
	cookie.set('TOKEN', token);
};

export const getCookie = () => {
	console.log(cookie.get('TOKEN'), 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
	return cookie.get('TOKEN');
};
