<template>
  <div class="nc-form-group-item">
    <input :value="value" v-bind="$attrs" @input="valueChange" />
  </div>
</template>

<script>
export default {
  name: 'vc-input',
  inheritAttrs: false,
  props: {
    value: String
  },
  data () {
    return {

    }
  },
  methods: {
    valueChange: function ($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
</script>

<style scoped>
  .nc-form-group-item {
    display:inline-flex;
    align-items:center;
    width: 100%;
    min-width:120px;
    height:36px;
    position:relative;
    max-width: 100%;
    box-sizing: border-box;
  }
  .nc-form-group-item input {
    display:inline-block;
    height:100%;
    width:100%;
    font-size:14px;
    border:solid 1px #999;
    border-radius:4px;
    box-shadow:none;
    box-sizing:border-box;
    outline:none;
    padding:0 10px 0 10px;
    color:#4d4d4d;
  }
  .nc-form-group-item input:hover {
    border-color:#3399ff;
  }
  .nc-form-group-item-disabled input:hover {
    border-color:#999;
  }
  .nc-form-group-item-disabled:hover input{
    cursor:not-allowed;
  }
</style>
