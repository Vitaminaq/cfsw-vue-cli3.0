<template>
    <li class="vue-virtual-list-item" :style="{ transform: `translate${direction === 'vertical' ? 'Y' : 'X'}(${scrollNum}px)` }">
        <slot :item1="item.contain"></slot>
    </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        scrollNum: {
            type: Number,
            default: 0
        },
        direction: {
            type: String,
            default: 'vertical'
        }
    },
    async mounted() {
        const { index, height } = this.item;
        await this.$nextTick();
        const { offsetHeight, offsetWidth } = this.$el;
        const num = this.direction === 'vertical' ? offsetHeight : offsetWidth;
        this.$emit('updateHeight', num, index);
    }
});
</script>
<style lang="less" scoped>
.vue-virtual-list-item {
    position: absolute;
    left: 0;
    top: 0;
}
</style>