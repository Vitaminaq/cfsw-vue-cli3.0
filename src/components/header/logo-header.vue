<template>
	<div>
		<header><span>Confenssion Wall</span></header>
		<div class="empty"></div>
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LogoHeader extends Vue {}
</script>
<style lang="less" scoped>
.empty {
	height: 46px;
}
header {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	text-align: center;
	background-color: #00dcff;
	font-size: 20px;
	color: white;
	height: 46px;
	line-height: 46px;
	z-index: 999;
}
</style>
