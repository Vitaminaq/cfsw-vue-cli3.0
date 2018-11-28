<template>
	<header id="header">
		<transition
			name="head-animate"
			:duration="300"
			enter-active-class="animated lightSpeedIn delay-3s"
		>
			<span v-show="isShow">Confenssion Wall</span>
		</transition>
	</header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LogoHeader extends Vue {
	isShow: boolean = false;
	mounted() {
		// setTimeout(() => {
		this.isShow = true;
		// }, 2000);
	}
	beforeDestroy() {
		this.isShow = false;
	}
}
</script>
<style lang="less" scoped>
#header {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	background-color: #00dcff;
	font-size: 20px;
	color: white;
	height: 46px;
	line-height: 46px;
	z-index: 999;
}
// .head-animate-enter {

// }
</style>
