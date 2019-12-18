<template>
	<swiper v-if="isShow" :options="swiperOption" ref="mySwiper">
		<swiper-slide v-for="(item1, index) in list" :key="index">
			<div class="contain">
				<!-- <div v-for="(item2, index1) in item1" :key="index1">
					{{ item2 }}
				</div> -->
				<ruby v-for="(item2, index1) in item1" :key="index1">
					{{ item2.text }} <rt>{{ item2.py }}</rt></ruby
				>
			</div>
		</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
		<div class="swiper-button-prev" slot="button-prev"></div>
		<div class="swiper-button-next" slot="button-next"></div>
		<div class="swiper-scrollbar" slot="scrollbar"></div>
	</swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css';

import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
	name: 'carrousel',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			swiperOption: {
				// some swiper options/callbacks
				// 所有的参数同 swiper 官方 api 参数
				// ...
			},
			isShow: false
		};
	},
	computed: {
		list() {
			return Array.from({ length: 15 }, (v, i) =>
				Array.from({ length: 1000 }, (v1, i1) => {
					return {
						py: 'long',
						text: '龙'
					};
				})
			);
		}
	},
	mounted() {
		// current swiper instance
		// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
		console.log('this is current swiper instance object', this.swiper);
		this.isShow = true;
		// this.swiper.slideTo(3, 1000, false);
	}
};
</script>
<style lang="less" scoped>
.contain {
	height: 100%;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
}
</style>
<style>
.swiper-container {
	height: 100%;
}
</style>
