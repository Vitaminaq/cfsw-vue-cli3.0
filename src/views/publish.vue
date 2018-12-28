<template>
    <div id="publish">
        <general-header :headerTitle="headerTitle">
            <button slot="btn"
                :disabled="disable"
                class="publishit"
                @click="publishIt"
           >发表</button>
        </general-header>
    <input type="text" placeholder="请输入标题" v-model="title" id="input" v-focus/>
    <textarea placeholder="请输入正文" v-model="artic">
    </textarea>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Toast, closeLoading } from '../common/comjs';
import GeneralHeader from '@src/components/header/general-header.vue';
import FooterContent from '@src/components/footer/footer.vue';

const publishModule = namespace('publish');
const ArticListModule = namespace('ChatRoom/articList');

@Component({
    components: {
    GeneralHeader,
    FooterContent
    }
    })
export default class publish extends Vue {
    @publishModule.Mutation('$isEmpty') $isEmpty: any;
    @publishModule.Getter('_isEmpty') isEmpty: any;
    @publishModule.Mutation('$assignParams') $assignParams: any;
    @publishModule.Action('userPublish') userPublish: any;
    @publishModule.Getter('_res') res: any;
    @ArticListModule.Mutation('$clearData') $clearData : any;
    headerTitle: string = '发表文章';
    title: string = '';
    artic: string = '';
    disable: boolean = false;

    async publishIt() {
        let params = {
            title: this.title,
            msg: this.artic
        };
        this.$isEmpty(params);
        if (this.isEmpty) return Toast('', '内容不能为空!');
        this.disable = true;
        Toast('loading', '发表中...');
        this.$assignParams(params);
        await this.userPublish();
        setTimeout(function () {
            closeLoading();
        }, 200);
        this.disable = false;
        Toast('', this.res.data);
        if (this.res.code !== 0) return;
        this.$clearData();
        return this.$router.push({ name: 'chatroom' });
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#publish {
    .publishit{
        border-style: none;
        background-color: #fff;
        outline: none;
        font-size: 0.5rem;
        color: #00dcff;
    }

    input{
        margin-top: 1.6rem;
        padding-left: 0.15rem;
        padding-bottom: 0.2rem;
        width: 90%;
        font-size: 0.6rem;
        height: 0.8rem;
        border: none;
        border-bottom: #adadad dotted 1PX;
    }

    textarea {
        height: 400px;
        width: 90%;
        overflow-y: auto;
        outline: none;
        border: none;
        padding-left: 0.15rem;
        padding-top: 0.3rem;
        font-size: 0.48rem;
        resize: none;
    }
}
</style>
