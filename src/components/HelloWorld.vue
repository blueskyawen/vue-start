<template>
  <div class="hello">
    <div class="form-group">
      <label>{{hello.label}}</label>
      <div class="input-item">{{hello.text}}</div>
    </div>
    <div class="form-group">
      <label>{{htmlMsg.label}}</label>
      <div class="input-item"><span v-html="htmlMsg.text"></span></div>
    </div>
    <div class="form-group">
      <label>{{filterMsg.label}}</label>
      <div class="input-item" v-bind:class="{'active':active}">{{ filterMsg.text | capitalize1 | capitalize2}}</div>
      <button v-on:click="changeClass()">改变样式</button>
    </div>
    <div class="form-group">
      <label>{{ifshow.label}}</label>
      <div class="input-item" v-show="ifshow.flag">
        <input type="number" v-model="ifshow.num" />
      </div>
      <button @click="hideMag()">{{ifshow.title}}</button>
    </div>
    <div class="form-group" v-if="ifshow.num > 1">
      <label></label>
      <div class="input-item">{{'我是隐藏hide的元素' + '!!!'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      hello: {label: '欢迎语', text: 'Welcome to Vue.js'},
      htmlMsg: {label: 'Html插值', text: '<span style="color:blue">菜鸟教程</span>'},
      filterMsg: {label: '过滤器', text: 'Welcome'},
      active: false,
      ifshow: {label: '数字', flag: true, num: 5, title: '隐藏输入'},
      masValue: '请输入'
    }
  },
  methods: {
    changeClass: function () {
      this.active = !this.active
    },
    hideMag: function () {
      this.ifshow.flag = !this.ifshow.flag
      if (this.ifshow.flag) {
        this.ifshow.title = '隐藏输入'
      } else {
        this.ifshow.title = '显示输入'
      }
    }
  },
  filters: {
    capitalize1: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase() + '111'
    },
    capitalize2: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('').reverse().join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-group {
  width: 420px;
  margin: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.form-group label {
  width: 25%;
  margin-right: 20px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.form-group label:after {
  content: ":";
}
.form-group .input-item {
  width: 75%;
  color: #666;
  height: 32px;
  line-height: 32px;
}
.active {
  color: red !important;
  font-size: 18px;
  font-weight: 600;
}
</style>
