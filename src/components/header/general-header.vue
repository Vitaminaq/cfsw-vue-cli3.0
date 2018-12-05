<template>
	<div>
		<header>
			<router-link to="" event="[]" @click.native="back">
				<svg-icon name="back" />
			</router-link>
			<span class="title">{{ headerTitle }}</span>
			<span v-if="!hasBtn" class="right"></span>
			<slot v-else name="btn" />
		</header>
		<div class="empty"></div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class GeneralHeader extends Vue {
	@Prop({ default: '' }) headerTitle!: string;
	@Prop({ default: '' }) backPathName!: string;

	get hasBtn() {
		return !!this.$slots.btn;
	}

	back() {
		if (!this.backPathName) return this.$router.go(-1);
		return this.$router.push({ name: this.backPathName });
	}
}
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
	height: 46px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	// prettier-ignore
	border-bottom: solid #adadad 1PX;
	font-size: 0.5rem;
	z-index: 999;

	a {
		width: auto;
		margin-left: 15px;
		padding-top: 7px;

		.icon-symbol {
			width: 22px;
			height: 22px;
			fill: #adadad;
		}
	}

	.right {
		width: 22px;
		height: 10px;
		margin-right: 15px;
	}
}
</style>
