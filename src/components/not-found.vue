<template>
  <div class="not-found">
    <span>Page not found !</span>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style scoped>
  .not-found {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .not-found span {
    font-size: 24px;
    color: #1a75ff;
    font-weight: 600;
  }
</style>
