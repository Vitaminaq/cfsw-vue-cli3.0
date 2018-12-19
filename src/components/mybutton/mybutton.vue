<template>
	<button
		type="button"
		class="btn"
		:class="disabled ? 'disabledBtn' : 'clickBtn'"
		:disabled="disabled"
		:style="btnStyle"
	>
		{{ value }}
	</button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

export interface BtnStyle {
	width?: String;
	height?: String;
	fontSize?: String;
}
export interface Button {
	disabled: Boolean;
	value: String;
	btnStyle?: BtnStyle;
}

@Component
export default class MyButton extends Vue {
	@Prop() disabled!: Boolean;
	@Prop() value!: String;
	@Prop({ default: () => {} }) btnStyle!: BtnStyle;
}
</script>

<style lang="less" scoped>
.btn {
	width: 100%;
	border: solid white 1px;
	border-radius: 5px;
	outline: none;
	color: white;
	font-size: 0.373333rem;

	&.clickBtn {
		background-color: #00dcff;
	}
	&.disabledBtn {
		background-color: #7bd2e0;
	}
}
</style>
