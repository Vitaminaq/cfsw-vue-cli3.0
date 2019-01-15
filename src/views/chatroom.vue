<template>
    <div id="chatroom">
        <logo-header/>
        <div class="empty"></div>
        <div id="wrapper">
            <scroller
                @dropDown="dropDown"
                @pullUp="pullUp"
                :pullUpstatus="pullUpStatus"
                :pullDownStatus="pullDownStatus"
                v-rescroll="{name: 'chatroom'}"
            >
                <ul v-if="!!List[0]">
                    <artic-list
                        v-for="(item, key) in List"
                        :key = key
                        :item="item"
                        @click.native="todetail(item.articId)"
                    />
                </ul>
            </scroller>
        </div>
        <footer-content/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Toast, Time } from '@src/common/comjs';
import Scroller from '@src/components/scroller/scroller.vue';
import ArticList from '@src/components/artic-list/artic-list.vue';
import FooterContent from '@src/components/footer/footer.vue';
import LogoHeader from '@src/components/header/logo-header.vue';
const ArticListModule = namespace('ChatRoom/articList');
const ViewModule = namespace('ChatRoom/view');
import { ComponentOptions } from 'vue';

interface localComponent extends ComponentOptions<Vue> {
}
const options:localComponent = {
    components: {
        Scroller,
        ArticList,
        FooterContent,
        LogoHeader
    }
}
@Component(options)
export default class ChatRoom extends Vue {
    @ArticListModule.Action('pullDown') pullDown: any;
    @ArticListModule.Action('pullUp') pullUps: any;
    @ArticListModule.Getter('_pullDownStatus') pullDownStatus: any;
    @ArticListModule.Getter('_pullUpStatus') pullUpStatus: any;
    @ArticListModule.Getter('_list') list: any;
    @ViewModule.Mutation('$assignParams') $assignParams: any;
    @ViewModule.Action('saveView') saveView: any;
    @ViewModule.Getter('_res') res: any;
    @ViewModule.Getter('_requestStatus') requestStatus: any;

    List: any = [];

    // get List() {
    //     if (!!this.list && this.list.length > 0) return this.list;
    //     const localList = window.localStorage.getItem('articList') || false;
    //     if (!!localList) return JSON.parse(localList);
    //     return [];
    // }

    mounted () {
        const localList = window.localStorage.getItem('articList') || false;
        if (!!localList) return this.List = [...JSON.parse(localList)];
    }
    async dropDown () {
        await this.pullDown();
        Toast('', '刷新成功！');
    }
    async pullUp () {
        await this.pullUps();
        const localJsonList = window.localStorage.getItem('articList');
        if(!!this.list && this.list.length > 0) {
            if (!localJsonList) {
                window.localStorage.setItem('articList', JSON.stringify(this.list));
            } else {
                const len = JSON.parse(localJsonList).length;
                if (len > 0 && len < 9) {
                    window.localStorage.setItem('articList', JSON.stringify(this.list));
                }
            }
        }
    }
    async todetail (id: string) {
        let params: ChatRoom.View.RequestParams = {
            id: id
        };
        this.$assignParams(params);
        await this.saveView();
        if (this.res.code === 0) {
            return this.$router.push({ name: 'detail', query: { id: id } });
        }
        return Toast('', this.res.data);
    }
}
</script>

<style lang="less" scoped>
#chatroom {
    height: 100%;

    .empty {
        height: 0.96rem;
    }
    #wrapper {
        position: relative;
        overflow-y: auto;
    }
}
</style>
