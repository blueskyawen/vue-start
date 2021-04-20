<template>
  <div class="nc-form-group-control">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vc-form-control',
  created () {
    console.log(this.$slots.default)
  },
  mounted () {
    console.log(this.$slots.default[0])
    setTimeout(() => {
      console.log(this.$slots.default[0])
    }, 5000)
  }
}
</script>

<style scoped>
  .nc-form-group-control {
    height: 100%;
  }
</style>
