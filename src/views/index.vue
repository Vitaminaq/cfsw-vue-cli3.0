<template>
	<div class="index-contain">
		<div class="footer">
			<a href="http://beian.miit.gov.cn">湘ICP备20014353号</a>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
@Component<Index>({})
export default class Index extends Vue {}
</script>
<style lang="less" scoped>
.index-contain {
	height: 100%;
	width: 100%;
	text-align: center;

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}
}
</style>
