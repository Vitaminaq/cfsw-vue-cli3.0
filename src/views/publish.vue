<template>
	<div id="publish">
		<general-header :header-title="headerTitle">
			<button
				slot="btn"
				:disabled="disable"
				class="publishit"
				@click="publishIt"
			>
				发表
			</button>
		</general-header>
		<input
			id="input"
			v-model="title"
			v-focus
			type="text"
			placeholder="请输入标题"
		/>
		<textarea v-model="artic" placeholder="请输入正文" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Toast, closeLoading } from '../common/comjs';
import GeneralHeader from '@src/components/header/general-header.vue';
import FooterContent from '@src/components/footer/footer.vue';

@Component({
	components: {
		GeneralHeader,
		FooterContent
	}
})
export default class publish extends Vue {
	headerTitle: string = '发表文章';
	title: string = '';
	artic: string = '';
	disable: boolean = false;

	get publish() {
		return this.$vuexClass.publish;
	}

	async publishIt() {
		let params = {
			title: this.title,
			msg: this.artic
		};
		// this.$isEmpty(params);
		// if (this.isEmpty) return Toast('', '内容不能为空!');
		this.disable = true;
		Toast('loading', '发表中...');
		this.publish.$assignParams(params);
		await this.publish.userPublish();
		setTimeout(function() {
			closeLoading();
		}, 200);
		this.disable = false;
		Toast('', this.publish.res.data);
		if (this.publish.res.code !== 0) return;
		this.publish.$clearData();
		return this.$router.push({ name: 'chatroom' });
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#publish {
	.publishit {
		border-style: none;
		background-color: #fff;
		outline: none;
		font-size: 0.5rem;
		color: #00dcff;
	}

	input {
		margin-top: 1.6rem;
		padding-left: 0.15rem;
		padding-bottom: 0.2rem;
		width: 90%;
		font-size: 0.6rem;
		height: 0.8rem;
		border: none;
		border-bottom: #adadad dotted 1px;
	}

	textarea {
		height: 400px;
		width: 90%;
		overflow-y: auto;
		outline: none;
		border: none;
		padding-left: 0.15rem;
		padding-top: 0.3rem;
		font-size: 0.48rem;
		resize: none;
	}
}
</style>
