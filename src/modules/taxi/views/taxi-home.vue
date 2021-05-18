<template>
	<div class="map-container">
		<div id="map"></div>
		<!-- 上车标记点 -->
		<BoardPoint />
		<div class="current-location" @click.stop="backCurrentLocation">
			回到当前位置
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
	geocoder,
	Geolocation,
	getDrivingRoute,
	getLocation,
	getDrivePath,
} from '../publics';

import BoardPoint from '../components/board-point.vue';

import icon_start from './images/taxi-point-start.png';
import icon_end from './images/taxi-point-end.png';

interface GeolocationReturn {
	getLocation: (
		success: (option: { lat: number; lng: number }) => void,
		fail: (err: any) => void,
		option: {
			timeout: number;
		}
	) => void;
}

interface Data {
	geolocation: Geolocation | null;
	map: any;
	certerPoint: {
		lat: number;
		lng: number;
		name: string;
	};
	timer: any;
}

export default defineComponent({
	components: {
		BoardPoint,
	},
	data(): Data {
		return {
			geolocation: null,
			map: null,
			certerPoint: {
				lat: 0,
				lng: 0,
				name: '定位中',
			},
			timer: 0,
		};
	},
	computed: {
		taxiStore() {
			return this.$store.taxi;
		},
	},
	async mounted() {
		// getLocation();
		const r = await this.getLocation();
		if (!r) return;
		const { lat, lng } = r;
		// 获取当前中心点的详细信息
		this.getCenterDetail();
		// //定义地图中心点坐标
		const center = new window.TMap.LatLng(lat, lng);
		//定义map变量，调用 TMap.Map() 构造函数创建地图
		this.map = new window.TMap.Map('map', {
			center, //设置地图中心点坐标
			zoom: 17.2, //设置地图缩放级别
		});
		// 监听地图平移
		this.map.on('center_changed', () => {
			this.onCenterChange();
		});

		// 移除控件
		this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
		this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.SCALE);
		this.map.removeControl(
			window.TMap.constants.DEFAULT_CONTROL_ID.ROTATION
		);

		// 规划路线
		const pl = await getDrivePath({
			from: `${lat},${lng}`,
			to: '22.575149,113.863048',
		});
		console.log(pl, '7777777777777777777777777777777');
		const routes = await getDrivingRoute({
			origin: `${lng},${lat}`,
			destination: '113.863048,22.575149',
		});
		this.getRouteLine(routes, lat, lng);
		console.log(routes, 'ccccccccccccccccccccccccc');

		// new window.TMap.MultiPolyline({
		// 	id: 'polyline-layer', //图层唯一标识
		// 	map: this.map, //绘制到目标地图
		// 	//折线样式定义
		// 	styles: {
		// 		style_blue: new window.TMap.PolylineStyle({
		// 			color: '#3777FF', //线填充色
		// 			width: 6, //折线宽度
		// 			borderWidth: 5, //边线宽度
		// 			borderColor: '#FFF', //边线颜色
		// 			lineCap: 'round', //线端头方式
		// 		}),
		// 	},
		// 	//折线数据定义
		// 	geometries: [
		// 		{
		// 			id: 'pl_1', //折线唯一标识，删除时使用
		// 			styleId: 'style_blue', //绑定样式名
		// 			paths: pl,
		// 			// rainbowPaths
		// 		},
		// 	],
		// });

		// //初始化marker
		// new window.TMap.MultiMarker({
		// 	id: 'marker-layer', //图层id
		// 	map: this.map,
		// 	styles: {
		// 		//点标注的相关样式
		// 		marker: new window.TMap.MarkerStyle({
		// 			width: 25,
		// 			height: 35,
		// 			anchor: { x: 16, y: 32 },
		// 			src:
		// 				'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png',
		// 		}),
		// 	},
		// 	geometries: [
		// 		{
		// 			//点标注数据数组
		// 			id: 'demo',
		// 			styleId: 'marker',
		// 			position: new window.TMap.LatLng(lat, lng),
		// 			properties: {
		// 				title: 'marker',
		// 			},
		// 		},
		// 	],
		// });
	},
	methods: {
		// 地图变化时，获取中心点
		onCenterChange() {
			this.getCenterDetail();
		},
		// 获取当前地图中心点信息
		async getCenterDetail() {
			clearTimeout(this.timer);
			this.timer = setTimeout(async () => {
				const { lat, lng } = this.map.getCenter();
				const r = await geocoder({ location: `${lat},${lng}` });
				if (r) {
					const { city, name } = r;
					this.taxiStore.$setStartAddress({ lat, lng, name });
					// 获取当前cityId
					// this.taxiStore.searchCityId.loadData({
					// 	city_name: city,
					// });
				}
			}, 300);
		},
		// 获取当前位置
		async getLocation() {
			if (!this.geolocation) {
				this.geolocation = new Geolocation();
			}
			const r = await this.geolocation.getLocation();
			if (!r) {
				// this.$popup.alert({
				// 	message: '定位失败',
				// });
			}
			return r;
		},
		// 回到当前位置
		async backCurrentLocation() {
			const r = await this.getLocation();
			if (!r) return;
			const { lat, lng } = r;
			const center = new window.TMap.LatLng(lat, lng);
			this.map.easeTo({ center });
		},
		// 路线预估
		getRouteLine(res: any, lat: number, lng: number) {
			if (!res) return;
			const { paths } = res.route;
			if (!paths || !paths.length) return;
			const allPoints = [];
			const polyline = [];
			const steps = paths[0].steps;
			let oldPints1 = ''; // 上个路况倒数最后一点
			let oldPints2 = ''; // 上个路况倒数第二点
			for (let i = 0; i < steps.length; i++) {
				const tmcs = steps[i].tmcs;
				for (let m = 0; m < tmcs.length; m++) {
					const points = [];
					const tmcsPolyline = tmcs[m].polyline.split(';');
					for (let j = 0; j < tmcsPolyline.length; j++) {
						if (m === 0 && j === 0) {
							if (oldPints2 !== '') {
								// 连接上一个路况线  让路线平滑
								points.push(
									new window.TMap.LatLng(
										parseFloat(oldPints2.split(',')[1]),
										parseFloat(oldPints2.split(',')[0])
									)
								);
							}
							if (
								oldPints1 !== '' &&
								oldPints1 !== tmcsPolyline[0]
							) {
								// 防止出现路线断节
								points.push(
									new window.TMap.LatLng(
										parseFloat(oldPints1.split(',')[1]),
										parseFloat(oldPints1.split(',')[0])
									)
								);
							}
						}
						points.push(
							new window.TMap.LatLng(
								parseFloat(tmcsPolyline[j].split(',')[1]),
								parseFloat(tmcsPolyline[j].split(',')[0])
							)
						);
						allPoints.push(
							new window.TMap.LatLng(
								parseFloat(tmcsPolyline[j].split(',')[1]),
								parseFloat(tmcsPolyline[j].split(',')[0])
							)
						);
						if (
							tmcsPolyline.length - 1 === j &&
							tmcs.length - 1 === m
						) {
							oldPints1 = tmcsPolyline[j];
						}
						if (
							tmcsPolyline.length - 2 === j &&
							tmcs.length - 1 === m
						) {
							oldPints2 = tmcsPolyline[j];
						}
					}
					let color = '#28B48F';
					if (tmcs[m].status === '缓行') {
						color = '#f4dc5b';
					} else if (
						tmcs[m].status === '拥堵' ||
						tmcs[m].status === '严重拥堵'
					) {
						color = '#da4141';
					}
					polyline.push({
						path: points,
						color: color,
						arrowLine: true,
						width: 7,
						borderColor: color,
						borderWidth: 1,
					});
				}
			}
			console.log(polyline, allPoints, 'mmmmmmmmmmmmmmmmmmmmmmm');
			new window.TMap.MultiPolyline({
				id: 'polyline-layer', //图层唯一标识
				map: this.map, //绘制到目标地图
				//折线样式定义
				styles: {
					style_blue: new window.TMap.PolylineStyle({
						color: '#3777FF', //线填充色
						width: 3, //折线宽度
						borderWidth: 3, //边线宽度
						borderColor: '#FFF', //边线颜色
						lineCap: 'round', //线端头方式
					}),
				},
				//折线数据定义
				geometries: [
					{
						id: 'pl_1', //折线唯一标识，删除时使用
						styleId: 'style_blue', //绑定样式名
						paths: allPoints,
						rainbowPaths: polyline,
					},
				],
			});
			// 选择起始之后，移动视图
			setTimeout(() => {
				this.map.fitBounds(
					new window.TMap.LatLngBounds(
						new window.TMap.LatLng(
							Math.min(lat, 22.575149),
							Math.min(lng, 113.863048)
						),
						new window.TMap.LatLng(
							Math.max(lat, 22.575149),
							Math.max(lng, 113.863048)
						)
					),
					{
						padding: 40,
					}
				);
			}, 1000);

			new window.TMap.MultiMarker({
				id: 'marker-layer', //图层id
				map: this.map,
				styles: {
					//点标注的相关样式
					marker: new window.TMap.MarkerStyle({
						width: 25,
						height: 35,
						anchor: { x: 16, y: 32 },
						src: icon_start,
					}),
				},
				geometries: [
					{
						//点标注数据数组
						id: 'demo',
						styleId: 'marker',
						position: new window.TMap.LatLng(lat, lng),
						properties: {
							title: 'marker',
						},
					},
				],
			});

			// 下方文本
			new window.TMap.MultiLabel({
				id: 'label-layer',
				map: this.map,
				styles: {
					label: new window.TMap.LabelStyle({
						color: '#3777FF', //颜色属性
						size: 20, //文字大小属性
						offset: { x: 0, y: 20 }, //文字偏移属性单位为像素
						angle: 0, //文字旋转属性
						alignment: 'center', //文字水平对齐属性
						verticalAlignment: 'middle', //文字垂直对齐属性
					}),
				},
				geometries: [
					{
						id: 'label', //点图形数据的标志信息
						styleId: 'label', //样式id
						position: new window.TMap.LatLng(lat, lng), //标注点位置
						content: '市民中心', //标注文本
						properties: {
							//标注点的属性数据
							title: 'label',
						},
					},
				],
			});

			// 上方气泡
			new window.TMap.InfoWindow({
				map: this.map,
				position: new window.TMap.LatLng(lat, lng), //设置信息框位置
				content: '<p style="font-size: 12px">我是气泡!</p>', //设置信息框内容
				offset: { x: 0, y: -50 },
			});

			new window.TMap.MultiMarker({
				id: 'marker-layer1', //图层id
				map: this.map,
				styles: {
					//点标注的相关样式
					marker: new window.TMap.MarkerStyle({
						width: 25,
						height: 35,
						anchor: { x: 16, y: 32 },
						src: icon_end,
					}),
				},
				geometries: [
					{
						//点标注数据数组
						id: 'demo1',
						styleId: 'marker',
						position: new window.TMap.LatLng(22.575149, 113.863048),
						properties: {
							title: 'marker',
						},
					},
				],
			});
		},
	},
});
</script>
<style lang="less" scoped>
.map-container {
	position: relative;
	height: 100vh;
	width: 100%;

	#map {
		height: 100%;
		width: 100%;
	}

	.board-mark {
		// background-color: #00a176;
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
			background: #00a176;
			border-radius: 50px;
			padding: 10px 20px 8px 20px;
			display: flex;
			align-items: center;
			font-size: 14px;
			line-height: 1;
			font-weight: 600;
			white-space: nowrap;
			position: relative;
			top: -10px;

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
		}

		.point-icon {
			width: 24px;
			height: 36px;
		}
	}

	.current-location {
		background-color: #00a176;
		position: absolute;
		bottom: 20%;
		right: 10%;
		z-index: 9999;
	}
}
</style>