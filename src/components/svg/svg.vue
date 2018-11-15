<template>
	<svg
		:key="name"
		:class="`icon-${name}`"
		class="icon-symbol"
		aria-hidden="true"
	>
		<use :xlink:href="`#icons-${name}`" />
	</svg>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SvgContent extends Vue {
	@Prop({ default: '' }) name!: string;
}
</script>
