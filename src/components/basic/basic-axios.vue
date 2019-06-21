<template>
  <div class="basicAxios">
    <div class="demo-item-group">
      <label>1. axios-get</label>
      <div class="demo-item">
        <button @click.stop="getHttp()">Get</button>
      </div>
      <p>{{rspInfo}}</p>
      <p style="color: red">{{errInfo}}</p>
    </div>
    <div class="demo-item-group">
      <label>2. axios-异步加载组件</label>
      <div class="demo-item">
        <async-webpack-example></async-webpack-example>
      </div>
      <div class="demo-item">
        <my-component></my-component>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import basicAnimate from './basic-animate'
import basicExtend from './basic-extend'

Vue.component(
  'async-webpack-example',
  () => import('./basic-setter')
)
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./basic-setter'),
  // 异步组件加载时使用的组件
  loading: basicAnimate,
  // 加载失败时使用的组件
  error: basicExtend,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 3000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 10000
})

export default {
  name: 'basicAxios',
  data () {
    return {
      rspInfo: {},
      errInfo: {}
    }
  },
  components: {
    'my-component': AsyncComponent
  },
  methods: {
    getHttp: function () {
      this.axios
        .get('data01.json')
        .then(response => (this.dataInfo = response))
        .catch((error) => { // 请求失败处理
          this.errInfo = error
        })
      /* Vue.axios.get(api).then((response) => {
        console.log(response.data)
      })

      this.axios.get(api).then((response) => {
        console.log(response.data)
      })

      this.$http.get(api).then((response) => {
        console.log(response.data)
      }) */
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
  button {
    background: #3cc;
    padding: 10px 30px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
  }
</style>
