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
import { defineComponent } from 'vue';
import inview from './inview';

interface Data {
	timer: any;
}

export default defineComponent({
	props: {
		pullUpstatus: {
			type: String,
			default: 'unrequest'
		},
		pullUp: {
			type: Function,
			default: () => {
				return;
			}
		},
		list: {
			type: Array,
			default: () => []
		}
	},
	data(): Data {
		return {
			timer: 0
		};
	},
	async mounted() {
		await this.onSee();
		this.timer = setInterval(this.onSee, 500);
	},
	methods: {
		async reload() {
			await this.$emit('pull-up');
			this.timer = setInterval(this.onSee, 500);
		},
		onSee() {
			const isSee = inview(this.$el, {});
			if (
				isSee &&
				this.pullUpstatus !== 'requesting' &&
				this.pullUpstatus !== 'done' &&
				this.pullUpstatus !== 'error' &&
				this.pullUpstatus !== 'empty'
			) {
				this.$emit('pull-up');
			}
			if (this.pullUpstatus === 'error') {
				clearInterval(this.timer);
			}
		}
	},
	beforeUnmount() {
		clearInterval(this.timer);
	}
});
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
