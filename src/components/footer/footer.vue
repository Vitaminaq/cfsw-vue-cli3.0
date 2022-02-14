<template>
	<footer>
		<div class="footer">
			<router-link
				v-for="item in list"
				:key="item.name"
				:to="{ name: item.toPathName }"
				:class="nowRouter !== item.toPathName ? 'leave' : ''"
			>
				{{ item.name }}
			</router-link>
		</div>
	</footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

interface RouterList {
	name: string;
	toPathName: string;
}

export default defineComponent({
	setup() {
		const list: Array<RouterList> = [
			{
				name: 'home',
				toPathName: 'blog-home'
			},
			{
				name: 'publish',
				toPathName: 'blog-home'
			},
			{
				name: 'center',
				toPathName: 'blog-home'
			}
		];
		return { list };
	},
	computed: {
		nowRouter() {
			return this.$route.name;
		}
	}
});
</script>
<style lang="less" scoped>
footer::before {
	content: '';
	display: block;
	position: relative;
	height: 50px;
	width: 100%;
	background-color: #fff;
}
.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	height: 50px;
	width: 100%;
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	// prettier-ignore
	// border-top: solid #adadad 1PX;
	// prettier-ignore
	box-shadow: 1PX 1PX 5PX #adadad;
	background-color: #fff;

	a {
		width: 33%;

		.icon-symbol {
			width: 25px;
			height: 25px;
		}
	}

	.router-link-exact-active {
		.icon-symbol {
			fill: #00dcff;
		}
	}

	.leave {
		fill: #adadad;
	}
}
</style>
