<template>
  <div class="nc-form-group-label" :style="{height: height}">
    <label>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'vc-form-label',
  props: ['height'],
  created () {
    console.log(this.$slots.default)
  },
  mounted () {
    console.log(this.$slots.default)
  }
}
</script>

<style scoped>
  .nc-form-group-label {
    height:36px;
    display:inline-flex;
    align-items:center;
    justify-content: flex-end;
    color:#333;
    width:100%;
  }
  .nc-form-group-label label {
    display:inline-flex;
    height:100%;
    align-items:center;
    color: #666;
    position: relative;
  }
  .nc-form-group-label .nc-form-group-label-require {
    margin-left: -10px;
    color:#ff3300;
  }
  .nc-form-group-label label:after{
    content:":";
    margin-right: 10px;
  }
  .nc-form-group-label.nc-form-noshow-option label:after {
    content:"";
  }
</style>
