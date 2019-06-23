<template>
  <div class="basicSetter">
    <h2>This is {{name}}</h2>
    <p>injectMsg: {{injectMsg}}</p>
    <div class="demo-item-group">
      <label>1. 父实例和子组件引用</label>
      <div class="demo-item">
        <localCompt5 ref="RelCompt5"></localCompt5>
      </div>
      <div class="demo-item">
        <localCompt6 ref="RelCompt6"></localCompt6>
      </div>
    </div>
    <div class="demo-item-group">
      <label>2. 依赖注入：只可用于属性的注入获取，不允许修改和注入方法, 只用于祖先级逐渐的属性共享，用处有限</label>
      <p>provide不能注入变量或方法或计算属性，只能注入常量或新建对象，如：new Date()</p>
      <p>而且注入的属性是非响应的，不能直接用于模版语法里</p>
      <div class="demo-item">
        <localCompt6 ref="RelCompt6"></localCompt6>
      </div>
      <div class="demo-item">
        <localCompt7></localCompt7>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component('localCompt5', {
  data: function () {
    return {
      name: 'localCompt5',
      count: 5,
      injectMsg: 'Inject msg'
    }
  },
  template: `<div><span>{{name}} count: {{count}}</span><button @click="addCount">add count</button>
<button @click="modParent">mod perant and childs</button></div>`,
  methods: {
    addCount: function () {
      this.count += 2
    },
    modParent: function () {
      this.$parent.name += '!!'
      this.$parent.modChildCompName()
    }
  }
})
var localCompt6 = {
  data: function () {
    return {
      name: 'localCompt6',
      injectMsg2: 'Inject msg'
    }
  },
  inject: ['injectMsg'],
  template: `<div><span>{{name}}; {{injectMsg2}}</span><button @click="useParent">use perant provides</button></div>`,
  methods: {
    useParent: function () {
      this.injectMsg2 += this.injectMsg + ' 哈哈'
    }
  }
}
var localCompt7 = {
  data: function () {
    return {
      name: 'localCompt7',
      injectMsg2: 'Inject '
    }
  },
  inject: {perantMsg: {from: 'injectMsg', default: 'Inject'}},
  template: `<div><span>{{name}}; {{injectMsg2}}</span><button @click="useParent">use perant provides</button></div>`,
  methods: {
    useParent: function () {
      this.injectMsg2 += this.perantMsg + ' 哈哈'
    }
  }
}

export default {
  name: 'basicSetter',
  data () {
    return {
      name: 'basicSetter',
      message: 'hello setter !',
      injectMsg: 'Inject basicSetter'
    }
  },
  components: {localCompt6, localCompt7},
  methods: {
    modChildCompName: function () {
      this.$refs.RelCompt5.name += ' hello'
      this.$refs.RelCompt6.name += ' hello'
    }
  },
  provide: {
    injectMsg: new Date()
  },
  computed: {
    getData: function () {
      return new Date()
    }
  }
}
</script>

<style scoped>
  .demo-item-group {
    display: flex;
    margin: 10px 30px;
    flex-direction: column;
    border-bottom: solid 1px #00cc99;
  }
  .demo-item-group > label {
    font-size: 22px;
    color: #000080;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .demo-item-group > label:after {
    content: ":";
  }
  .demo-item-group > .demo-item {
    width: inherit;
    margin-bottom: 5px;
  }
  .demo-item-group > .demo-item:not(:last-of-type) {
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
</style>
