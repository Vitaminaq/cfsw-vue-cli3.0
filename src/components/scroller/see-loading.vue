<template>
    <div class="see-loading" id="seeLoading">
        <span v-if="pullUpstatus === 'done'">无更多数据</span>
        <span @click="reload" v-else-if="pullUpstatus === 'failure'">加载失败，请点击重新加载</span>
        <img v-else src="./loading.gif" alt="加载中..."/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import inview from './inview';

@Component
export default class SeeLoading extends Vue {
    @Prop({ default: 'unrequest' }) pullUpstatus!: string;
    timer: number = 0;

    mounted () {
        this.timer = setInterval(() => {
            let isSee = inview(this.$el);
            if (isSee &&
                this.pullUpstatus !== 'requesting' &&
                this.pullUpstatus !== 'done' &&
                this.pullUpstatus !== 'error'
            ) {
                return this.$emit('pullUp');
            }
        }, 1000);
    }
    reload () {
        this.$emit('pullUp');
    }
    beforeDestroy () {
        clearInterval(this.timer);
    }
};
</script>

<style scoped>
.see-loading {
    height: 4rem;
}
span {
    font-size: 0.45rem;
    color: #ADADAD;
}
</style>
