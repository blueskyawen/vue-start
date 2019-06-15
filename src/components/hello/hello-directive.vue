<template>
  <div class="helloDirective">
    <div class="form-group">
      <label class="for-input">Num</label>
      <div class="input-item" v-show="showNumInput">
        <input type="number" v-model.number="num">
      </div>
      <span class="input-oper" @click.self="showNum">showNumInput</span>
    </div>
    <div class="form-group">
      <label>display</label>
      <div class="input-item"  v-if="num < 0">{{'数字: ' + numTexts[0]}}</div>
      <div class="input-item"  v-else-if="num > 0 && num < 5">{{'数字: ' + numTexts[1]}}</div>
      <div class="input-item"  v-else-if="num > 5 && num < 10">{{'数字: ' + numTexts[2]}}</div>
      <div class="input-item"  v-else-if="num > 10">{{'数字: ' + numTexts[3]}}</div>
      <div class="input-item"  v-else>{{'数字: others'}}</div>
    </div>
    <div class="form-group">
      <label class="for-input">v-for-array</label>
      <div class="input-item">
        <span v-for="num in numList" :key="num.value">{{num.value}}</span>
      </div>
      <span class="input-oper" @click.stop="addNumlist">add</span>
      <span class="input-oper" @click.stop="delNumlist">delete</span>
    </div>
    <div class="form-group">
      <label>v-for-object</label>
      <div class="text-items">
        <div v-for="(value, key, index) in site" :key="index">
          No.{{index}}  {{key}} : {{value}}
        </div>
      </div>
      <span class="input-oper" @click.capture="addObjectAtrr">addAtrr</span>
      <span class="input-oper" @click.capture="delObjectAtrr">deleteAtrr</span>
    </div>
    <div class="form-group">
      <label>v-for-Num</label>
      <div class="input-item">
        <span v-for="num2 in num" :key="num2">{{num2}}</span>
      </div>
    </div>
    <div class="form-group">
      <label class="for-input">Watch price</label>
      <div class="input-item">{{price}}</div>
    </div>
    <div class="form-group">
      <label class="for-input">v-if管理复元素-nokey</label>
      <div class="text-items">
        <div v-if="showUseName">
          <span>Usernam</span>
          <input placeholder="Enter username" />
        </div>
        <div v-else>
          <span>Email</span>
          <input placeholder="Enter Email" />
        </div>
      </div>
      <span class="input-oper" @click.capture="switchInput">SwitchInput</span>
    </div>
    <div class="form-group">
      <label class="for-input">v-if管理复元素-haskey</label>
      <div class="text-items">
        <div v-if="showUseName2">
          <span>Username</span>
          <input placeholder="Enter username" key="usename" />
        </div>
        <div v-else>
          <span>Email</span>
          <input placeholder="Enter Email" key="email" />
        </div>
      </div>
      <span class="input-oper" @click.capture="showUseName2 = !showUseName2">SwitchInput</span>
    </div>
  </div>
</template>

<script>
var siteData = {
  name: '菜鸟教程',
  url: 'http://www.runoob.com',
  slogan: '学的不仅是技术, 更是梦想！'
}

export default {
  name: 'helloDirective',
  data () {
    return {
      num: 6,
      numTexts: ['number < 0', '0 < number < 5', '5 < number < 10', 'number > 10'],
      showNumInput: true,
      numList: [ { value: 16 }, { value: 45 }, { value: 12 } ],
      site: siteData,
      price: 6 * 2300,
      showUseName: true,
      showUseName2: true
    }
  },
  methods: {
    showNum: function () {
      this.showNumInput = !this.showNumInput
    },
    getRandomNum: function () {
      return Math.round(Math.random() * 100)
    },
    addNumlist: function () {
      this.numList.push({value: this.getRandomNum()})
    },
    delNumlist: function () {
      this.numList.pop()
    },
    addObjectAtrr: function () {
      var key = 'new' + this.getRandomNum()
      this.$set(siteData, key, '没有关联的 DOM 元素')
    },
    delObjectAtrr: function () {
      this.$delete(siteData, 'url')
      // console.log(this)
    },
    switchInput: function () {
      this.showUseName = !this.showUseName
    }
  },
  watch: {
    num: function () {
      this.price = this.num * 2300
    },
    numList: function () {
      console.log('addNumlist')
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
    margin-right: 10px;
  }
  .form-group > .text-items {
    width: 75%;
    color: #666;
    line-height: 26px;
    display: flex;
    flex-direction: column;
  }
</style>
