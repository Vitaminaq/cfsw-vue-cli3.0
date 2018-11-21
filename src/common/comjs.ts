/**
 * 通用函数
 */
import Vue from 'vue';

// 封装的toast函数
// const Toast = (mark: String, msg: String): void => {
// 	if (mark === 'loading') {
// 		// 加载动画toast
// 		Vue.prototype.$loading(msg);
// 	} else {
// 		// 正常提示toast
// 		Vue.prototype.$toast(msg);
// 	}
// };
// // 加载动画toast的关闭函数
// var closeLoading = (): void => {
// 	Vue.prototype.$loading.close();
// };

// 时间格式
const Time = function(str: number) {
	if (!str) return;
	let date: Date = new Date(str);
	let time: number = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
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

export { Toast, closeLoading, Time };
