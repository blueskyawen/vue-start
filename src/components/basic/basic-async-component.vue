<template>
    <div class="demo-item-group">
      <h1>v-if切换异步组件加载</h1>
      <div><vc-button @click="showCcc = !showCcc">切换</vc-button></div>
      <div>
        <async-webpack-example-c v-if="showCcc"></async-webpack-example-c>
      </div>
      <div class="fenge"></div>
      <h1>is动态组件加载异步组件</h1>
      <ul>
        <li v-for="item of comptIsNames" :key="item" @click="curComponentName = item"
            :class="{active: curComponentName === item}">{{item}}</li>
      </ul>
      <div>
        <component :is="curComponentName"></component>
      </div>
      <div class="fenge"></div>
      <h1>动态异步组件</h1>
      <div style="width: 700px;">
        <vc-form-group class="vc-from-group">
          <vc-form-label class="vc-from-label">组件名</vc-form-label>
          <vc-form-control class="vc-from-control">
            <vc-input v-model="path" placeholder="输入组件名" autocomplete="on" required></vc-input>
          </vc-form-control>
        </vc-form-group>
        <vc-form-group class="vc-from-group">
          <vc-form-label class="vc-from-label">是否KeepAlive</vc-form-label>
          <vc-form-control class="vc-from-control">
            <vc-switch :type="'min'" v-model="isKeepAlive"></vc-switch>
          </vc-form-control>
        </vc-form-group>
        <vc-form-group class="vc-from-group">
          <vc-form-label class="vc-from-label">是否Transition</vc-form-label>
          <vc-form-control class="vc-from-control">
            <vc-switch :type="'min'" v-model="isTransition"></vc-switch>
          </vc-form-control>
        </vc-form-group>
        <vc-form-group class="vc-from-group">
          <label class="vc-from-label"></label>
          <vc-form-control class="vc-from-control">
            <vc-button @click="loadComp">Load</vc-button>
          </vc-form-control>
        </vc-form-group>
      </div>
      <div>
        <vc-async-component :path="comptName" :timeout="timeoutLen" :keep-alive="isKeepAlive"
                            :transition="isTransition" :transition-class="asyncClass">
        </vc-async-component>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import asyncLoading from './componentss/async-loading-component.vue'
import asyncError from './componentss/async-error-component.vue'

Vue.component('async-webpack-example-c', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./componentss/async-component-c.vue'], resolve)
})
Vue.component(
  'async-webpack-example-d',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./componentss/async-component-d.vue')
)
const AsyncComponentA = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./componentss/async-component-a.js'),
  // 异步组件加载时使用的组件
  loading: asyncLoading,
  // 加载失败时使用的组件
  error: asyncError,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 15000
})

export default {
  name: 'basic-async-component',
  data: function () {
    return {
      showCcc: false,
      comptIsNames: ['async-webpack-example-c', 'async-webpack-example-d', 'aync-component-b',
        'aync-component-a'],
      curComponentName: 'global-compt-1',
      path: 'components/basic/componentss/async-component-c.vue',
      delayLen: 200,
      timeoutLen: 5000,
      comptName: 'components/basic/componentss/async-component-c.vue',
      isKeepAlive: false,
      isTransition: false,
      asyncClass: {
        enter: 'async-enter',
        enterActive: 'async-enter-active',
        enterTo: 'async-enter-to',
        leave: 'async-leave',
        leaveActive: 'async-leave-active',
        leaveTo: 'async-leave-to'
      }
    }
  },
  components: {
    'aync-component-b': () => import('./componentss/async-component-b.js'),
    'aync-component-a': AsyncComponentA
  },
  methods: {
    loadComp: function () {
      this.comptName = this.path
    }
  }
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
  .vc-from-group {
    width: 100%;
  }
  .vc-from-group .vc-from-label {
    width: 20%;
  }
  .vc-from-group .vc-from-control {
    width: 80%;
  }
  .async-enter,.async-leave-to {
    opacity: 0;
    margin-left: 100px;
  }
  .async-enter-to,.async-leave {
    opacity: 1;
    margin-left: 0;
  }
  .async-enter-active,.async-leave-active {
    transition: all 1s;
  }
</style>
