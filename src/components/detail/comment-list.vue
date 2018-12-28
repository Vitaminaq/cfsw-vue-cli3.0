<template>
    <li>
        <div class="commentname">
            {{item.nickname}}
        </div>
        <div class="commentmsg">
            <span class="time">{{time(Number(item.creatAt))}}</span>
            <span class="agree">
                <span
                    :class="item.isClickComment ? 'agreeimged' : 'agreeimg'"
                    @click="agreeit(item.commentId)">
                </span>
                <span class="agreenum">{{item.clicknum}}</span>
            </span>
        </div>
        <div class="commenttxt" v-html='item.msg'>
        </div>
    </li>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Time } from '@src/common/comjs';

@Component
export default class CommentList extends Vue {
    @Prop({ required: true }) index!: any;
    @Prop({ default: () => {} }) item!: any;

    get nickName (): string | null {
        return localStorage.getItem('nickname');
    }
    get status (): boolean {
        if (!this.nickName) return false;
        return this.item.c_agree.name.includes(this.nickName);
    }

    time (time: number): string | undefined {
        return Time(time);
    }
    agreeit (commentId: number):this {
        this.$emit('agreeit', commentId, this.index);
        return this;
    }
}
</script>
<style lang="less" scoped>
li{
    height: auto;
    width: 100%;
    border-bottom: solid #ADADAD 1px;
    padding-bottom: 0.2rem;
    .commentname{
        font-size: 0.4rem;
        height: 0.46rem;
        padding-left: 0.8rem;
        color: #ADADAD;
        padding-top: 0.2rem;
    }
    .commentmsg{
        padding-top: 0.106667rem;
        font-size: 0.3rem;
        color: #ADADAD;
        height: 0.466667rem;
        position: relative;
        padding-left: 0.8rem;
        overflow: hidden;

        span{
            display: inline-block;
        }
    }
    .agreenum{
        position: relative;
        top: -0.04rem;
        padding-left: 0.133333rem;
    }

    .agreeimg, .agreeimged{
        height: 0.426667rem;
        width: 0.426667rem;
        background-size: cover;
    }
    .agreeimg{
        background-image: url(../../assets/image/chatroom/click.png);
    }
    .agreeimged{
        background-image: url(../../assets/image/chatroom/clicked.png);
    }
    .time{
        width: 40%;
    }
    .agree{
        width: 51%;
        height: 0.466667rem;
        line-height: 0.466667rem;
        text-align: right;
    }
    .commenttxt{
        padding-top: 0.133333rem;
        padding-left: 0.8rem;
        font-size: 0.42rem;
    }
}
</style>
