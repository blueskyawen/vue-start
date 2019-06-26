<template>
  <div class="directive">
    <div class="demo-item-group">
      <label class="hasMao">自定义属性指令</label>
    </div>
    <h4>Rate Bar</h4>
    <div class="form-group">
      <label class="for-input">num</label>
      <div class="input-item">
        <input type="number" v-model.number="num" min="0" max="100" step="10" />
      </div>
    </div>
    <div class="form-group">
      <label></label>
      <div class="input-item">
        <div class="bar-container" v-trans-bar="num">
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <h4>Rate Bar(width transtition)</h4>
    <div class="form-group">
      <label class="for-input">num2</label>
      <div class="input-item">
        <input type="number" v-model.number="num2" min="0" max="100" step="10" />
      </div>
    </div>
    <div class="form-group">
      <label></label>
      <div class="input-item">
        <div class="bar-container" v-trans-bar:[defaultColor].transit="num2">
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <div class="demo-item-group">
      <label class="hasMao">仿结构指令</label>
    </div>
    <div class="form-group">
      <label class="for-input">num3-RegExp('^\d{5,}$')</label>
      <div class="input-item">
        <input type="number" v-model.number="num3" step="1000" />
      </div>
    </div>
    <div class="form-group">
      <label></label>
      <div class="input-item" v-reg-if="showCheck">
        <div class="bar-container" v-trans-bar.transit="num2">
          <div class="bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.directive('transBar', {
  inserted: function (el, binding) {
    let elBar = el.getElementsByClassName('bar')[0]
    if (binding.modifiers.transit) {
      elBar.style.transition = 'all 1s'
    }
    const colors = ['#adebeb', '#009933', '#0099ff', '#ff8000', '#ff4d4d']
    elBar.style.backgroundColor = binding.modifiers.arg ? binding.modifiers.arg : '#ccc'
    if (binding.value && !isNaN(binding.value)) {
      let rateNum = +binding.value
      if (rateNum >= 0 && rateNum <= 20) {
        elBar.style.backgroundColor = colors[0]
        elBar.style.width = rateNum + '%'
      } else if (rateNum > 20 && rateNum <= 40) {
        elBar.style.backgroundColor = colors[1]
        elBar.style.width = rateNum + '%'
      } else if (rateNum > 40 && rateNum <= 60) {
        elBar.style.backgroundColor = colors[2]
        elBar.style.width = rateNum + '%'
      } else if (rateNum > 60 && rateNum <= 80) {
        elBar.style.backgroundColor = colors[3]
        elBar.style.width = rateNum + '%'
      } else if (rateNum > 80 && rateNum <= 100) {
        elBar.style.backgroundColor = colors[4]
        elBar.style.width = rateNum + '%'
        if (rateNum === 100) {
          elBar.style.borderRadius = '4px'
        }
      } else {
        elBar.style.backgroundColor = '#ccc'
        elBar.style.width = '0'
      }
    }
  },
  update: function (el, binding) {
    let elBar = el.getElementsByClassName('bar')[0]
    if (binding.oldValue !== binding.value) {
      const colors = ['#adebeb', '#009933', '#0099ff', '#ff8000', '#ff4d4d']
      if (binding.value && !isNaN(binding.value)) {
        let rateNum = +binding.value
        if (rateNum >= 0 && rateNum <= 20) {
          elBar.style.backgroundColor = colors[0]
          elBar.style.width = rateNum + '%'
        } else if (rateNum > 20 && rateNum <= 40) {
          elBar.style.backgroundColor = colors[1]
          elBar.style.width = rateNum + '%'
        } else if (rateNum > 40 && rateNum <= 60) {
          elBar.style.backgroundColor = colors[2]
          elBar.style.width = rateNum + '%'
        } else if (rateNum > 60 && rateNum <= 80) {
          elBar.style.backgroundColor = colors[3]
          elBar.style.width = rateNum + '%'
        } else if (rateNum > 80 && rateNum <= 100) {
          elBar.style.backgroundColor = colors[4]
          elBar.style.width = rateNum + '%'
          if (rateNum === 100) {
            elBar.style.borderRadius = '4px'
          }
        } else {
          elBar.style.backgroundColor = '#ccc'
          elBar.style.width = '0'
        }
      }
    }
  }
})

export default {
  name: 'directive',
  data () {
    return {
      num: 10,
      num2: 30,
      num3: 240,
      defaultColor: '#ccc',
      regObj: new RegExp('^\\d{5,}$')
    }
  },
  computed: {
    showCheck: function () {
      return {
        reg: this.regObj,
        value: this.num3
      }
    }
  }
}
</script>

<style scoped>
  .demo-item-group {
    display: flex;
    margin: 10px 30px;
    flex-direction: column;
  }
  .demo-item-group > label {
    font-size: 24px;
    color: #000080;
    margin-bottom: 5px;
  }
  .demo-item-group > label.hasMao {
    font-weight: 600;
  }
  .demo-item-group > label.hasMao:after {
    content: ":";
  }
  .demo-item-group > .demo-item {
    width: inherit;
    margin-top: 5px;
  }
  .demo-item .fenge {
    width: 100%;
    height: 3px;
    margin-bottom: 3px;
    border-bottom: dashed 1px #999;
  }
  .demo-item-group button {
    background: #3cc;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
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
  h4 {
    color: #008000;
  }
  .bar-container {
    width: 100%;
    height: 24px;
    border: solid 1px #e6e6e6;
    border-radius: 4px;
    position: relative;
  }
  .bar-container .bar {
    height: 100%;
    background-color: #ccc;
    position: absolute;
    border-radius: 4px 0 0 4px;
    width: 0;
  }
</style>
