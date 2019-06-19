<template>
  <div class="nc-form-textarea" :style="{height: height, width: width}">
    <textarea name="textarea"
              :value="value"
              @input="$emit('input', $event.target.value)"
              :placeholder="placeholder"
              maxlength="100">
    </textarea>
  </div>
</template>

<script>
export default {
  name: 'vc-textarea',
  props: {
    value: String,
    height: {type: String, default: 'auto'},
    width: {type: String, default: '100%'},
    placeholder: {type: String, default: '请输入'}
  }
}
</script>

<style scoped>
  .nc-form-textarea {
    position: relative;
    border:none;
    height:auto;
    max-width:100%;
  }
  .nc-form-textarea textarea {
    width:100%;
    height:100%;
    max-width:100%;
    min-width:100%;
    min-height:80px;
    max-height:240px;
    padding:5px;
    box-sizing:border-box;
    border-radius:4px;
    outline:none;
    border:solid 1px #999;
  }
  .nc-form-textarea textarea:hover,
  .nc-form-textarea textarea:focus {
    border-color:#3399ff;
  }
  .nc-form-textarea:after {
    content: "0/100";
    position: absolute;
    top:0px;
    right: 7px;
    font-size: 12px;
  }
</style>
