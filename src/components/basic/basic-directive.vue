<template>
  <div class="basicDirective">
    <div class="demo-item-group">
      <label class="hasMao">全局组件</label>
      <div class="demo-item">
        <global-compt-1></global-compt-1>
        <div class="fenge"></div>
        <global-compt-2 :message="msg1.text" :num="msg1.num" v-on:eventCompt2="handleEventCompt2"
                        @eventCompt02="handleEvent2Compt2" @eventCompt01="msg2 += $event"
                        v-bind:counter.sync="counter"></global-compt-2>
        <p>msg2: {{msg2}}; counter: {{counter}}</p>
        <div class="fenge"></div>
        <global-compt-3 prop-c="hello vue" :prop-e="num" @focus="foucsComp3"></global-compt-3>
        <div class="fenge"></div>
      </div>
    </div>
    <div class="demo-item-group">
      <label class="hasMao">使用组件is="component_name"</label>
      <div class="demo-item">
        <ol>
          <li is="global-compt-1"></li>
          <li is="global-compt-3"></li>
        </ol>
        <div class="fenge"></div>
      </div>
    </div>
    <div class="demo-item-group">
      <label class="hasMao">局部组件</label>
      <div class="demo-item">
        <local-compt-01></local-compt-01>
        <div class="fenge"></div>
        <localCompt02 message="hello local component" :num="666"></localCompt02>
        <div class="fenge"></div>
      </div>
    </div>
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

// 全局组件
Vue.component('global-compt-1', {
  template: '<h3 v-vc-focus>global-component01</h3>'
})
// 全局组件可以不生明就互相引用
Vue.component('global-compt-2', {
  props: ['message', 'num', 'counter'],
  data () {
    return {
      name: 'global-component02',
      btnStyle: {
        background: '#3cc',
        padding: '10px 20px',
        border: 'none',
        'border-radius': '4px',
        'font-size': '16px',
        cursor: 'pointer',
        'margin-right': '10px'
      }
    }
  },
  template: '<div><h3>{{name}}: {{message + num}}</h3>' +
    '<global-compt-1></global-compt-1><button :style="btnStyle" @click="emitEvent">Event-no-emit-value</button>' +
    '<button :style="btnStyle" @click="emitEvent2">Event2-emit2-values</button>' +
    '<button :style="btnStyle" @click="emitEvent1">Event2-emit1-values</button>' +
    '<button :style="btnStyle" @click="emitCounter">Event3-emit1-counter</button></div>',
  methods: {
    emitEvent: function () {
      this.$emit('eventCompt2')
    },
    emitEvent2: function () {
      this.$emit('eventCompt02', this.name, 666)
    },
    emitEvent1: function () {
      this.$emit('eventCompt01', 666)
    },
    emitCounter: function ($event) {
      let cout = this.counter + 5
      this.$emit('update:title', cout)
    }
  }
})
Vue.component('global-compt-3', {
  inheritAttrs: false,
  props: {
    propA: Number,
    propB: [Number, String],
    propC: {
      type: String,
      required: true,
      default: 'hello vue'
    },
    propD: {
      type: Date,
      default: function () {
        return new Date()
      }
    },
    propE: {
      type: Number,
      validator: function (value) {
        return value > 10
      }
    }
  },
  computed: {
    inputListeners: function () {
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners
      )
    }
  },
  methods: {
    focusIt: function () {
      alert('focusIt')
    }
  },
  template: '<div><h3>global-component03</h3><input type="text" v-on="inputListeners" >' +
    '<div>{{propC}} : {{propE}} : {{propD}}</div></div>'
})
// 局部组件
var localCompt01 = {
  props: {
    propdd: {
      type: Object,
      default: {
        color: '#cc00ff',
        fontsizee: '20px',
        text: 'hello vue directive!',
        bgColor: '#ffffcc'
      }
    }
  },
  template: '<h1 v-local-focus="propdd">局部组件01</h1>',
  directives: {localFocus}
}
var localCompt02 = {
  props: ['message', 'num'],
  data () {
    return {
      name: '局部组件02'
    }
  },
  template: '<div><h1>{{name}}: </h1><div>{{message}}##{{num}}</div></div>'
}

export default {
  name: 'basicDirective',
  data () {
    return {
      msg1: {text: 'I am global component', num: 66},
      num: 666,
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
      },
      msg2: 'compt',
      counter: 8
    }
  },
  components: {
    'local-compt-01': localCompt01,
    // tong 'localCompt02': localCompt02
    localCompt02
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
    handleEventCompt2: function () {
      alert('React Event compt2')
    },
    handleEvent2Compt2: function (value1, value2) {
      alert('React Event2 compt2: ' + value1 + value2)
    },
    changeFontSize: function () {
      var tmpindex = Math.random() * 10 > 5 ? 0 : 1
      // 无效果 this.focusData.fontsizee = this.sizess[tmpindex]
      this.focusData = {text: 'hello vue directive!', fontsizee: this.sizess[tmpindex]}
    },
    foucsComp3: function () {
      alert('Focus Event compt2')
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
</style>
