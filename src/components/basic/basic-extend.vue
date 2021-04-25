<template>
  <div class="basicExtend">
    <div class="form-group">
      <label>startMix</label>
      <div class="input-item">
        <button @click.stop="startMix()">startMix</button>
      </div>
    </div>
    <div class="form-group">
      <label>hello</label>
      <div class="input-item">
        <button @click.stop="hello()">hellos</button>
      </div>
    </div>
    <div class="form-group">
      <label>getMsg</label>
      <div class="input-item">
        <p>getMsg: {{getMsg}}</p>
        <p>getMsg2: {{getMsg2}}</p>
        <p>getMsg3: {{getMsg3}}</p>
        <p>getMsg4: {{getMsg4}}</p>
        <p>getMsg5: {{getMsg5}}</p>
      </div>
    </div>
    <div class="form-group">
      <label>Filter</label>
      <div class="input-item">
        <p>{{msg | capitalize2 | capitalize3 | globalFilter}}</p>
      </div>
    </div>
    <p>1. 当混入的是组件生命钩子函数时，如created，则混入对象和原组建生命钩子函数将合并成数组一起调用，调用顺序：全局混入 --> [实例混入1, -> 实例混入2] --> 组件</p>
    <p>2. data会递归合并，遇见同名属性时优先级顺序同created初始化调用方向相反，即：组件 > 实例混入2 > 实例混入1 > 全局混入 </p>
    <p>3. 值为对象的选项，例如 methods、computed, components, filters 和 directives，将被合并为同一个对象, 两个对象键名冲突时，优先级顺序同created初始化方向相反,同上</p>
    <p>4. 混入里面也可以嵌套混入，规则同上，最后在组件初始化时将层层"递归合并"</p>
    <p>5. watch对象也是合并成数组，触发顺序同钩子函数</p>
    <p>6. 对于数组类的选项也是采用合并为新数组的方式，顺序同created</p>
    <p>7. Vue对于每一类选项都有自己的混入策略和规则，如：Vue.config.optionMergeStrategies.methods，参考源码我们可以改变各个选项的合并策略，或者
    当我们为Vue实例增加了新的选项时，也可以自定义新选项的混入策略，比如：Vue.config.optionMergeStrategies.newOption = {自定义...} 或
      Vue.config.optionMergeStrategies.newOption = Vue.config.optionMergeStrategies.methods</p>
    <p>8. 全局混入按照声明顺序进行合并，后声明的覆盖先声明的，也就是 先-perant -> 后-child</p>
    <p>{{showData}}</p>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.filter('globalFilter', function (value) {
  if (!value) return ''
  return value + ' global'
})

Vue.mixin({
  data () {
    return {
      msg: '全局混入-msg',
      msg1: '全局混入1-msg-1',
      msg2: '全局混入1-msg-2',
      msg4: '全局混入1-msg4',
      msg5: '全局混入1-msg5',
      site: {
        name: '腾讯',
        url: 'www.tenant.com',
        hahaList: [3, 4],
        city: 'shenzhen'
      }
    }
  },
  created: function () {
    // console.log('全局混入1 --- created')
  },
  methods: {
    startMix: function () {
      // console.log('全局混入1 --- startMix')
    }
  },
  computed: {
    getMsg: function () {
      return 'getMsg 全局混入1!!'
    },
    getMsg2: function () {
      return 'getMsg2 全局混入1!!'
    },
    getMsg5: function () {
      return 'getMsg5 全局混入1!!'
    }
  }
})

Vue.mixin({
  data () {
    return {
      msg: '全局混入2-msg',
      msg1: '全局混入2-msg-1',
      msg4: '全局混入2-msg4',
      numList: [4, 5],
      site: {
        name: 'alibaba',
        hahaList: [3, 4],
        url: 'www.alibaba.com',
        people: 30000
      }
    }
  },
  created: function () {
    // console.log('全局混入2 --- created')
  },
  methods: {
    startMix: function () {
      // console.log('全局混入2 --- startMix')
    },
    hello: function () {
      // console.log('全局混入2 --- hello')
    }
  },
  computed: {
    getMsg: function () {
      return 'getMsg 全局混入2!!'
    },
    getMsg2: function () {
      return 'getMsg2 全局混入2!!'
    }
  }
})

var localMix3 = {
  data () {
    return {
      msg: '实例混入3',
      msg1: '实例混入3-msg1',
      msg2: '实例混入3-msg2',
      msg3: '实例混入3-msg3',
      site: {
        name: '淘宝111',
        url: 'www',
        country: 'China'
      }
    }
  },
  created: function () {
    // console.log('实例混入3 --- created')
  },
  methods: {
    startMix: function () {
      // console.log('实例混入3 --- startMix')
    },
    hello: function () {
      // console.log('实例混入3 --- hello')
    }
  },
  computed: {
    getMsg: function () {
      return 'getMsg 实例混入3!!'
    },
    getMsg2: function () {
      return 'getMsg2 实例混入3!!'
    },
    getMsg3: function () {
      return 'getMsg3 实例混入3!!'
    },
    getMsg4: function () {
      return 'getMsg4 实例混入3!!'
    }
  }
}
var localMix2 = {
  data () {
    return {
      msg: '实例混入2',
      msg1: '实例混入2-msg1',
      msg2: '实例混入2-msg2',
      site: {
        name: '淘宝',
        url: 'www.taobao.com',
        title: 'I am 淘宝'
      }
    }
  },
  created: function () {
    // console.log('实例混入2 --- created')
  },
  methods: {
    startMix: function () {
      // console.log('实例混入2 --- startMix')
    },
    hello: function () {
      // console.log('实例混入2 --- hello')
    }
  },
  computed: {
    getMsg: function () {
      return 'getMsg 实例混入2!!'
    },
    getMsg2: function () {
      return 'getMsg2 实例混入2!!'
    },
    getMsg3: function () {
      return 'getMsg3 实例混入2!!'
    }
  },
  filters: {
    capitalize3: function (value) {
      if (!value) return ''
      return value + ' local-filter1!!'
    }
  }
}
var localMix1 = {
  data () {
    return {
      msg: '实例混入1',
      msg1: '实例混入1-msg1',
      numList: [2, 3],
      site: {
        name: '淘宝',
        url: 'www.taobao.com',
        hahaList: [3, 4]
      }
    }
  },
  mixins: [localMix2],
  created: function () {
    // console.log('实例混入1 --- created')
  },
  methods: {
    startMix: function () {
      // console.log('实例混入1 --- startMix')
    },
    hello: function () {
      // console.log('实例混入1 --- hello')
    }
  },
  filters: {
    capitalize2: function (value) {
      if (!value) return ''
      return value + ' 实例混入1!!'
    }
  },
  computed: {
    getMsg: function () {
      return 'getMsg 实例混入1!!'
    },
    getMsg2: function () {
      return 'getMsg2 实例混入1!!'
    }
  }
}

export default {
  name: 'basicExtend',
  data () {
    return {
      msg: 'basicExtend',
      numList: [1, 2],
      site: {
        name: '百度',
        hahaList: [1, 2]
      }
    }
  },
  mixins: [localMix3, localMix1],
  created: function () {
    // console.log('basicExtend --- created')
  },
  methods: {
    startMix: function () {
      this.site.hahaList.push(999)
      this.site.title = '大娟'
      // console.log('basicExtend --- startMix')
    }
  },
  computed: {
    showData: function () {
      return JSON.stringify(this.$data)
    },
    getMsg: function () {
      return this.msg + ' !!!'
    }
  }
}
</script>

<style scoped>
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
  .form-group .input-item > button {
    background: #3cc;
    padding: 10px 30px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
