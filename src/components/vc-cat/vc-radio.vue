<template>
  <div class="vc-radio">
    <span v-for="option in options" :key="option.value" class="radio-group">
      <span class="radio" :class="isChecked(option)">
        <input type="radio" :disabled="option.disabled" :checked="option.value === value"
               :value="option.value" @change="$emit('input', $event.target.value)"/>
      </span>
      <span :for="option.value">{{option.label}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'vc-radio',
  props: {
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    value: String
  },
  data () {
    return {
      isDisable: false
    }
  },
  created: function () {
    if (this.value) {
      for (let option of this.options) {
        if (option.value === this.value) {
          this.isDisable = option.disabled
          break
        }
      }
    }
  },
  methods: {
    isChecked: function (item) {
      return {active: item.value === this.value,
        default: item.value !== this.value,
        disabled: item.disabled}
    }
  }
}
</script>

<style scoped>
  span.radio-group {
    margin-right: 10px;
  }
  span.radio{
    display:inline-block;
    height:18px;
    width:18px;
    border:solid 1px #999;
    border-radius:50%;
    margin-right:10px;
    position:relative;
    left:5px;
    top:4px;
    box-sizing:border-box;
    transition: all .5s;
  }
  span.radio.active {
    border-width:6px;
    border-color:#008ae6;
  }
  span.radio input{
    position:absolute;
    opacity: 0;
    z-index: 7;
    transform: scale(1.8,1.8);
    box-shadow:none;
    cursor:pointer;
  }
  span.radio.active input{
    top:-6px;
    left:-9px;
  }
  span.radio.default input{
    top:-1px;
    left:-3px;
  }
  span.radio:not(.disabled):hover{
    border-color:#008ae6;
  }
  span.radio.active.disabled{
    opacity: 0.5;
    border-color:#ccc;
  }
  span.radio.default.disabled{
    opacity: 0.5;
    background-color:#ccc;
  }
  span.radio input[disabled] {
    cursor:not-allowed;
  }
  span.radio.disabled input:hover{
    cursor:not-allowed;
  }
</style>
