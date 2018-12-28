<template>
    <div>
        <div class="nav">
            <router-link v-for="(item, key) in tag" :key="key"
                :to="{ path: '/test', query: { type: item }}"
                replace
            >
                {{item}}
            </router-link>
        </div>
        <div class="scroll"
            v-rescroll="{
                name: $route.query.type,
                path: 'scrollStore'
            }"
        >
             {{content}}
             <div>
             </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Test extends Vue {
    tag: Array<any> = ['A', 'B', 'C', 'D'];
    data: Array<any> = ['is A', 'is B', 'is C', 'is D'];
    get type () {
        return this.$route.query.type;
    }
    get content () {
        if (this.type === 'A') return this.data[0];
        if (this.type === 'B') return this.data[1];
        if (this.type === 'C') return this.data[2];
        if (this.type === 'D') return this.data[3];
    }
};
</script>
<style lang="less" scoped>
.nav {
    width: 100%;
    position: fixed;
    height: 50px;
    z-index: 9999;
    a {
        display: inline-block;
        width: 24%;
        height: 50px;
        background-color: #bcbcbc;
        border: red solid 1px;
    }
}
 .scroll {
        position: relative;
        top: 200px;
        width: 100%;
        height: 400px;
        overflow-y: scroll;
        div {
            height: 600px;
        }
    }
</style>
