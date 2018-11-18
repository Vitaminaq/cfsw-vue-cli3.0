<template>
	<header id="header"><span>Confenssion Wall</span></header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LogoHeader extends Vue {}
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
</style>
