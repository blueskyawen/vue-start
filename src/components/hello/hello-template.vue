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
    <div class="form-group">
      <label>msg-reverse</label>
      <div class="input-item">{{helloMsg}}</div>
      <span class="input-oper" v-on:click="reverseMsg">reverseMsg</span>
    </div>
    <div class="form-group">
      <label>过滤器-pipe</label>
      <div class="input-item">{{helloMsg | capitalize | capitalize2('2.5.1')}}</div>
    </div>
    <div class="form-group">
      <label>计算属性getter/setter</label>
      <div class="input-item">{{siteMsg}}</div>
      <span class="input-oper" @click="setSiteMsg">setter</span>
    </div>
    <div class="form-group">
      <label>计算属性</label>
      <div class="input-item">{{message}}</div>
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
      disableInputMsg: false,
      helloMsg: 'hello vue',
      site: { name: '菜鸟教程', url: 'http://www.runoob.com' },
      sitess: ['阿里巴巴##http://www.alibaba.com', '百度##http://www.baidu.com']
    }
  },
  methods: {
    disableMsgInput: function () {
      this.disableInputMsg = !this.disableInputMsg
    },
    reverseMsg: function () {
      this.helloMsg = this.helloMsg.split('').reverse().join('')
    },
    setSiteMsg: function () {
      var tmpindex = Math.random() * 10 > 5 ? 0 : 1
      this.siteMsg = this.sitess[tmpindex]
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      var tmpvalues = value.toString().split(' ').map(function (item) {
        return item.charAt(0).toUpperCase() + item.slice(1)
      })
      return tmpvalues.join(' ')
    },
    capitalize2: function (value, version) {
      if (!value) return ''
      return value + version + ' !!'
    }
  },
  computed: {
    siteMsg: {
      get: function () {
        return this.site.name + '##' + this.site.url
      },
      set: function (value) {
        var names = value.split('##')
        this.site.name = names[0]
        this.site.url = names[1]
      }
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
