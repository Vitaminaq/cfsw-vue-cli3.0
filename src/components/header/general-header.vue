<template>
  <header class="header">
    <router-link to="" event="[]" @click.native="back">
      <svg-icon name="backtop" />
    </router-link>
    <span class="title">{{ headerTitle }}</span> <slot name="btn"></slot>
  </header>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class GeneralHeader extends Vue {
  @Prop({ default: "" }) headerTitle!: string;
  @Prop({ default: "" }) backPathName!: string;

  back() {
    if (!this.backPathName) return this.$router.go(-1);
    return this.$router.push({ name: this.backPathName });
  }
}
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: solid #adadad 1px;
  font-size: 0.5rem;
  height: 1.2rem;
  z-index: 999;

  a {
    padding-top: 7px;

    .icon-symbol {
      width: 25px;
      height: 25px;
    }
  }

  .title {
    width: 73%;
  }
}
</style>
