<template>
    <div class="virtual-pool" ref="virtualPool" @scroll.passive="onScroll">
        <div :style="{height: '1000px'}">
            <div class="recovery-dom"
               v-for="item in virtualList"
               :key="item.articId"
               :style="{
                   height: `${item.height}px`,
                   transform: `translateY(${item.translation}px)`
                }"
            >
               <ArticList :item="item"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ArticList from '@src/components/artic-list/artic-list.vue';
import GetRect from './get-rect';

@Component<VirtualPool>({
    components: {
        ArticList
    },
    directives: {
        'get-rect': GetRect
    }
})
export default class VirtualPool extends Vue {
    @Prop({ default: () => [] }) items!: Array<any>;
    @Prop({ default: 0 }) minHeight!: number | string;

    useDoms: any = [];
    virtualPool: any;
    recoveryPool = [];
    usePool = [];

    get virtualList() {
        let arr:any = [];
        let translation = 0;
        this.items.forEach((item) => {
            translation = translation + Number(this.minHeight)
            arr.push({
                item,
                height: this.minHeight,
                id: item.articId,
                translation
            })
        })
        console.log(arr);
        return arr;
    }
    async mounted() {
        await this.$nextTick();
        this.virtualPool = Array.isArray(this.$refs.virtualPool) ?
            this.$refs.virtualPool[0] : this.$refs.virtualPool;
        this.createVirtualItem();
    }
    createVirtualItem() {
        const h = this.virtualPool.getBoundingClientRect().height;
        const num = h/Number(this.minHeight);
        for (let i = 0; i < num; i++) {
            this.useDoms.push(this.items[i]);
        }
    }
    onScroll() {
        console.log(this.virtualPool.scrollTop);
    }
}
</script>
<style lang="less" scoped>
.virtual-pool {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;

    .recovery-dom {
        position: absolute;
        top: 0;
        left: 0;
        border: solid 1px #adadad;
        width: 100%;
    }
}
</style>
