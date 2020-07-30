<template>
	<div>
		<VueAudios
			url="https://res-test-ssl.blueup.cn/xunfei/wav/20200707/1594115480997_o53tvafqus.wav"
			:duration="600"
		/>
		<VueAudios
			url="https://res-test-ssl.blueup.cn/xunfei/wav/20200706/1594029871054_kt03fzn950a.wav"
			:duration="469"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { VueAudios } from 'vue-audios';

@Component<HelpVueAudios>({
	components: {
		VueAudios
	}
})
export default class HelpVueAudios extends Vue {}
</script>

<style lang="less" scoped></style>
