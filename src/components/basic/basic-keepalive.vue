<template>
  <div class="basic-keep-alive">
    <div class="demo-item-group">
      <h4>is切换</h4>
      <ul>
        <li v-for="item of comptIsNames" :key="item" @click="curComponentName = item"
            :class="{active: curComponentName === item}">{{item}}</li>
      </ul>
      <keep-alive :exclude="['localComptKeep2']" :max="3"
        :include="['localComptKeep3','global-compt-keep-1','localComptKeep2','localComptKeep4','localComptKeep5']">
        <component :is="curComponentName"></component>
      </keep-alive>
      <p>（1）默认全部缓存，即全部组件都在include里，一旦设置了include，则只缓存include里写的组件</p>
      <p>（2）exclude的优先级大于include，加入exclude的一律不缓存</p>
      <p>（3） max: 数字。最多可以缓存多少组件实例，一旦这个数字达到了，在下一个新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。以此类推</p>
      <p>（4）max优先级大于include</p>
      <div class="fenge"></div>
      <h4>v-if切换</h4>
      <ul>
        <li v-for="item of comptIfNames" :key="item.name" @click="curIfName = item.name"
            :class="{active: curIfName === item.name}">{{item.name}}</li>
      </ul>
      <keep-alive :max="2">
        <global-compt-keep-1 v-if="curIfName === 'globalCompt1'"></global-compt-keep-1>
        <localComptKeep2 v-else-if="curIfName === 'localCompt2'"></localComptKeep2>
        <localComptKeep3 v-else-if="curIfName === 'localCompt3'"></localComptKeep3>
        <localComptKeep4 v-else-if="curIfName === 'localCompt4'"></localComptKeep4>
        <localComptKeep5 v-else></localComptKeep5>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.component('global-compt-keep-1', {
  data: function () {
    return {
      tip: 'hello global-compt-keep-1'
    }
  },
  template: `<div><h3>global-component01</h3>
    <vc-input v-model="tip"></vc-input>
    <p>Compt--tip: {{tip}}</p></div>
  `,
  activated: function () {
    // console.log('activated == global-compt-keep-1')
  },
  deactivated: function () {
    // console.log('deactivated == global-compt-keep-1')
  }
})
var localComptKeep2 = {
  data: function () {
    return {
      tip: 'hello local-compt-keep-2'
    }
  },
  template: `<div><h3>local-component02</h3>
    <vc-input v-model="tip"></vc-input>
    <p>Compt--tip: {{tip}}</p></div>
  `
}
var localComptKeep3 = {
  data: function () {
    return {
      tip: 'hello local-compt-keep-3'
    }
  },
  template: `<div></h3><h3>local-component03</h3>
    <vc-input v-model="tip"></vc-input>
    <p>Compt--tip: {{tip}}</p></div>
  `
}
var localComptKeep4 = {
  data: function () {
    return {
      tip: 'hello local-compt-keep-4'
    }
  },
  template: `<div><h3>local-component04</h3>
    <vc-input v-model="tip"></vc-input>
    <p>Compt--tip: {{tip}}</p></div>
  `
}
var localComptKeep5 = {
  data: function () {
    return {
      tip: 'hello local-compt-keep-5'
    }
  },
  template: `<div><h3>local-component05</h3>
    <vc-input v-model="tip"></vc-input>
    <p>Compt--tip: {{tip}}</p></div>
  `
}

export default {
  name: 'basic-keep-alive',
  data: function () {
    return {
      message: 'hello keep-alive',
      comptIsNames: ['global-compt-keep-1', 'localComptKeep2', 'localComptKeep3',
        'localComptKeep4', 'localComptKeep5'],
      curComponentName: 'localComptKeep2',
      comptIfNames: [{name: 'globalCompt1', value: 'global-compt-keep-1'},
        {name: 'localCompt2', value: 'localComptKeep2'},
        {name: 'localCompt3', value: 'localComptKeep3'},
        {name: 'localCompt4', value: 'localComptKeep4'},
        {name: 'localCompt45', value: 'localComptKeep5'}],
      curIfName: 'globalCompt1'
    }
  },
  components: {localComptKeep2, localComptKeep3, localComptKeep4, localComptKeep5}
}
</script>
<style lang="less" scoped>
  .demo-item-group {
    display: flex;
    padding: 10px 30px;
    flex-direction: column;
    h4 {
      color: #008000;
    }
    ul {
      list-style: none;
      display: flex;
      li {
        padding: 10px 20px;
        border-radius: 2px;
        &:hover {
          border: solid 1px #ccc;
          background-color: #f2f2f2;
          cursor: pointer;
        }
        &.active {
          background-color: #008000;
          color: #fff;
        }
      }
    }
    .fenge {
      width: 100%;
      height: 3px;
      margin-bottom: 3px;
      border-bottom: dashed 1px #999;
    }
  }
</style>
