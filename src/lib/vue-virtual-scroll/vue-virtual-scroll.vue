<template>
    <div class="virtual-scroll" ref="virtualScroll">
        <slot name="header" />
        <ul class="list" :style="scrollStyle">
            <VueVirtualScrollItem
                v-for="item in realList"
                :key="item.key"
                :item="item"
                :scrollNum="getItemScrollNum(item.index)"
                :direction="direction"
                @updateHeight="updateHeight"
            >
                <template v-slot:default="slotProps">
                    <slot :item="slotProps.item1"></slot>
                </template>
            </VueVirtualScrollItem>
	    </ul>
        <slot name="footer" />
    </div>
</template>
<script lang="ts">
import { defineComponent, withDirectives } from 'vue';
import './polyfill';

import VueVirtualScrollItem from './vue-virtual-scroll-item.vue';

interface ScrollInfo {
    startIndex: number;
    virtualTop: number;
    cacheHeight: number;
    itemMap: Map<number, number>;
    scrollMap: Map<number, number>;
}

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$virtualScroll: {
            [key: string]: ScrollInfo;
        };
	}
}

interface PoolItem {
    height: number; // 高度
    id: number; // 创建编号
}

interface LocalListItem {
    index: number; // 索引
    key: string | number; // 唯一key值
    contain: any;
}

interface Data {
    startIndex: number;
    virtualTop: number;
    itemMap: Map<number, number>;
    scrollMap: Map<number, number>;
    lastOver: number;
    cacheHeight: number;
    timerId: number;
    oldWorH: number;
}

type Direction = 'vertical' | 'horizontal';

