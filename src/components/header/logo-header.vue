<template>
	<div>
		<header><span>{{ $t('title')}}</span></header>
		<div class="empty"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ZH_CN from './i18n/ZH_CN';

export default defineComponent({
	name: 'logo-header',
	i18n: {
		messages: {
			ZH_CN
		}
	}
});
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
