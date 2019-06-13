<template>
  <div class="helloTemplate">
    <div class="form-group">
      <label class="for-input">编辑msg</label>
      <div class="input-item">
        <input v-model.trim="message" placeholder="编辑…" :disabled="disableInputMsg">
      </div>
      <span class="input-oper" @click="disableMsgInput">disable</span>
    </div>
    <div class="form-group">
      <label>msg</label>
      <div class="input-item">{{message}}</div>
    </div>
    <div class="form-group">
      <label>msg-v-once</label>
      <div class="input-item" v-once>{{message}}</div>
    </div>
    <div class="form-group">
      <label>msg-v-html</label>
      <div class="input-item" v-html="htmlMsg"><span>***</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'helloTemplate',
  data () {
    return {
      message: 'hello template',
      htmlMsg: '<span style="color:blue">菜鸟教程(会替换原子节点)</span>',
      disableInputMsg: false
    }
  },
  methods: {
    disableMsgInput: function () {
      this.disableInputMsg = !this.disableInputMsg;
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
  .form-group .input-item > span {
    float:left;
    margin-right: 10px;
  }
  .form-group .input-oper {
    color: #009973;
    cursor: pointer;
  }
</style>
