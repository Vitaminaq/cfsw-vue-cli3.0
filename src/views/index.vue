<template>
	<div class="page">
		<div class="index">index页面</div>
		<div @click="to">去列表</div>
		<div class="content">
			<div class="tab" @click="toggle">
				<div data-type="A">A</div>
				<div data-type="B">B</div>
			</div>
			 <!-- v-rescroll="{ name: scrollKey, domType: 'tab' }" -->
			<div class="list">
				<div v-if="currentIndex === 0">
					<div
						v-for="(item, index) in list0"
						:key="index"
						@click="to"
					>
						{{ item }}
					</div>
				</div>
				<div v-if="currentIndex === 1">
					<div v-for="(item, index) in list1" :key="index">
						{{ item }}
					</div>
				</div>
			</div>
		</div>
		<vue-audio url="https://img.tukuppt.com/newpreview_music/08/99/49/5c897788e421b53181.mp3" mode="next-loop" />
		<vue-audio url="https://img.tukuppt.com/newpreview_music/08/99/45/5c8971b5b0c2c1474.mp3" mode="next-loop" />
		<vue-audio url="https://img.tukuppt.com/newpreview_music/08/99/52/5c8979e84ec822372.mp3" mode="next-loop" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'index',
	data() {
		return {
			currentIndex: 0,
			list0: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			list1: [11, 22, 33, 44, 55, 66, 77, 88, 99],
		};
	},
	computed: {
		currentList() {
			return (this as any)[`list${(this as any).currentIndex}`];
		},
		scrollKey() {
			return `index${(this as any).currentIndex}`;
		}
	},
	methods: {
		to() {
			this.$router.push({ path: '/blog/home' });
		},
		toggle(e: any) {
			const { type } = e.target.dataset;
			if (type === 'A') {
				this.currentIndex = 0;
			} else {
				this.currentIndex = 1;
			}
		}
	}
});
</script>
<style lang="less" scoped>
.page {
	display: flex;
	flex-direction: column;
	height: 100vh;
}
.index {
	font-size: 37.5px;
}
.content {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.tab {
		height: 40px;
		width: 100%;
		display: flex;

		& > div {
			flex: 1;
		}
	}
	.list {
		flex: 1;
		overflow: auto;

		& > div {
			height: 100px;

			& > div {
				height: 100px;
			}
		}
	}
}
</style>
