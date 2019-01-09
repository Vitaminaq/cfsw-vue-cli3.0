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
                <ul v-if="!!list[0]">
                    <artic-list
                        v-for="(item, key) in list"
                        :key = key
                        :item="item"
                        @todetail="todetail"
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
    @ArticListModule.Action('pullUp') pullUp: any;
    @ArticListModule.Getter('_pullDownStatus') pullDownStatus: any;
    @ArticListModule.Getter('_pullUpStatus') pullUpStatus: any;
    @ArticListModule.Getter('_list') list: any;
    @ViewModule.Mutation('$assignParams') $assignParams: any;
    @ViewModule.Action('saveView') saveView: any;
    @ViewModule.Getter('_res') res: any;
    @ViewModule.Getter('_requestStatus') requestStatus: any;

    async dropDown () {
        await this.pullDown();
        Toast('', '刷新成功！');
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
