<template>
	<div id="seeLoading" class="see-loading">
		<span v-if="pullUpstatus === 'done'">无更多数据</span>
		<span v-else-if="pullUpstatus === 'error'" @click="reload"
			>加载失败，请点击重新加载</span
		>
		<img v-else src="./loading.gif" alt="加载中..." />
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
			this.pullUpstatus !== 'error'
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
	position: absolute;
	left: 0;
	height: 4rem;
	width: 100%;
	text-align: center;

	span {
		font-size: 0.45rem;
		color: #adadad;
	}
}
</style>
