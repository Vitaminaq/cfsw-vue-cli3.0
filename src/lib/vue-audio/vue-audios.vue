<template>
	<div class="audio-contain">
		<audio
			ref="audio"
			class="audio"
			id="audio"
			:src="url"
			:preload="preload"
			@canplay="onCanPlay"
		></audio>
		<div class="operate-btn" @click.stop="onOperate">
			<img v-if="!isPlaying" src="./images/play.png" />
			<img v-else src="./images/pause.png" />
		</div>
		<div class="time">{{ formatCurrentTime }}</div>
		<div class="progress-bar" ref="progress" @click.stop="onSeek">
			<div
				class="progress-current"
				:style="{
					width: slideProgress ? currentSlide : currentProgress
				}"
			></div>
			<div
				class="point-contain"
				:style="{
					left: slideProgress ? currentSlide : currentProgress
				}"
				@touchstart.stop="onTouchStart"
				@touchmove.stop="onTouchMove"
				@touchend.stop="onTouchEnd"
			>
				<div class="progress-point"></div>
			</div>
		</div>
		<div class="duration">
			{{ formatDuration }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { secondToDate } from './utils';
import voiceManage from './voice-manage';

interface Data {
	timer: any;
	timer1: any;
	timer2: any;
	currentTime: number;
	startX: number;
	slideProgress: number;
	containWidth: number;
	baseDuration: number;
}
type Mode = 'none' | 'loop' | 'next' | 'next-loop'; // 无 | 单曲循环 | 下一首 | 列表循环
type Preload = 'auto' | 'meta' | 'none'; // 预加载 | 预初始 | 无

export default defineComponent({
	props: {
		duration: {
			type: Number,
			default: 0
		},
		url: {
			type: String,
			default: '',
			required: true
		},
		mode: {
			type: String as PropType<Mode>,
			default: 'none'
		},
		preload: {
			type: String as PropType<Preload>,
			default: 'auto'
		}
	},
	data(): Data {
		return {
			timer: 0,
			timer1: 0,
			timer2: 0,
			currentTime: 0,
			startX: 0,
			slideProgress: 0,
			containWidth: 0,
			baseDuration: 0
		}
	},
	computed: {
		formatCurrentTime(): string {
			if (this.slideProgress)
			    return secondToDate(this.relDuration * this.slideProgress);
			return secondToDate(this.currentTime);
		},
		relDuration(): number {
			return this.duration || this.baseDuration;
		},
		formatDuration(): string {
			return secondToDate(this.relDuration);
		},
		isPlaying(): boolean {
			const arr = voiceManage.getItem(this.url);
			if (!arr.length) return false;
			return !!arr[0].isPlaying;
		},
		currentProgress(): string {
			return (this.currentTime / this.relDuration) * 100 + '%';
		},
		currentSlide(): string {
			return this.slideProgress * 100 + '%';
		}
	},
	watch: {
		isPlaying(val: boolean) {
			if (val) {
				this.updateTime();
			} else {
				clearInterval(this.timer);
			}
		}
	},
	async mounted() {
		await this.$nextTick();
		this.timer2 = setTimeout(() => {
			const { duration } = (this as any).$refs.audio;
			if (duration && !this.baseDuration) {
				this.baseDuration = duration;
			}
		}, 1000);
		voiceManage.subscribe({
			key: this.url,
			el: this.$refs.audio
		});
		const bcr = (this as any).$refs.progress.getBoundingClientRect();
		this.containWidth = bcr.width;
	},
	methods: {
		onOperate() {
			voiceManage.toggle(this.url);
		},
		onTouchStart(e: any) {
			if (!e.touches.length) return;
			this.startX = e.touches[0].pageX;
		},
		onTouchMove(e: any) {
			if (!e.touches.length) return;
			clearInterval(this.timer);
			const d = e.touches[0].pageX - this.startX;
			const p = d / this.containWidth;
			const sp = this.currentTime / this.relDuration + p;
			this.slideProgress = sp >= 1 ? 1 : sp <= 0 ? 0 : sp;
		},
		async onTouchEnd() {
			await this.$nextTick();
			const t = this.slideProgress * this.relDuration;
			(this as any).$refs.audio.currentTime = t;
			this.updateTime();
			this.timer1 = setTimeout(() => {
				this.slideProgress = 0;
			}, 600);
		},
		async onSeek(e: any) {
			await this.$nextTick();
			const t = (e.offsetX / this.containWidth) * this.relDuration;
			!this.isPlaying && voiceManage.toggle(this.url);
			(this as any).$refs.audio.currentTime = t;
		},
		updateTime() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.currentTime = (this as any).$refs.audio.currentTime;
				if (this.currentTime === (this as any).$refs.audio.duration) {
					this.currentTime = 0;
					voiceManage.setItem(this.url);
					switch (this.mode) {
						case 'none':
							clearInterval(this.timer);
							break;
						case 'loop':
							this.currentTime = 0;
							(this as any).$refs.audio.currentTime = 0;
							this.onOperate();
						case 'next':
						case 'next-loop':
							clearInterval(this.timer);
							voiceManage.setNextItem(this.url, this.mode);
							break;
					}
				}
			}, 600);
		},
		onCanPlay() {
			this.baseDuration = (this as any).$refs.audio.duration;
		}
	},
	 beforeUnmount() {
		voiceManage.cancel(this.url);
		clearInterval(this.timer);
		clearTimeout(this.timer1);
		clearTimeout(this.timer2);
	}
});
</script>

<style lang="less">
.audio-contain {
	width: 278px;
	height: 40px;
	background: #fff;
	background-color: #f7f7f7;
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	align-items: center;
	font-size: 12px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(144, 147, 153, 1);
	margin-top: 10px;

	.audio {
		display: none;
	}

	.operate-btn {
		width: 28px;
		height: 28px;
		background: #12dba5;
		border-radius: 100px;
		margin: 0 8px 0 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			height: 15px;
			width: 16px;
		}
	}

	.progress-bar {
		height: 2px;
		position: relative;
		background: rgba(0, 194, 149, 0.2);
		flex: 1;
		margin: 10px;
		border-radius: 10px;

		.progress-current {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			width: 0;
			border-radius: 10px 0 0 10px;
			background: #12dba5;
			z-index: 1;
		}

		.point-contain {
			// prettier-ignore
			height: 16PX;
			// prettier-ignore
			width: 16PX;
			position: absolute;
			top: 50%;
			transform: translate(-30%, -50%);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.progress-point {
			height: 8px;
			width: 8px;
			border-radius: 8px;
			background: #12dba5;
		}
	}
	.duration {
		margin-right: 10px;
	}
}
</style>
