<template>
  <span class="vc-checkbox">
    <span class="_checkbox" :class="{disabled: disabled}">
      <span class="check_input" :class="{active: checked, checkall: checked}">
        <input type="checkbox" :value="value" :checked="checked" @change="$emit('change', $event.target.checked)" />
      </span>
      <span class="check_title" v-if="value">{{value}}</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'vc-checkbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: String,
    checked: Boolean,
    disabled: Boolean
  }
}
</script>

<style scoped>
  ._checkbox{
    display:inline-block;
    height:30px;
    line-height:30px;
  }
  ._checkbox > .check_input {
    display:inline-block;
    height:20px;
    width:20px;
    border:solid 1px #999;
    border-radius:4px;
    margin-right:10px;
    position:relative;
    left:6px;
    top:5px;
    box-sizing:border-box;
    transition: all .5s;
  }
  ._checkbox > .check_input input{
    position:absolute;
    left:-1px;
    opacity: 0.0;
    z-index: 7;
    transform: scale(1.8,1.8);
    box-shadow:none;
    cursor:pointer;
    top:-1px;
  }
  ._checkbox:not(.disabled) .check_input:hover{
    border-color:#1a75ff;
  }
  ._checkbox .check_input.active{
    background:#1a75ff;
    border-color:#1a75ff;
  }
  ._checkbox .check_input.active.checkall:after{
    content:"";
    display: inline-block;
    color:#fff;
    font-size:14px;
    font-weight:bold;
    position:absolute;
    top:1px;
    left:6px;
    border:solid 2px #fff;
    border-color: transparent #fff #fff transparent;
    transform: rotate(40deg);
    height: 50%;
    width:20%;
  }
  ._checkbox .check_input.active.partcheck:after{
    content:"";
    border:solid 1px #fff;
    width: 50%;
    position:absolute;
    display: inline-block;
    top:50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
  }
  ._checkbox:hover{
    cursor:pointer;
  }
  ._checkbox.disabled{
    cursor:not-allowed;
  }
  ._checkbox.disabled .check_input{
    background-color:#ccc;
    border-color:#999;
    opacity: 0.6;
  }
  ._checkbox.disabled .check_input:after{
    color:#4d4d4d;
  }
  ._checkbox.disabled .check_input{
    cursor:not-allowed;
  }
  .checkbox > .check_title {
    color: #666;
    margin-left: 8px;
  }
</style>
