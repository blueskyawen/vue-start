<template>
  <div class="async-loading">
    <h1>Load Component Error!!!</h1>
  </div>
</template>

<script>
export default {
  name: 'async-error-component'
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
  .async-loading h1 {
    color: red;
  }
</style>
