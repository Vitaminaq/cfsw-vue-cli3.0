import cookie from 'js-cookie';

export const setAppState = (token: string) => {
	console.log('接受到token：', token);
	cookie.set('TOKEN', token);
};

export const getCookie = () => {
	return cookie.get('TOKEN');
};
