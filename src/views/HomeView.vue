<script setup lang="ts">
import { ref, type InputHTMLAttributes } from 'vue';
import LitWrapper from "@/custom-components/LitWrapper.vue";
import "@/custom-components/wc-element";
import "@/custom-components/wc-input";
import "@/custom-components/wc-list";

const value = ref('88');

const list = ref([1, 2, 3, 4]);

const onClick = () => {
  console.log('111111111');
}

const onInput = (e: Event) => {
  console.log((e.target as InputHTMLAttributes).value, '777777777');
}

</script>

<template>
  <main>
    <LitWrapper>
      <wc-element @click="onClick">
        <div>1111111111111111</div>
        <div slot="bottom">222222222222</div>
      </wc-element>
    </LitWrapper>
    <LitWrapper>
      <wc-input :value="value" @change="onInput" />
    </LitWrapper>
    <LitWrapper><wc-list :list="list"></wc-list></LitWrapper>
  </main>
</template>
