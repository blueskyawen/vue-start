<template>
  <div class="basicDirective">
    <div class="demo-item-group">
      <label class="hasMao">全局属性指令</label>
    </div>
    <div class="form-group">
      <label class="for-input">全局指令01</label>
      <div class="input-item">
        <input type="text" v-model.trim="message" v-vc-focus />
      </div>
    </div>
    <div class="form-group">
      <label class="for-input">全局指令02</label>
      <div class="input-item">
        <input type="text" v-model.trim="message" v-focus2:#cc00ff.a="focusData" />
      </div>
      <span class="input-oper" v-on:click="changeFontSize">changeFontSize</span>
    </div>
    <div class="demo-item-group">
      <label class="hasMao">局部属性指令</label>
    </div>
    <div class="form-group">
      <label class="for-input">局部指令</label>
      <div class="input-item">
        <input type="text" v-model.trim="focusData2.text" v-local-focus="focusData2" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

// 全局指令
Vue.directive('vc-focus', {
  inserted: function (el, binding) {
    el.focus()
    el.style.backgroundColor = '#ccffff'
  }
})
Vue.directive('focus2', {
  bind: function (el, binding) {
    console.log('focus2 ***** bind')
    console.log(binding)
  },
  inserted: function (el, binding, vnode, oldVnode) {
    console.log('focus2 ***** inserted')
    console.log(binding)
    console.log(vnode)
    console.log(oldVnode)
    el.style.color = binding.arg
    el.style.fontSize = binding.value.fontsizee
    el.value = binding.value.text
    el.focus()
  },
  update: function (el, binding) {
    console.log('focus2 ***** update')
    console.log(binding)
    el.style.fontSize = binding.value.fontsizee
  },
  componentUpdated: function (el, binding) {
    console.log('focus2 ***** componentUpdated')
    console.log(binding)
  },
  unbind: function (el, binding) {
    console.log('focus2 ***** unbind')
    console.log(binding)
  }
})
// 局部指令
var localFocus = {
  inserted: function (el, binding, vnode, oldVnode) {
    console.log('local_focus ***** inserted')
    el.style.color = binding.value.color
    el.style.fontSize = binding.value.fontsizee
    el.value = binding.value.text
    el.style.backgroundColor = binding.value.bgColor
    el.focus()
  }
}

export default {
  name: 'basicDirective',
  data () {
    return {
      message: 'hello directive',
      focusData: {
        fontsizee: '20px',
        text: 'hello vue directive!'
      },
      color: '#cc00ff',
      sizess: ['14px', '24px'],
      focusData2: {
        color: '#cc00ff',
        fontsizee: '20px',
        text: 'hello vue directive!',
        bgColor: '#ffffcc'
      }
    }
  },
  directives: {
    localFocus
  },
  beforeCreate: function () {
    console.log('basicDirective ===== beforeCreate')
  },
  created: function () {
    console.log('basicDirective ===== created')
  },
  beforeMount: function () {
    console.log('basicDirective ===== beforeMount')
  },
  mounted: function () {
    console.log('basicDirective ===== mounted')
  },
  beforeUpdate: function () {
    console.log('basicDirective ===== beforeUpdate')
  },
  updated: function () {
    console.log('basicDirective ===== updated')
  },
  beforeDestroy: function () {
    console.log('basicDirective ===== beforeDestroy')
  },
  destroyed: function () {
    console.log('basicDirective ===== destroyed')
  },
  methods: {
    changeFontSize: function () {
      var tmpindex = Math.random() * 10 > 5 ? 0 : 1
      // 无效果 this.focusData.fontsizee = this.sizess[tmpindex]
      this.focusData = {text: 'hello vue directive!', fontsizee: this.sizess[tmpindex]}
    }
  }
}
</script>

<style scoped>
  .demo-item-group {
    display: flex;
    margin: 10px 30px;
    flex-direction: column;
  }
  .demo-item-group > label {
    font-size: 24px;
    color: #000080;
    margin-bottom: 5px;
  }
  .demo-item-group > label.hasMao {
    font-weight: 600;
  }
  .demo-item-group > label.hasMao:after {
    content: ":";
  }
  .demo-item-group > .demo-item {
    width: inherit;
    margin-top: 5px;
  }
  .demo-item .fenge {
    width: 100%;
    height: 3px;
    margin-bottom: 3px;
    border-bottom: dashed 1px #999;
  }
  .demo-item-group button {
    background: #3cc;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
  }
  .form-group {
    width: 600px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .form-group > label {
    width: 25%;
    margin-right: 20px;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .form-group > label.for-input:after {
    content: ":";
  }
  .form-group > .input-item {
    width: 75%;
    color: #666;
    line-height: 32px;
  }
  .form-group .input-item > input {
    width:90%;
    height: 32px;
  }
  .form-group .input-oper {
    color: #009973;
    cursor: pointer;
    margin-right: 10px;
  }
  h4 {
    color: #008000;
  }
</style>
