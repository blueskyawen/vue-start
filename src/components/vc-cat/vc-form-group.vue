<template>
  <div class="nc-form-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vc-form-group',
  props: {
    width: {type: String, default: '470px'}
  },
  created () {
    console.log(this.$slots.default)
  },
  mounted () {
    console.log(this.$slots.default)
  }
}
</script>

<style scoped>
  .nc-form-group{
    display:inline-flex;
    padding: 5px 0;
    box-sizing: border-box;
    flex-wrap: wrap;
    width:100%;
    position:relative;
    align-items: center;
  }
</style>
