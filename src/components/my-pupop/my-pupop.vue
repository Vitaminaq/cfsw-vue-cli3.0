<template>
	<div class="my-pupop" @touchmove.prevent>
		<div
			class="my-pupop-bg"
			:style="{ opacity: bgOpacity }"
			@click="type !== 'loading' && type !== 'toast' && $emit('close')"
		></div>
		<div v-if="type === 'toast' && !icon" class="min-toast">
			{{ message }}
		</div>
		<div v-else>
			<div class="my-pupop-content">
				<div
					v-if="type === 'loading' || type === 'toast'"
					class="loading-content"
				>
					<img v-if="!icon" src="./images/loading.gif" alt="" />
					<img
						v-else-if="['success', 'warn', 'error'].includes(icon)"
						:src="require(`./images/${icon}.svg`)"
					/>
					<img v-else :src="`${icon}`" alt="" />
				</div>
				<div v-if="message" class="my-pupop-message">
					{{ message }}
				</div>
				<div class="my-pupop-operate" v-if="buttons.length">
					<button
						v-for="item in buttons"
						:key="item.text"
						class="my-pupop-btn"
						@click="opetateBtn(item || '')"
					>
						{{ item.text }}
					</button>
				</div>
				<div class="my-pupop-operate" v-if="btnText">
					<button class="my-pupop-btn" @click="opetateBtn()">
						{{ btnText }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
export interface MyPupupButton {
	text: string;
	callback?: () => any;
}

@Component<MyPupup>({})
export default class MyPupup extends Vue {
	@Prop({ default: 'toast' }) public type!:
		| 'confirm'
		| 'alert'
		| 'loading'
		| 'toast';
	@Prop({ default: '' }) public message!: string;
	@Prop({
		default: () => []
	})
	public buttons!: MyPupupButton;
	@Prop({ default: () => {} }) public callback!: any;
	@Prop({ default: '' }) public btnText!: string;
	@Prop({ default: 500 }) public duration!: number;
	@Prop({ default: '' }) public icon!: string;
	@Prop({ default: 0.4 }) public bgOpacity!: number;

	public timer: any = 0;

	public async mounted() {
		if (this.type === 'loading' || this.type === 'toast') {
			if (this.callback) {
				const r = await this.callback();
				this.$emit('close', r);
				return;
			} else {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.$emit('close', null);
				}, this.duration);
			}
		}
	}

	public async opetateBtn(btn: MyPupupButton) {
		if (!btn && !this.callback) {
			this.$emit('close', null);
			return;
		}
		let r = null;
		if (!btn && this.callback) {
			r = await this.callback();
			this.$emit('close', r);
			return;
		}
		const { text, callback } = btn;
		if (callback) {
			r = await callback();
		}
		if (!callback && this.callback && text === '确定') {
			r = await this.callback();
		}
		this.$emit('close', r);
	}
}
</script>
<style lang="less" scoped>
.my-pupop {
	.my-pupop-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9998;
		background-color: #333;
	}
	@keyframes show {
		from {
			opacity: 0;
			transform: scale3d(0.3, 0.3, 0.3);
		}

		50% {
			opacity: 1;
		}
	}
	.min-toast {
		position: fixed;
		top: 50%;
		left: 50%;
		font-size: 14px;
		transform: translateY(-50%) translateX(-50%);
		background-color: #333;
		opacity: 0.8;
		color: #fff;
		padding: 4px 10px;
		border-radius: 10px;
		animation: show 0.2s;
	}
	.my-pupop-content {
		position: fixed;
		top: 50%;
		left: 15%;
		right: 15%;
		z-index: 9999;
		padding-top: 22px;
		transform: translateY(-50%);
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;

		.loading-content {
			text-align: center;
			img {
				height: 40px;
				width: 40px;
			}
		}

		.my-pupop-message {
			margin-bottom: 20px;
			font-size: 14px;
			text-align: center;
			font-weight: 300;
		}
		.my-pupop-operate {
			display: flex;
			margin-top: 5px;
			// prettier-ignore
			border-top: 1PX solid #dfdfe6;
			.my-pupop-btn {
				margin: 0;
				padding: 12px 0;
				outline: none;
				border-style: none;
				background-color: rgba(255, 255, 255, 0);
				font-size: 15px;
				flex-grow: 1;
				cursor: pointer;
				&:nth-child(1) {
					// prettier-ignore
					border-right: 1PX solid #dfdfe6;
				}
			}
		}
	}
}
</style>
