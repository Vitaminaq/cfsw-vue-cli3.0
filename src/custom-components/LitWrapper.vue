<template>
    <LitWrapperServer v-if="isServer">
        <slot></slot>
    </LitWrapperServer>
    <LitWrapperClient v-else>
        <slot></slot>
    </LitWrapperClient>
</template>
  
<script lang="ts" setup>
import LitWrapperServer from './LitWrapperServer';
import LitWrapperClient from './LitWrapperClient';

const isServer = import.meta.env.SSR;
</script>
  