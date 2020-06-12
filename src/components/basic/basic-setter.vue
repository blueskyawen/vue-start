<template>
  <div class="basicSetter">
    <h2>This is {{name}}</h2>
    <p>injectMsg: {{injectMsg}}</p>
    <div class="demo-item-group">
      <label>1. 父实例和子组件引用</label>
      <div class="demo-item">
        <localCompt5 :ref="refCmpt5" inline-template>
          <div>
            <p>These are compiled as the component's own template.</p>
            <p>Not parent's transclusion content.</p>
          </div>
        </localCompt5>
        <localCompt5 :ref="refCmpt5"></localCompt5>
      </div>
      <div class="demo-item">
        <localCompt6 ref="RelCompt6"></localCompt6>
      </div>
      <p>存在多个同名Ref的时候, $refs.RefName获取到的是最后的那个</p>
    </div>
    <div class="demo-item-group">
      <label>2. Ref和v-for </label>
      <div class="demo-item" v-for="(value, index) in tempsss" :key="value+index">
        <localCompt5 :ref="value" :show-op="false"></localCompt5>
      </div>
      <div class="demo-item">
        <button @click="modCount(0)">Oper-ref0</button>
        <button @click="modCount(1)">Oper-ref1</button>
        <button @click="modCount(2)">Oper-ref2</button>
      </div>
      <p>$refs.RefNames包含对应数据源的这些子组件的数组</p>
    </div>
    <div class="demo-item-group">
      <label>3. 依赖注入：可用于属性的注入获取,修改,计算属性和方法, 只用于祖先级逐渐的属性共享，用处有限</label>
      <p>provide设置纯对象时只能注入只能注入常量或新建对象，如: provide: {key：new Date()}</p>
      <p>要能注入变量或方法或计算属性的话，provide必须设置为返回对象的函数,比如：provide：function() {return {key: this.getName}}</p>
      <p>而且注入的属性是非响应的，不能直接用于模版语法里, 但可用于初始化prop和data;(这就是为啥name有hahahahahaha)</p>
      <p>然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的https://cn.vuejs.org/v2/api/#provide-inject</p>
      <div class="demo-item">
        <localCompt6 :ref="'RelCompt6'"></localCompt6>
      </div>
      <div class="demo-item">
        <localCompt7></localCompt7>
      </div>
      <div class="demo-item">
        <h3>注入一个对象</h3>
        <p>site: country={{site.country}}; city={{site.city}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component('localCompt5', {
  props: {
    showOp: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      name: 'localCompt5',
      count: 5,
      injectMsg: 'Inject msg'
    }
  },
  template: `<div><span>{{name}} count: {{count}}</span><button v-if="showOp" @click="addCount">add count</button>
<button v-if="showOp" @click="modParent">mod perant and childs</button></div>`,
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
  inject: ['injectMsg', 'mysite'],
  template: `<div><span>{{name}}; {{injectMsg2}}</span>
            <span>site: country={{mysite.country}}; city={{mysite.city}}</span>
            <button @click="useParent">use perant provides</button></div>`,
  methods: {
    useParent: function () {
      this.injectMsg2 += this.injectMsg() + ' 哈哈'
      // this.$parent.modSiteCity()
      this.mysite.city = '杭州'
    }
  }
}
var localCompt7 = {
  props: {
    myMsg: {
      type: String,
      default: function () { return this.perantMsg() }
    }
  },
  data: function () {
    return {
      name: 'localCompt7',
      injectMsg2: 'injectMsg',
      inhirtMsg: this.perantMsg()
    }
  },
  inject: {perantMsg: {from: 'injectMsg', default: 'Inject'}},
  template: `<div><span>{{name}}; {{injectMsg2}}; {{inhirtMsg}}: {{myMsg}}</span>
            <button @click="useParent">use perant provides</button></div>`,
  methods: {
    useParent: function () {
      this.injectMsg2 += this.perantMsg() + ' 哈哈'
    }
  }
}

export default {
  name: 'basicSetter',
  data () {
    return {
      name: 'basicSetter',
      message: 'hello setter !',
      injectMsg: 'Inject basicSetter',
      tempsss: ['temps', 'temps', 'temps'],
      refCmpt5: 'RelCompt5',
      site: {
        country: 'China',
        city: 'shanghai'
      }
    }
  },
  components: {localCompt6, localCompt7},
  methods: {
    modChildCompName: function () {
      this.$refs['RelCompt5'].name += ' hello'
      this.$refs.RelCompt6.name += ' hello'
    },
    modCount: function (index) {
      this.$refs.temps[index].addCount()
    },
    getName: function () {
      return this.name + 'getName'
    },
    modName: function () {
      this.name += 'hahahahaha'
      return this.name
    },
    modSiteCity () {
      this.site.city = 'hangzhou'
    }
  },
  /* provide: {
    injectMsg: '蒋平'
  }, */
  provide: function () {
    return {
      injectMsg: this.modName,
      mysite: this.site
    }
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
