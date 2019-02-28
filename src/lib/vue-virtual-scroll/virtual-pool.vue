<template>
    <div class="virtual-pool" ref="virtualPool">
        <div class="recovery-dom" v-for="item in useDoms" :key="item.articId" :style="{height: `${minHeight}px`}"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component<VirtualPool>({})
export default class VirtualPool extends Vue {
    @Prop({ default: () => {} }) items!: any;
    @Prop({ default: 0 }) minHeight!: number | string;

    useDoms: any = [];

    async mounted() {
        await this.$nextTick();
        const virtualPool: any = Array.isArray(this.$refs.virtualPool) ?
            this.$refs.virtualPool[0] : this.$refs.virtualPool;
        const h = virtualPool.getBoundingClientRect().height;
        const num = h/Number(this.minHeight);
        for (let i = 0; i < num; i++) {
            this.useDoms.push(this.items[i]);
        }
        console.log(num, this.useDoms, '>>>>>>>>>>>>>>.')
    }
}
</script>
<style lang="less" scoped>
.virtual-pool {
    position: relative;
    width: 100%;
    height: 100%;

    .recovery-dom {
        position: absolute;
        top: 0;
        left: 0;
        border: solid 1px #adadad;
        width: 100%;
    }
}
</style>
