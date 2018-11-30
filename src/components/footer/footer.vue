<template>
	<footer class="footer">
		<router-link
			v-for="item in list"
			:key="item.name"
			:to="{ name: item.toPathName }"
			:class="nowRouter !== item.toPathName ? 'leave' : ''"
		>
			<svg-icon :name="item.name" />
		</router-link>
	</footer>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
interface routerList {
	name: string;
	toPathName: string;
}

@Component
export default class FooterContent extends Vue {
	list: Array<routerList> = [
		{
			name: 'home',
			toPathName: 'chatroom'
		},
		{
			name: 'publish',
			toPathName: 'publish'
		},
		{
			name: 'center',
			toPathName: 'PersonalCenter'
		}
	];

	get nowRouter() {
		return this.$route.name;
	}
}
</script>
<style lang="less" scoped>
.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	height: 1.4rem;
	width: 100%;
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	// prettier-ignore
	border-top: solid #adadad 1PX;
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
