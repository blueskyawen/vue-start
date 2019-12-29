<template>
  <div class="async-loading">
    <vc-loading></vc-loading>
  </div>
</template>

<script>
export default {
  name: 'async-loading-component'
}
</script>

<style scoped>
.async-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
