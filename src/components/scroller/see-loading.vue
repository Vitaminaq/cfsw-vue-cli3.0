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
import { Vue, Component, Prop } from 'vue-property-decorator';
import inview from './inview';

@Component
export default class SeeLoading extends Vue {
	@Prop({ default: 'unrequest' }) pullUpstatus!: string;
	timer: number = 0;

	mounted() {
		this.timer = setInterval(this.see, 500);
		this.see();
	}
	see() {
		const isSee = inview(this.$el);
		if (
			isSee &&
			this.pullUpstatus !== 'requesting' &&
			this.pullUpstatus !== 'done' &&
			this.pullUpstatus !== 'error'
		) {
			return this.$emit('pullUp');
		}
	}
	reload() {
		this.$emit('pullUp');
	}
	beforeDestroy() {
		clearInterval(this.timer);
	}
}
</script>

<style lang="less" scoped>
.see-loading {
	height: 4rem;
	text-align: center;

	span {
		font-size: 0.45rem;
		color: #adadad;
	}
}
</style>
