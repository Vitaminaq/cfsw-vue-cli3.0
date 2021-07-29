import cookie from 'js-cookie';

export interface cookieKeys {
	token: string;
	platform: 'ios' | 'android';
	channel: string;
	vid: string;
}

type Keys = keyof cookieKeys;

export const setCookie = <V>(key: Keys, value: V) => {
	cookie.set(key, value);
};

export const setCookies = (cookies: Record<string, any>) => {
	if (!cookies) return;
	Object.keys(cookies).forEach((key: any) => {
		setCookie(key, cookies[key] || '');
	});
};

export const getCookie = <K extends Keys>(key: K): cookieKeys[K] => {
	if (typeof window === 'undefined') return '' as cookieKeys[K];
	return cookie.get(key);
};

export const removeCookie = (key: Keys) => {
	cookie.remove(key);
};
