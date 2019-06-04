<template>
  <div class="hello">
    <div class="form-group">
      <label>{{hello.label}}</label>
      <div class="input-item" :class="[classList[0], num > 0 ? classList[1] : '']">{{hello.text}}</div>
    </div>
    <div class="form-group">
      <label>{{htmlMsg.label}}</label>
      <div class="input-item">
        <span v-html="htmlMsg.text"></span>
      </div>
    </div>
    <div class="form-group">
      <label>{{filterMsg.label}}</label>
      <span class="input-item" v-bind:class="{'active':active}">{{ filterMsg.text | capitalize1 | capitalize2}}</span>
      <button v-on:click="changeClass()">改变样式</button>
    </div>
    <div class="form-group">
      <label>{{ifshow.label}}</label>
      <span class="input-item" v-show="ifshow.flag">
        <input :style="[baseStyles, num > 5 ? overridingStyles : {}]" type="number" v-model="num" />
      </span>
      <button @click="hideMag()">{{ifshow.title}}</button>
    </div>
    <div class="form-group">
      <div class="input-lint"  v-if="num < 0">{{'数字: ' + ifshow.texts[0]}}</div>
      <div class="input-lint"  v-else-if="num > 0 && num < 5">{{'数字: ' + ifshow.texts[1]}}</div>
      <div class="input-lint"  v-else-if="num > 5 && num < 10">{{'数字: ' + ifshow.texts[2]}}</div>
      <div class="input-lint"  v-else-if="num > 10">{{'数字: ' + ifshow.texts[3]}}</div>
      <div class="input-lint"  v-else>{{'数字: others'}}</div>
      <div class="input-lint" v-if="showNumList" :class="classObj">
        <span v-for="num2 in num" :key="num2">{{num2}}</span>
      </div>
    </div>
    <div class="form-group">
      <label>computed</label>
      <span class="input-item" :style="styleObj">{{site}}</span>
      <button @click="setterMag()">Setter</button>
    </div>
    <div class="form-group">
      <label>For-text</label>
      <span class="input-item">
        <ul>
          <li v-for="site in sites" :key="site.name">{{site.name}}</li>
        </ul>
        <ul>
          <li v-for="(value, key, index) in hello" :key="value">{{index}}***{{key}}: {{value}}</li>
        </ul>
      </span>
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
      ifshow: {
        label: '数字',
        flag: true,
        num: 5,
        title: '隐藏输入',
        texts: ['number < 0', '0 < number < 5', '5 < number < 10', 'number > 10']
      },
      num: 5,
      showNumList: true,
      masValue: '请输入',
      sites: [
        { name: 'Runoob' },
        { name: 'Google' },
        { name: 'Taobao' }
      ],
      sitezz: {name: 'Google', url: 'http://www.google.com'},
      classList: ['classNum1', 'classNum2'],
      baseStyles: {
        color: 'green',
        fontSize: '20px'
      },
      overridingStyles: {
        'font-weight': 'bold',
        backgroundColor: 'yellow',
        'padding-left': '10px'
      }
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
    },
    setterMag: function () {
      this.site = 'Baidu##www.baidu.com'
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
  },
  computed: {
    site: {
      get: function () {
        return this.sitezz.name + '##' + this.sitezz.url
      },
      set: function (newValue) {
        var names = newValue.split('##')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    },
    classObj: {
      get: function () {
        return {
          classNum1: this.num < 0,
          'classNum2': this.num > 0,
          classNum3: this.num > 5,
          classNum4: this.num > 10
        }
      }
    },
    styleObj: {
      get: function () {
        return {
          'color': this.num > 0 ? 'red' : 'blue'
        }
      }
    }
  },
  watch: {
    num: function (val) {
      this.showNumList = false
      setTimeout(() => { this.showNumList = true }, 1000)
      this.sites.push({ name: 'Alibaba' })
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
.form-group .input-item input {
  height: 100%;
  width:90%;
}
.form-group .input-lint {
  height: 32px;
  line-height: 32px;
  margin:5px 0 5px 100px;
}
.active {
  color: red !important;
  font-size: 18px;
  font-weight: 600;
}
button {
  width: 120px;
  height:32px;
}
.classNum1 {
  color: red !important;
}
.classNum2 {
  font-size: 20px;
  font-weight: 600;
  background-color: antiquewhite;
}
.classNum3 {
  color: green;
}
.classNum4 {
  color: blue;
}
</style>
