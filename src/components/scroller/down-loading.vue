<template>
	<div
		class="down-loading"
		:style="{ height: height + 'px', lineHeight: height + 'px' }"
	>
		<img v-if="isShow" src="./loading.gif" />
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DownLoading extends Vue {
	@Prop() height!: number;
	@Prop() isShow!: Boolean;
}
</script>

<style scoped>
.down-loading {
	width: 100%;
}
</style>
