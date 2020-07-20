<template>
	<div class="see-loading">
		<div class="done" v-if="pullUpstatus === 'done'">无更多数据</div>
		<div class="error" v-else-if="pullUpstatus === 'error'" @click="reload">
			加载失败，请点击重新加载
		</div>
		<div v-else-if="pullUpstatus === 'empty'">
			<div v-if="!$slots.empty" class="empty">
				暂无数据
			</div>
			<slot name="empty" />
		</div>
		<div class="loading" v-else>
			<img class="load-img" src="./loading.gif" alt="加载中..." />
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import inview from './inview';

@Component
export default class SeeLoading extends Vue {
	@Prop({ default: 'unrequest' }) pullUpstatus!: string;
	@Prop({ default: () => {} }) pullUp!: any;
	@Prop({ default: '0px' }) scrollerTop!: string;
	timer: number = 0;

	@Watch('pullUpstatus')
	onchange(val: any) {
		console.log(val);
	}

	// async mounted() {
	// 	await this.see();
	// }
	// async see() {
	// 	const isSee = inview(this.$el);
	// 	if (
	// 		isSee &&
	// 		this.pullUpstatus !== 'requesting' &&
	// 		this.pullUpstatus !== 'done' &&
	// 		this.pullUpstatus !== 'error'
	// 	) {
	// 		await this.$emit('pullUp');
	// 		this.timer = setInterval(this.see, 500);
	// 	}
	// 	if (
	// 		isSee &&
	// 		this.pullUpstatus !== 'requesting' &&
	// 		this.pullUpstatus !== 'done' &&
	// 		this.pullUpstatus !== 'error'
	// 	) {
	// 		this.timer = setInterval(this.see, 500);
	// 	}
	// }
	// reload() {
	// 	this.pullUp();
	// }
	async mounted() {
		await this.onSee();
		this.timer = setInterval(this.onSee, 500);
	}
	async reload() {
		await this.$emit('pullUp');
		this.timer = setInterval(this.onSee, 500);
	}
	onSee() {
		let isSee = inview(this.$el, {});
		if (
			isSee &&
			this.pullUpstatus !== 'requesting' &&
			this.pullUpstatus !== 'done' &&
			this.pullUpstatus !== 'error' &&
			this.pullUpstatus !== 'empty'
		) {
			this.$emit('pullUp');
		}
		if (this.pullUpstatus === 'error') {
			clearInterval(this.timer);
		}
	}
	beforeDestroy() {
		clearInterval(this.timer);
	}
}
</script>

<style lang="less" scoped>
.see-loading {
	width: 100%;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: #adadad;

	.done,
	.error {
		height: 60px;
		width: 100%;
		line-height: 60px;
	}

	.loading,
	.empty {
		height: 100px;
		line-height: 100px;
		.load-img {
			height: 20px;
			width: 20px;
		}
	}
}
</style>
