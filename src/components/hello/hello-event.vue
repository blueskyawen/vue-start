<template>
  <div class="hello-event">
    <div class="form-group">
      <label>clickBtn</label>
      <div class="input-item">
        <button @click.prevent="clickBtn">clickBtn</button>
        <button @click.prevent="clickBtn2(message, $event)">clickBtn2(message, $event)</button>
        <button @click.once="clickBtn2(message, $event)">@click.once</button>
        <button @click.shift="clickBtn2(message, $event)">@click.shift</button>
        <button @keyup.enter="clickBtn2(message, $event)">@keyup.enter</button>
        <button @click.exact="clickBtn2(message, $event)">@click.exact</button>
      </div>
    </div>
    <div class="form-group">
      <label>keyup.enter</label>
      <div class="input-item">
        <input class="d-width" @keyup.enter="KeyupBtin('enter', $event)" v-model="keyMsg.enter">
      </div>
    </div>
    <div class="form-group">
      <label>keyup.67</label>
      <div class="input-item">
        <input class="d-width" @keyup.67="KeyupBtin('c', $event)" v-model="keyMsg.c">
      </div>
    </div>
    <div class="form-group">
      <label>自定义按键修饰符别名</label>
      <div class="input-item">
        <input class="d-width" @keyup.f1="KeyupBtin('awen', $event)" v-model="keyMsg.awen">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.config.keyCodes = {
  v: 86,
  f1: 67,
  awen: 67,
  up: [38, 87]
}

export default {
  name: 'hello-event',
  data () {
    return {
      message: 'hello event',
      keyMsg: {
        enter: '',
        c: '',
        awen: ''
      }
    }
  },
  methods: {
    clickBtn: function (event) {
      if (event) {
        alert(event.target.tagName)
      }
    },
    clickBtn2: function (message, event) {
      alert(event.target.tagName + ' : ' + message)
    },
    KeyupBtin: function (type, event) {
      alert(event.target.tagName + ': type = ' + type + '; value = ' + this.keyMsg[type])
    }
  }
}
</script>

<style scoped>
  .form-group {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .form-group > label {
    width: 150px;
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
  .form-group .input-item > input.d-width {
    width:420px;
    height: 32px;
    margin-right: 15px;
  }
  .form-group .input-item > textarea {
    width:90%;
    height: 80px;
    max-height: 130px;
    min-width: 150px;
  }
  .form-group .input-item > span {
    float:left;
    margin-right: 10px;
  }
  .form-group .input-item > button {
    background: #3cc;
    padding: 10px 30px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .form-group .input-oper {
    color: #009973;
    cursor: pointer;
    margin-right: 10px;
  }
</style>
