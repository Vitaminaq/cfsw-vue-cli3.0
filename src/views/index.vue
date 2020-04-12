<template>
	<div class="index-contain">
		没有此路由
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
@Component<Index>({})
export default class Index extends Vue {
	public async mounted() {}
	public myParseInt(s: string | number, radix: number = 10) {
		if (!s || radix > 36 || radix < 2 || typeof radix !== 'number')
			return NaN;
		if (typeof s === 'number') return String(s).split('.')[0];
		if (typeof s !== 'string') return NaN;
		let res = 0;
		let mark = '';
		for (let i = 0; i < s.length; i++) {
			let c = s.charCodeAt(i);
			if (c > 65) {
				if (i === 0) return NaN;
				break;
			} else {
				c = c - 48;
			}
			if (c > -1) {
				res = res * radix + c;
			}
			if (c === -3) {
				mark = '-';
			}
		}
		return mark ? Number(`-${res}`) : res;
	}
	public delSame1(arr: number[]) {
		if (!arr || !arr.length) return [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				if (arr[i] === arr[j]) {
					arr.splice(j, 1);
				}
			}
		}
		return arr;
	}
	public delSame2(arr: number[]) {
		if (!arr) return;
		const len = arr.length;
		if (!len) return [];
		let pureArr: number[] = [];
		for (let i = 0; i < len; i++) {
			if (pureArr.indexOf(arr[i]) === -1) {
				pureArr.push(arr[i]);
			}
		}
		return pureArr;
	}
	public delSame3(arr: number[]) {
		if (!arr) return;
		const len = arr.length;
		if (!len) return [];
		let pureArr: number[] = [];
		let obj: any = {};
		for (let i = 0; i < len; i++) {
			const value: any = arr[i];
			const key = String(value);
			if (!obj[key]) {
				obj[key] = true;
				pureArr.push(value);
			}
		}
		return pureArr;
	}
	public delSame4(arr: number[]) {
		if (!arr) return;
		const len = arr.length;
		if (!len) return [];
		arr = arr.sort();
		for (let i = 1; i < arr.length; i++) {
			if (arr[i - 1] === arr[i]) {
				arr.splice(i, 1);
			}
		}
		return arr;
	}
	public bubbleSort(arr: number[]) {
		const len = arr.length;
		if (!len) return arr;
		for (let i = len - 1; i > 0; i--) {
			for (let j = i + 1; j < len - i - 1; j++) {
				if (arr[j] < arr[j - 1]) {
					let mid = arr[j];
					arr[j] = arr[j - 1];
					arr[j] = mid;
				}
			}
		}
		return arr;
	}
	public arrFlatten(a: any[], n?: any[]) {
		if (!n) n = [];
		const len = a.length;
		for (let i = 0; i < len; i++) {
			if (a[i] instanceof Array) {
				this.arrFlatten(a[i], n);
			} else {
				n.push(a[i]);
			}
		}
		return n;
	}
	public myCall(obj: any, ...arg: any[]) {
		if (!(obj instanceof Object)) obj = {};
		obj.fn = this;
		obj.fn(...arg);
		delete obj.fn;
	}
}
</script>
<style lang="less" scoped>
.index-contain {
	height: 100%;
	width: 100%;
	text-align: center;
}
</style>
