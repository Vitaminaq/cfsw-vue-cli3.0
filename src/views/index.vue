<template>
	<div class="index-contain">
		<div class="header">header</div>
		<div class="content" @click="add">
			<div class="content-i"></div>
		</div>
		<div class="footer">
			<a href="http://beian.miit.gov.cn">湘ICP备20014353号</a>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
@Component<Index>({})
export default class Index extends Vue {
	public arr = [1, 2, 3, { a: 99 }];

	public add() {}
}
</script>
<style lang="less" scoped>
.index-contain {
	// height: 100%;
	position: relative;
	width: 100%;
	text-align: center;

	.content {
		// display: flex;
		flex: 1;
		height: 100%;
		width: 100%;
	}

	.content-i {
		background-color: red;
		width: 100vh;
		height: 50vh;
		// height: 50%;
		// padding: 50%;
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}
}
</style>
