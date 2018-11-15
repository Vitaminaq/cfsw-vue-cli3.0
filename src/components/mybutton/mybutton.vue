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
import { State, Action } from 'vuex-class';

@Component
export default class MyButton extends Vue {
	@Prop() disabled!: Boolean;
	@Prop() value!: String;
	@Prop({ default: () => {} }) btnStyle!: MyButton.Button<MyButton.BtnStyle>;
}
</script>

<style scoped>
.btn {
	border: solid white 1px;
	border-radius: 5px;
	color: white;
	font-size: 0.373333rem;
}
.clickBtn {
	background-color: #00dcff;
}
.disabledBtn {
	background-color: #7bd2e0;
}
</style>
