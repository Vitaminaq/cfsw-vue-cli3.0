<template>
    <li @click="todetail(item.articId)">
        <div class="artic-content">
            <div class="userImg">
                <img :src="`${baseUrl}${item.headimg}`"/>
            </div>
            <div class="author">
                <div class="title">{{item.title}}</div>
                <span class="authormsg">作者：</span>
                <span class="authormsg authorname">{{item.nickname}}</span>
                <span class="publishtime publishtxt">发表于</span>
                <span class="publishtime">{{time(item.creatAt)}}</span>
            </div>
        </div>
        <div class="oparatenum">
            <div class="hasborder">
                <svg-icon name="view"/>{{item.viewnum}}
            </div>
            <div class="hasborder">
                <svg-icon name="comment"/>{{item.commentnum}}
            </div>
            <div>
                <svg-icon name="click"/>{{item.clicknum}}
            </div>
        </div>
    </li>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';
import config from '@src/config';

@Component
export default class ArticList extends Vue {
    @Prop({ default: () => {} }) item!: Loader.ListItem
    get baseUrl () {
        return config.BASE_URL;
    }

    todetail (id: string) {
        this.$emit('todetail', id);
    }
    time (creatAt: string) {
        return Time(Number(creatAt));
    }
}
</script>
<style lang="less" scoped>
ul {
    overflow: hidden;
    width: 100%;
    li {
        border-bottom: solid #ADADAD 0.013333rem;
        .artic-content {
            width: 98%;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            text-align: left;
            padding-left: 6%;
            .userImg{
                padding-top: 0.3rem;
                font-size: 0.533333rem;
                font-weight: bold;
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                }
            }
            .author{
                width: 100%;
                font-size: 0.38rem;
                padding-top: 0.133333rem;
                margin-left: 0.5rem;
                .title {
                    width: 90%;
                    font-size: 0.4rem;
                    font-weight: bold;
                }
                .authorname{
                    width: 15%;
                }
                .publishtime{
                    font-size: 0.213333rem;
                    color: #ADADAD;
                }
                .publishtxt{
                    margin-left: 4%;
                }
            }
        }
        .oparatenum{
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            font-size: 0.32rem;
            color: #ADADAD;

            .icon-symbol {
                height: 0.4rem;
                width: 0.4rem;
                margin-right: 0.3rem;
                fill: #ADADAD;
            }
            div {
                width: 33%;
                padding-bottom: 0.1rem;
            }
            .hasborder {
                border-right: #ADADAD 1px solid;
            }
        }
    }
}
</style>
