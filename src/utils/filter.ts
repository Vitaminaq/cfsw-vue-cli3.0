/**
 * 通用函数
 */
/**
 * 补零操作
 */
export const addZero = (val: number): string => {
	return val > 9 ? String(val) : `0${val}`;
};
/**
 * 格式化时间
 * @param time 时间戳
 * @param formatStr 格式化时间的类型
 */
export const formatDateToStr = (time: number, formatStr: string) => {
	const date = new Date();
	date.setTime(time);
	return formatStr
		.replace(/yyyy|YYYY/, String(date.getFullYear()))
		.replace(/yy|YY/, String(date.getFullYear()))
		.replace(/MM/, addZero(date.getMonth() + 1))
		.replace(/M/g, String(date.getMonth() + 1))
		.replace(/dd|DD/, addZero(date.getDate()))
		.replace(/d|D/g, String(date.getDate()))
		.replace(/hh|HH/, addZero(date.getHours()))
		.replace(/h|H/g, String(date.getHours()))
		.replace(/mm/, addZero(date.getMinutes()))
		.replace(/m/g, String(date.getMinutes()))
		.replace(/ss|SS/, addZero(date.getSeconds()))
		.replace(/s|S/g, String(date.getSeconds()));
};

// 时间戳转化为2018-10-19 16:30
export const timestampToDateTime = (value: number) => {
	if (!value) return;
	const endTime = new Date(value);
	const endTimeFormat = `${endTime.getFullYear()}-${
		endTime.getMonth() + 1 >= 10
			? endTime.getMonth() + 1
			: '0' + (endTime.getMonth() + 1)
	}-${
		endTime.getDate() >= 10 ? endTime.getDate() : '0' + endTime.getDate()
	}  ${
		endTime.getHours() >= 10 ? endTime.getHours() : '0' + endTime.getHours()
	}:${
		endTime.getMinutes() >= 10
			? endTime.getMinutes()
			: '0' + endTime.getMinutes()
	}`;
	return endTimeFormat;
};
/**
 * 将时间转成离现在多久
 * @param str 时间戳
 */
export const timeFromNow = (str: number) => {
	if (!str) return;
	const endTime = new Date(str);
	const time = new Date().getTime() - endTime.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
	if (time < 0) {
		return '';
	} else if (time / 3600000 < 24) {
		return `今天 ${
			endTime.getHours() >= 10
				? endTime.getHours()
				: '0' + endTime.getHours()
		}:${
			endTime.getMinutes() >= 10
				? endTime.getMinutes()
				: '0' + endTime.getMinutes()
		}`;
	} else {
		return `${formatDateToStr(str, 'MM')}-${formatDateToStr(str, 'DD')} ${
			endTime.getHours() >= 10
				? endTime.getHours()
				: '0' + endTime.getHours()
		}:${
			endTime.getMinutes() >= 10
				? endTime.getMinutes()
				: '0' + endTime.getMinutes()
		}`;
	}
};

// 时间格式
export const timeFormat = function(str: number) {
	if (!str) return;
	const date: Date = new Date(str);
	const time: number = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
	if (time < 0) {
		return;
	} else if (time / 1000 < 30) {
		return '刚刚';
	} else if (time / 1000 < 60) {
		return `${(time / 1000).toFixed(0)}秒前`;
	} else if (time / 60000 < 60) {
		return `${(time / 60000).toFixed(0)}分钟前`;
	} else if (time / 3600000 < 24) {
		return `${(time / 3600000).toFixed(0)}小时前`;
	} else if (time / 86400000 < 31) {
		return `${(time / 86400000).toFixed(0)}天前`;
	} else if (time / 2592000000 < 12) {
		return `${(time / 2592000000).toFixed(0)}月前`;
	} else {
		return `${(time / 31536000000).toFixed(0)}年前`;
	}
};