export default defineComponent({
    components: {
        VueVirtualScrollItem
    },
    props: {
        // 列表
        list: {
            type: Array,
            default: () => []
        },
        // key值
        ownKey: {
            type: String,
            default: ''
        },
        // 缓冲
        buffer: {
            type: Number,
            default: 10
        },
        // 长度
        activeLen: {
            type: Number,
            default: 30
        },
        // 需要保存滚动状态的key
        reScrollKey: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: 'vertical'
        }
    },
    computed: {
        isVertical(): boolean {
            return this.direction === 'vertical';
        },
        scrollKey(): 'scrollTop' | 'scrollLeft' {
            return this.isVertical ? 'scrollTop' : 'scrollLeft';
        },
        len(): number {
            return this.list.length;
        },
        localList():LocalListItem[] {
            const { ownKey } = this;
            return this.list.map((v: any, i) => {
                return {
                    index: i,
                    key: ownKey ? v[ownKey] : i,
                    contain: v
                }
            });
        },
        endIndex(): number {
            return this.startIndex + this.activeLen;
        },
        scrollHeight(): number {
            let total = 0;
            this.itemMap.forEach(i => {
                total = total + i;
            })
            return total;
        },
        scrollStyle(): any {
            if (this.direction === 'vertical') {
                return { height: `${this.scrollHeight || this.cacheHeight}px` };
            }
            return { width: `${this.scrollHeight || this.cacheHeight}px` };
        },
        realList(): LocalListItem[] {
            return this.localList.slice(this.startIndex, this.endIndex);
        },
    },
    data(): Data {
        return {
            startIndex: 0,
            virtualTop: 0,
            itemMap: new Map(),
            scrollMap: new Map(),
            lastOver: 0,
            cacheHeight: 0,
            timerId: 0,
            oldWorH: 0
        }
    },
    created() {
        if (!this.$root || !this.$root.$virtualScroll || !this.reScrollKey) return;
        const { startIndex, cacheHeight, itemMap, scrollMap, virtualTop } = this.$root.$virtualScroll[this.reScrollKey];
        this.cacheHeight = cacheHeight;
        this.startIndex = startIndex;
        this.itemMap = itemMap;
        this.scrollMap = scrollMap;
        this.virtualTop = virtualTop;
    }, 
    async mounted() {
        window.addEventListener('resize', this.resize.bind(this));
        await this.$nextTick();
        const { offsetHeight, offsetWidth } = this.$el;
        this.oldWorH = this.isVertical ?  offsetWidth : offsetHeight;
        if (this.virtualTop) {
            this.$el[this.scrollKey] = this.virtualTop;
        };
        this.listen();
    },
    methods: {
        updateHeight(h: number, i: number) {
            const r = this.getItemMap(i);
            if (r === h) return;
            this.itemMap.set(i, h);
            if (i < this.activeLen) {
                this.setScrollNum(i);
            } else {
                if (i % this.buffer === 0) {
                    for (let n = i; n < i + this.buffer; n++) {
                        this.setScrollNum(n);
                    }
                }
            }
        },
        setScrollNum(i: number) {
            if (!i) return this.scrollMap.set(i, 0);
            const r = this.getItemMap(i - 1);
            const pre = this.scrollMap.get(i - 1) || 0;
            this.scrollMap.set(i, r + pre);
        },
        getItemMap(i: number) {
            const r = this.itemMap.get(i);
            return typeof r === 'undefined' ? 0 : r;
        },
        getItemScrollNum(i: number) {
            const r = this.scrollMap.get(i);
            return typeof r === 'undefined' ? this.scrollHeight : r;
        },
        listen() {
            const scrollNum = this.$el[this.scrollKey];
            const isNext = this.virtualTop < scrollNum;
            this.virtualTop = scrollNum;                                                                                                               
            const overIndex = this.getOver(scrollNum);
            if (overIndex !== this.lastOver && overIndex) {
                // 计算滚动的条目
                const n = Math.ceil(Math.abs((overIndex - this.lastOver) / this.buffer));
                this.lastOver = overIndex;

                // 向后
                if (isNext) {
                    if (this.endIndex - overIndex <= this.buffer && this.endIndex - overIndex > 0) {
                        this.startIndex = this.startIndex + this.buffer * n;
                    };
                } else {
                    if (this.startIndex && overIndex - this.startIndex <= this.buffer) {
                        this.startIndex = this.startIndex - this.buffer * n;
                    }
                }
            }
            this.timerId = window.requestAnimFrame(this.listen.bind(this));
        },
        // 计算触发的边界值
        getOver(sn: number) {
            let i = this.startIndex;
            let scrollNum = this.getItemScrollNum(i);

            while(i < this.endIndex) {
                const r = this.getItemMap(i);
                if (sn > scrollNum && sn < scrollNum + r)
                    break;
                i ++;
                scrollNum = scrollNum + r;
            }

            return i;
        },
        resize() {
            const { offsetHeight, offsetWidth } = this.$el;
            const wOrH = this.isVertical ?  offsetWidth : offsetHeight;
            const ratio = wOrH / this.oldWorH;
            for (let i = 0; i < this.endIndex; i++) {
                const r = this.getItemMap(i);
                this.itemMap.set(i, r * ratio);
                const s = this.getItemScrollNum(i);
                this.scrollMap.set(i, s * ratio);
            }
            this.oldWorH = wOrH;
        }
    },
    beforeUnmount() {
        window.cancelAnimationFrame && window.cancelAnimationFrame(this.timerId);
        window.removeEventListener('resize', this.resize);
        if (!this.$root || !this.reScrollKey) return;
        if (!this.$root.$virtualScroll) {
            this.$root.$virtualScroll = {} as any;
        }
        this.$root.$virtualScroll[this.reScrollKey] = {
            startIndex: this.startIndex,
            virtualTop: this.virtualTop,
            cacheHeight: this.scrollHeight,
            itemMap: this.itemMap,
            scrollMap: this.scrollMap
        }
    }
});
</script>

<style lang="less" scoped>
.virtual-scroll {
    height: 100%;
    width: 100%;
    overflow: auto;
    transform: translateZ(0);

    .list {
        position: relative;
    }
}
</style>
