<template>
	<div>
		我是目标h5页面

		<div @click="success">成功</div>
		<div @click="fail">失败</div>
		<div @click="back">直接返回</div>
		<div @click="toOtherPage">跳出其他页面</div>
		<!-- <div @click="pickPhoto">调起相册</div>
		<div v-if="path">原生确认失败:{{ path }}</div> -->
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component<ExampleUniWebview>({
	components: {}
})
export default class ExampleUniWebview extends Vue {
	public path: string = '';

	async mounted() {
		await this.$nextTick();
		document.addEventListener('UniAppJSBridgeReady', function() {
			window.uni.getEnv(function(res: any) {
				console.log('当前环境：' + JSON.stringify(res));
			});
		});
	}
	public success() {
		window.uni.postMessage({
			data: {
				action: 0
			}
		});
	}
	public fail() {
		// (window as any).getImage = (path: string) => {
		// 	console.log(path);
		// 	alert(path);
		// 	this.path = path;
		// 	delete (window as any).getImage;
		// };
		window.uni.postMessage({
			data: {
				action: 1
			}
		});
	}
	public back() {
		window.uni.navigateBack();
	}
	public toOtherPage() {
		window.uni.postMessage({
			data: {
				action: 2
			}
		});
	}
	public pickPhoto() {
		(window as any).getImage = (path: string) => {
			console.log(path);
			this.path = path;
			delete (window as any).getImage;
		};
		window.uni.postMessage({
			data: {
				action: 3
			}
		});
	}
}
</script>

<style lang="less" scoped></style>
