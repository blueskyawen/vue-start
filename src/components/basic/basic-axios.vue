<template>
  <div class="basicAxios">
    <div class="demo-item-group">
      <transition mode="out-in">
        <div v-if="isLoading">
          <vc-loading :size="'min'"></vc-loading> 等待中...
        </div>
        <div v-if="showSuccess" class="oper-success">操作成功，2s后消失!</div>
        <div v-if="showFail" class="oper-fail">操作失败，2s后消失!</div>
      </transition>
      <label>1. axios-get</label>
      <div class="demo-item">
        <vc-button @click="getVms">GetVms</vc-button>
      </div>
      <p>{{vms}}</p>
      <p style="color: red">{{errInfo}}</p>
      <div class="demo-item">
        name: <input v-model="addVmData.name" />
        <vc-button @click="addVm">AddVms</vc-button>
      </div>
      <div class="demo-item">
        id: <input v-model="delId" />
        <vc-button @click="delVm">DelVm</vc-button>
      </div>
      <div class="demo-item">
        id: <input v-model="viewId" />
        <vc-button @click="getOneVm">ViewDetail</vc-button>
      </div>
      <p>{{vmDetail}}</p>
      <div class="demo-item">
        id: <input v-model="editVmData.id" />
        name: <input v-model="editVmData.name" />
        <vc-button @click="modVm">ModVm</vc-button>
      </div>
    </div>
    <div class="demo-item-group">
      <label>2. axios-异步加载组件</label>
      <div class="demo-item">
        <async-webpack-example></async-webpack-example>
      </div>
      <!--div class="demo-item">
        <my-component></my-component>
      </div>-->
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
      errInfo: {},
      vms: [],
      url: 'users',
      delId: '1',
      viewId: '0',
      addVmData: {
        name: '',
        status: 'active'
      },
      vmDetail: {},
      editVmData: {
        id: '',
        name: ''
      },
      isLoading: false,
      showSuccess: false,
      showFail: false
    }
  },
  components: {
    'my-component': AsyncComponent
  },
  created: function () {
    Vue.axios.defaults.baseURL = 'http://106.75.245.131:443'
  },
  methods: {
    getVms: function () {
      this.isLoading = true
      this.axios.get('vms').then(response => {
        this.vms = response.data
        this.operSuccess()
      }).catch((error) => { // 请求失败处理
        this.errInfo = error
        this.operFail()
      }).finally(() => {
        this.isLoading = false
      })
    },
    addVm: function () {
      this.isLoading = true
      Vue.axios.post('vms/add', this.addVmData).then((response) => {
        // console.log(response.data)
        this.operSuccess()
        this.getVms()
      }).catch((error) => {
        this.errInfo = error
        this.operFail()
      }).finally(() => {
        this.isLoading = false
      })
    },
    delVm: function () {
      this.isLoading = true
      this.$http.delete(`vms/${this.delId}`).then((response) => {
        // console.log(response.data)
        this.operSuccess()
        this.getVms()
      }).catch((error) => {
        this.errInfo = error
        this.operFail()
      }).finally(() => {
        this.isLoading = false
      })
    },
    getOneVm: function () {
      this.isLoading = true
      this.axios({
        method: 'get',
        url: `vms/${this.viewId}`
      }).then((response) => {
        this.vmDetail = response.data
        this.operSuccess()
      }).catch((error) => {
        this.errInfo = error
        this.operFail()
      }).finally(() => {
        this.isLoading = false
      })
    },
    modVm: function () {
      this.isLoading = true
      this.$http.put(`vms/${this.editVmData.id}`, {name: this.editVmData.name}).then((response) => {
        // console.log(response.data)
        this.operSuccess()
        this.getVms()
      }).catch((error) => {
        this.errInfo = error
        this.operFail()
      }).finally(() => {
        this.isLoading = false
      })
    },
    operSuccess: function () {
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    },
    operFail: function () {
      this.showFail = true
      setTimeout(() => {
        this.showFail = false
      }, 2000)
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
  .oper-success {
    font-size: 14px;
    font-weight: bold;
    color: #3cc;
  }
  .oper-fail {
    font-size: 14px;
    font-weight: bold;
    color: red;
  }
  .v-enter {
    opacity: 0.5;
    margin-left: -20px;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
    margin-left: 0;
  }
  .v-leave-to {
    opacity: 0;
    margin-left: 20px;
  }
  .v-enter-active {
    transition: all 1s;
  }
</style>
