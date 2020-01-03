<template>
  <div><h1>{{name}}</h1>
    <vc-input v-model="name"></vc-input>
  </div>
</template>

<script>
export default {
  name: 'async-component-d',
  data () {
    return {
      name: '异步组件--DDD'
    }
  }
}
</script>

<style scoped>

</style>
