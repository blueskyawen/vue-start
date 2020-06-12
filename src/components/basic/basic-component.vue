<template>
  <div class="basic-component">
    <div class="demo-item-group">
      <label class="hasMao">全局组件</label>
      <div class="demo-item">
        <h4>1. 注册组件使用全局指令</h4>
        <global-compt-1></global-compt-1>
        <div class="fenge"></div>
        <h4>2. 全局组件互相引用, 事件通信</h4>
        <global-compt-2 :message="msg1.text" :num="msg1.num" v-on:eventCompt01="handleEventCompt1"
                        @eventCompt02="handleEventCompt2" @eventCompt03="handleEventCompt3"></global-compt-2>
        <p>msg2: {{msg2}}</p>
        <div class="fenge"></div>
        <h4>3. 双向绑定-emit-update:prop, 修饰符.sync</h4>
        <global-compt-3 v-bind:counter.sync="clickCounter" v-bind.sync="personObj"></global-compt-3>
        <p>clickCounter: {{clickCounter}}; personObj: {{personObj}}</p>
        <div class="fenge"></div>
        <h4>4. props校验, 原生事件绑定到组件</h4>
        <global-compt-4 prop-c="hello vue" :prop-e="num" :propA="1024" @focus="foucsComp4"></global-compt-4>
        <div class="fenge"></div>
        <h4>5. 动态组件, 使用is="componentName"</h4>
        <ol>
          <li is="global-compt-1"></li>
          <li is="global-compt-2" :message="msg3.text" :num="msg3.num"></li>
          <li is="comptBB"></li>
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
        <local-compt-02 :message="'hello local component'" :num="666"></local-compt-02>
        <div class="fenge"></div>
        <h4>使用require引用局部组件</h4>
        <localComptA :num="999"></localComptA>
        <h4>使用import/export引用局部组件</h4>
        <comptBB :num="888"></comptBB>
        <compt-cc :num="777"></compt-cc>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import {comptBB, comptCC} from './componentss/local-component-b'

// 全局指令
Vue.directive('vc-focus', {
  inserted: function (el, binding) {
    el.focus()
    el.style.backgroundColor = '#ccffff'
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
Vue.component('global-compt-2', {
  props: ['message', 'num'],
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
      },
      clickName1: 'click',
      styleName: 'style'
    }
  },
  template: '<div><h3>{{name}}: {{message + num}}</h3>' +
    '<h3>styleName-动态属性名,clickName1-动态事件名</h3>' +
    '<global-compt-1></global-compt-1><button :[styleName]="btnStyle" @[clickName1]="emitEvent1">Event-no-emit-value</button>' +
    '<button :style="btnStyle" @click="emitEvent2">Event2-emit1-values</button>' +
    '<button :style="btnStyle" @click="emitEvent3">Event2-emit2-values</button></div>',
  methods: {
    emitEvent1: function () {
      this.$emit('eventCompt01')
    },
    emitEvent2: function () {
      this.$emit('eventCompt02', this.name, 666)
    },
    emitEvent3: function () {
      this.$emit('eventCompt03', 666, 'ABC')
    }
  }
})
Vue.component('global-compt-3', {
  props: ['counter', 'msg', 'age'],
  data () {
    return {
      name: 'global-component03',
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
  template: '<div><button :style="btnStyle" @click="emitCounter">双向绑定-emit-update:counter</button>' +
    '<div>双向绑定-emit-update:object-msg: <input @change="emitObject1" :value="msg"/></div>' +
    '<div>双向绑定-emit-update:object-age: <input type="numner" @change.number="emitObject2" :value="age"/></div></div>',
  methods: {
    emitCounter: function ($event) {
      let cout = this.counter + 5
      this.$emit('update:counter', cout)
    },
    emitObject1: function ($event) {
      this.$emit('update:msg', $event.target.value)
    },
    emitObject2: function ($event) {
      this.$emit('update:age', $event.target.value)
    }
  }
})
Vue.component('global-compt-4', {
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
  template: '<div><h3>global-component04</h3><input type="text" v-on="inputListeners" >' +
    '<div>{{propC}} : {{propE}} : {{propD}} : {{propA}}</div></div>'
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

// var localComptA = require('./componentss/local-component-a.js')

export default {
  name: 'basic-component',
  data: function () {
    return {
      msg1: {text: 'I am global component', num: 66},
      msg2: 'compt',
      clickCounter: 3,
      personObj: {msg: 'lilei', age: 18},
      num: 777,
      msg3: {text: 'I am dymanic component', num: 55}
    }
  },
  components: {
    'local-compt-01': localCompt01,
    // 同 'localCompt02': localCompt02 or 'local-compt-02': localCompt02
    localCompt02,
    localComptA: require('./componentss/local-component-a'), // 或localComptA： localComptA
    comptBB,
    'compt-cc': comptCC
  },
  methods: {
    handleEventCompt1: function () {
      alert('React Event compt2')
    },
    handleEventCompt2: function (value1, value2) {
      alert('React Event2 compt2: ' + value1 + value2)
    },
    handleEventCompt3: function ($event) {
      this.msg2 += 'the $event is the first value: ' + $event
    },
    foucsComp4: function () {
      alert('Focus foucsComp4 原生事件')
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
