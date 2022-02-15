<template>
  <div>Current user is: {{ user }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: 'John Doe'
    }
  }
}
</script>