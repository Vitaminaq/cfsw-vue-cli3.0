<script setup lang="ts">
import { onUnmounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { useHead } from '@/lib/@pixso/vue-head'

let timer: any

const head = useHead({
  title: '哈哈哈哈'
})

timer = setTimeout(() => {
  console.log('我执行了', '88888888')
  head.title = '哈哈哈哈'
}, 3000)

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
