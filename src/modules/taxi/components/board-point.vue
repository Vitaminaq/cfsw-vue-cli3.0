<template>
	<div class="board-mark">
		<div class="mark-text-contain">
			<div class="left" v-if="many">
				<div class="time">1分钟</div>
				<div class="text">预计上车</div>
			</div>
			<div :class="['right', !many && 'right-many']">
				<div class="position">{{ startAddress.name }}</div>
				<div class="driver-detail">{{ driversText }}</div>
			</div>
		</div>
		<img class="point-icon" src="./images/board-point.png" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Taxi from '../store';

interface Address {
	name: string;
	lat: number;
	lng: number;
}

interface Data {
	driversNum: number;
}

export default defineComponent({
	data(): Data {
		return {
			driversNum: 0,
		};
	},
	computed: {
		taxiStore(): Taxi {
			return this.$store.taxi;
		},
		startAddress(): Address {
			return this.taxiStore.startAddress;
		},
		driversText({ driversNum }): string {
			if (!driversNum) return '附近暂无车辆';
			if (driversNum <= 3) return '附近车辆较少';
			return '一分钟上车';
		},
		many({ driversNum }): boolean {
			return driversNum > 3;
		},
	},
	watch: {
		startAddress: {
			async handler(val) {
				// const { lat, lng } = val;
				// const { cityId } = this.taxiStore.searchCityId;
				// const r = await this.taxiStore.api.getNearDrivers({
				// 	latitude: lat,
				// 	longitude: lng,
				// 	cityId,
				// });
				// if (r.code !== 0) return;
				// this.driversNum = r.data.total || 0;
			},
			deep: true,
		},
	},
});
</script>
<style lang="less" scoped>
.board-mark {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -100%, 0);
	z-index: 9999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.mark-text-contain {
		color: #fff;
		border-radius: 50px;
		display: flex;
		align-items: center;
		font-size: 14px;
		line-height: 1;
		font-weight: 600;
		white-space: nowrap;
		position: relative;
		top: -10px;
		background-color: #f1fffb;
		height: auto;

		&:before {
			content: '';
			position: absolute;
			border-top: 6px solid #00a176;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid transparent;
			left: 50%;
			margin-left: -6px;
			top: 100%;
			height: 0;
			width: 0;
		}

		.left {
			background-color: #f1fffb;
			height: 100%;
			padding: 0 10px 0 20px;
			border-radius: 50px 0 0 50px;

			.time {
				color: #00a176;
				font-size: 12px;
				white-space: nowrap;
			}

			.text {
				font-size: 10px;
				margin-top: 5px;
				color: #333;
				white-space: nowrap;
			}
		}

		.right {
			padding: 10px 20px 10px 20px;
			background: #00a176;
			border-radius: 0 50px 50px 0;
			transition: all 0.3s;

			&.right-many {
				border-radius: 50px;
			}
		}

		.position {
			max-width: 156px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.driver-detail {
			white-space: nowrap;
			margin-top: 5px;
			font-size: 11px;
			font-weight: 400;
		}
	}

	.point-icon {
		width: 24px;
		height: 36px;
	}
}
</style>