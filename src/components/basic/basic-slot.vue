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
          <p>I am 内容1 in default slot</p>
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
            <p>I am 内容1 in default slot</p>
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
            <p>I am 内容1 in default slot</p>
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
export default {
  name: 'basic-slot',
  data: function () {
    return {
      message: 'hello slot',
      slot1: 'slot1',
      slot2: 'slot2'
    }
  },
  components: {localCompt1, localCompt2}
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
