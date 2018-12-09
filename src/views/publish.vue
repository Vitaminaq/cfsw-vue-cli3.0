<template>
	<div id="publish">
		<general-header :header-title="headerTitle">
			<button
				slot="btn"
				:disabled="disable"
				:class="[
					'publishit',
					!title || !artic ? 'disable-publish' : ''
				]"
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
		<vue-html5-editor
			:content="artic"
			:z-index="1"
			@change="updateData"
		></vue-html5-editor>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
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
		if ((this as any).isEmpty(params)) {
			(this as any).$toast('请填写完整信息!');
			return;
		}
		this.disable = true;
		this.publish.$assignParams(params);
		await this.publish.userPublish();
		this.disable = false;
		if (this.publish.res.code !== 0) {
			return (this as any).$toast(this.publish.res.data);
		}
		this.publish.$clearData();
		return this.$router.push({ name: 'chatroom' });
	}

	updateData(val: string) {
		this.artic = val;
		console.log(this.artic);
	}
}
</script>

<style lang="less" scoped>
#publish {
	text-align: center;
	width: 100%;
	overflow-x: hidden;

	button {
		width: auto;
		margin-right: 15px;
	}

	.publishit {
		border-style: none;
		background-color: #fff;
		outline: none;
		font-size: 0.5rem;
		color: #00dcff;

		&.disable-publish {
			color: #adadad;
		}
	}

	input {
		margin: 10px 0;
		padding-left: 5px;
		padding-bottom: 7px;
		width: 90%;
		font-size: 0.6rem;
		height: 30px;
		border: none;
		// prettier-ignore
		border-bottom: #adadad dotted 1PX;
	}
}
</style>
