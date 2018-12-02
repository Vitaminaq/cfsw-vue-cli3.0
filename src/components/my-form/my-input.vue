<template>
	<input
		v-model.trim="value"
		:type="type"
		:name="name"
		:placeholder="placeholder"
		@keyup="keyUp"
	/>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class MyInput extends Vue {
	@Prop({ default: '' }) value!: string;
	@Prop({ default: 'text' }) type!: string;
	@Prop({ default: '' }) name!: string;
	@Prop({ default: '请输入内容' }) placeholder!: string;

	keyUp() {
		this.$emit('keyUp');
	}
}
</script>
