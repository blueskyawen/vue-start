<template>
  <div class="basic-slot">
    <div class="demo-item-group">
      <label>1. 插槽内容, 后备内容</label>
      <div class="demo-item">
        <localCompt1>
          <h3>I am 插槽内容</h3>
          <p>I have no use 后备内容</p>
        </localCompt1>
      </div>
      <div class="demo-item">
        <localCompt1></localCompt1>
      </div>
    </div>
    <div class="demo-item-group">
      <label>2. 具名插槽</label>
      <div class="demo-item">
        <local-compt-2>
          <template v-slot:slot1>
            <p>I am 内容 in slot1</p>
          </template>
          <p>2.6+最新实现方式</p>
          <p>I am 内容2 in default slot</p>
          <template v-slot:slot2>
            <p>I am 内容 in slot2</p>
          </template>
        </local-compt-2>
      </div>
      <div class="demo-item">
        <local-compt-2>
          <template slot="slot1">
            <p>I am 内容 in slot1</p>
          </template>
          <template slot="default">
            <p>老的实现方式</p>
            <p>I am 内容2 in default slot</p>
          </template>
          <template slot="slot2">
            <p>I am 内容 in slot2</p>
          </template>
        </local-compt-2>
      </div>
      <div class="demo-item">
        <local-compt-2>
          <template #slot1>
            <p>I am 内容 in slot1</p>
          </template>
          <template #default>
            <p>新方式的简写版</p>
            <p>I am 内容2 in default slot</p>
          </template>
          <template #slot2>
            <p>I am 内容 in slot2</p>
          </template>
        </local-compt-2>
      </div>
    </div>
    <div class="demo-item-group">
      <label>3. 动态插槽名</label>
      <div class="demo-item">
        <p>I am 内容1 in default slot</p>
        <p>I am 内容2 in default slot</p>
        <!--local-compt-2>
          <template v-slot:[slot1]>
            <p>I am 内容 in slot1</p>
          </template>
          <template v-slot:[slot2]>
            <p>I am 内容 in slot2</p>
          </template>
        </local-compt-2>-->
      </div>
    </div>
    <div class="demo-item-group">
      <label>4. 作用域插槽</label>
      <p>slot的实现实际上内部是函数调用function(option) {return ...组件待投影的内容}, 其中option即为可选的插槽prop, 加
        入在组件内slot绑定的是v-bind：aaa="value"，则option={aaa}，也就是template上得到的变量，比如v-slot:slot1="slotProp"中的slotProp</p>
      <div class="demo-item">
        <local-compt3>
          <template v-slot:slot1="slotProp">
            <p>{{title}}</p>
            <p>slot1: {{slotProp.msg}}, slotProp={prop}</p>
          </template>
          <template #default="{aha: Aha}">
            <p>2.6+新实现方式</p>
            <p>default: {{Aha}}, 结构变量重命名</p>
          </template>
          <template #slot2="{slotColor}">
            <p>slot2: 内容颜色, solt1: {{slotColor.color1}}; default: {{slotColor.color2}}; slot2: {{slotColor.color3}}</p>
          </template>
        </local-compt3>
      </div>
      <div class="demo-item">
        <local-compt3>
          <template slot="slot1" slot-scope="slotProp">
            <p>{{title}}</p>
            <p>slot1: {{slotProp.msg}}, slotProp={prop}</p>
          </template>
          <template slot-scope="{aha: Aha}">
            <p>老实现方式</p>
            <p>default: {{Aha}}, 结构变量重命名</p>
          </template>
          <template slot="slot2" slot-scope="{slotColor}">
            <p>slot2: 内容颜色, solt1: {{slotColor.color1}}; default: {{slotColor.color2}}; slot2: {{slotColor.color3}}</p>
          </template>
        </local-compt3>
      </div>
    </div>
    <div class="demo-item-group">
      <label>5. 独占默认插槽</label>
      <div class="demo-item">
        <local-compt3>
          <template #default="{aha: Aha}">
            <p>default: {{Aha}}, 结构变量重命名</p>
          </template>
        </local-compt3>
        <local-compt3 v-slot:default="{aha: Aha}">
          <p>default: {{Aha}}, 结构变量重命名</p>
        </local-compt3>
        <local-compt3 v-slot="{aha: Aha}">
          <p>default: {{Aha}}, 结构变量重命名</p>
        </local-compt3>
      </div>
    </div>
  </div>
</template>

<script>
var localCompt1 = {
  data () {
    return {
      name: '局部组件1',
      styleObj: {
        'color': '#ff9933'
      },
      title: 'hello 后备内容!'
    }
  },
  template: `<div><h3>{{name}}</h3>
             <div :style="styleObj"><slot>{{title}}</slot></div>
            </div>`
}
var localCompt2 = {
  data () {
    return {
      name: '局部组件2',
      styleObj: {
        color1: '#ff9933',
        color2: '#00e64d',
        color3: '#0059b3'
      },
      title: 'hello 后备内容!'
    }
  },
  template: `<div><h3>{{name}}</h3>
             <div :style="{color: styleObj.color1}"><slot name="slot1"></slot></div>
             <div :style="{color: styleObj.color2}"><slot></slot></div>
             <div :style="{color: styleObj.color3}"><slot name="slot2"></slot></div>
            </div>`
}
var localCompt3 = {
  data () {
    return {
      name: '局部组件3',
      info: {name: 'Jack', age: 18},
      message: 'i am local component3',
      aha: 'ahaha',
      styleObj: {
        color1: '#ff9933',
        color2: '#00e64d',
        color3: '#0059b3'
      }
    }
  },
  template: `<div><h3>{{name}}</h3>
             <div :style="{color: styleObj.color1}"><slot name="slot1" v-bind:msg="message"></slot></div>
             <div :style="{color: styleObj.color2}"><slot v-bind:aha="aha"></slot></div>
             <div :style="{color: styleObj.color3}"><slot name="slot2" v-bind:slotColor="styleObj"></slot></div>
            </div>`
}

export default {
  name: 'basic-slot',
  data: function () {
    return {
      message: 'hello slot',
      slot1: 'slot1',
      slot2: 'slot2',
      title: 'hello 作用域插槽 !'
    }
  },
  components: {localCompt1, localCompt2, localCompt3}
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
</style>
