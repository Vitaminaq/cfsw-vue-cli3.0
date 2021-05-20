<template>
  <div @click.stop="close">
    <div class="wefly-preview-bg" :style="{ opacity: bgOpacity }"></div>
	<div class="wefly-preview-index">{{idx + 1}}/{{len}}</div>
    <img
      v-if="isOne"
      class="wefly-preview-img"
      :style="relStyle"
      :src="currentImg"
    />
    <div
      v-else
      class="wefly-preview-img-swiper"
      :style="swiperStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <img
        class="wefly-preview-imgs"
        :style="{ width: `${screenW}px`, opacity: imgOpacity }"
        v-for="(img, index) in imgList"
        :key="index"
        :src="img"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Data {
  style: RelStyle | null;
  timer: any;
  timer1: any;
  timer2: any;
  bgOpacity: number;
  imgOpacity: number;
  idx: number;
  startX: number;
  totalDistance: number;
  distance: number;
  screenW: number;
  swiperStyle: any;
}
interface RelStyle {
  height: string;
  width: string;
  top: string;
  left: string | number;
  transform?: string;
  opacity?: number;
}

export default defineComponent({
  props: {
    imgList: {
      type: Array as PropType<string[]>,
      default: () => [],
      required: true,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    rect: {
      type: Object as PropType<DOMRect | null>,
      default: () => {
        return {};
      },
    },
    opacity: {
      type: Number,
      default: 0.8,
    },
  },
  data(): Data {
    return {
      style: null,
      timer: 0,
      timer1: 0,
      timer2: 0,
      bgOpacity: 0,
	  imgOpacity: 0,
      idx: 0,
      startX: 0,
      totalDistance: 0,
      distance: 0,
      screenW: 0,
      swiperStyle: {},
    };
  },
  computed: {
    currentImg(): string {
      return this.imgList[this.idx];
    },
    isOne(): boolean {
      return this.imgList.length < 2;
    },
	len(): number {
		return this.imgList.length;
	},
    relStyle(): RelStyle {
      const { rect } = this;
      if (!rect) {
        return (
          this.style || {
            height: "auto",
            width: "100%",
            top: "50%",
            left: 0,
            transform: "translate3d(0, -50%, 0)",
            opacity: 0,
          }
        );
      }
      const { height, width, top, left } = rect;
      return (
        this.style || {
          height: `${height}px`,
          width: `${width}px`,
          top: `${top}px`,
          left: `${left}px`,
          transform: "translate3d(0, 0, 0)",
        }
      );
    },
  },
  watch: {
    currentIndex: {
      handler(val: number) {
        if (val === this.idx) return;
        this.idx = val;
      },
      immediate: true,
    },
  },
  mounted() {
    const maxWidth = window.screen.width;
    this.screenW = maxWidth;
    if (!this.isOne) {
      this.totalDistance = -maxWidth * this.idx;
      this.swiperStyle.transform = `translate3d(${this.totalDistance}px, -50%, 0)`;
	  this.timer = setTimeout(() => {
		this.bgOpacity = this.opacity;
		this.imgOpacity = 1;
	  }, 10);
	  return;
    }
    this.timer = setTimeout(() => {
      const { rect } = this;
      if (!rect) {
        this.style = {
          ...this.relStyle,
          opacity: 1,
        };
      } else {
        const ratio = maxWidth / rect.width;
        this.style = {
          height: `${rect.height * ratio}px`,
          width: `${maxWidth}px`,
          top: "50%",
          left: 0,
          transform: "translate3d(0, -50%, 0)",
          opacity: 1,
        };
      }
      this.bgOpacity = this.opacity;
    }, 10);
  },
  methods: {
    close() {
      if (this.isOne) {
        this.style = null;
      } else {
        this.imgOpacity = 0;
      }
      this.bgOpacity = 0;
      this.timer = setTimeout(() => {
        this.$emit("close");
      }, 310);
    },
    onTouchStart(e: any) {
      const touch = e.changedTouches[0];
      if (!touch || this.swiperStyle.transition) return;
      this.startX = touch.clientX;
    },
    onTouchMove(e: any) {
      const touch = e.changedTouches[0];
      if (!touch || this.swiperStyle.transition) return;
      this.distance = touch.clientX - this.startX;
      this.swiperStyle.transform = `translate3d(${
        this.totalDistance + this.distance
      }px, -50%, 0)`;
    },
    onTouchEnd() {
      if (this.swiperStyle.transition) return;
      this.swiperStyle.transition = "all 0.3s";
      const isRight = this.distance < 0;
      if (Math.abs(this.distance) / this.screenW > 0.3) {
		const noFirst = !isRight && this.idx;
		const noLast = isRight && this.idx !== this.len - 1;
		if (noFirst || noLast) {
			this.totalDistance = isRight ? this.totalDistance - this.screenW : this.totalDistance + this.screenW;
		}
        this.swiperStyle.transform = `translate3d(${this.totalDistance}px, -50%, 0)`;
        noLast && this.idx++;
        noFirst && this.idx--;
        this.$emit("change", this.idx);
      } else {
        this.swiperStyle.transform = `translate3d(${this.totalDistance}px, -50%, 0)`;
      }
      this.timer2 = setTimeout(() => {
        this.swiperStyle.transition = "";
      }, 300);
    },
  },
  beforeUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  },
});
</script>
<style lang="less">
.wefly-preview-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.wefly-preview-img {
  position: fixed;
  z-index: 10000;
  object-fit: cover;
  transition: all 0.3s;
}
.wefly-preview-index {
	position: fixed;
	top: 20px;
	font-size: 14px;
	color: #fff;
	z-index: 10001;
	left: 50%;
	transform: translate3d(-50%, 0, 0);
}
.wefly-preview-img-swiper {
  position: fixed;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  z-index: 10000;
  display: flex;
  flex-wrap: nowrap;

  .wefly-preview-imgs {
    height: auto;
    object-fit: contain;
  }
}
</style>
