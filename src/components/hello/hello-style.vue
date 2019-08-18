<template>
  <div class="helloStyle">
    <div class="form-group">
      <label class="for-input">Num01</label>
      <div class="input-item">
        <input type="number" v-model.number="num1">
      </div>
    </div>
    <div class="form-group">
      <label class="for-input">Num02</label>
      <div class="input-item">
        <input type="number" v-model.number="num2">
      </div>
    </div>
    <div class="form-group">
      <label>class-bind</label>
      <div class="text-items">
        <div :class="'textClass1 textClass2'">{{classText[0]}}</div>
        <div :class="['textClass1']">{{classText[0]}}</div>
        <div :class="{textClass1: num1 > 5, 'textClass2': num2 > 10}">{{classText[0]}}只适合切换式的绑定</div>
        <div :class="classObj">{{classText[1]}}</div>
        <div :class="['textClass2', num1 > 6 ? 'textClass3' : '']">{{classText[2]}}使用变量或常量加引号</div>
        <div :class="[baseClass.class2, { textClass3: num1 > 8} ]">{{classText[2]}}数组对象成员里必须使用class常量</div>
      </div>
    </div>
    <div class="form-group">
      <label>style-bind</label>
      <div class="text-items" :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
        <div :style="{color: 'red'}">{{styleText[0]}}适合直接书写内联</div>
        <div :style="{color: baseStyle.color, 'background-color': baseStyle.bgColor, fontSize: num2 > 10 ? baseStyle.sizez + 'px' : '14px'}">{{styleText[0]}}</div>
        <div :style="styleObj">{{styleText[1]}}</div>
        <div :style="[baseStyles3, num1 > 6 ? baseStyles2 : {}, num2 > 10 ? baseStyles1 : {}]">{{styleText[2]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'helloStyle',
  data () {
    return {
      num1: 3,
      num2: 8,
      classText: ['class 属性绑定 - object', 'class 属性绑定 - computed', 'class 属性绑定 - Array'],
      styleText: ['style 属性绑定 - object', 'style 属性绑定 - computed', 'style 属性绑定 - Array'],
      baseStyle: {
        color: '#2eb8b8',
        bgColor: '#ffffcc',
        sizez: 20
      },
      baseStyles1: {
        color: 'green',
        fontSize: '30px'
      },
      baseStyles2: {
        'font-weight': 'bold'
      },
      baseStyles3: {
        backgroundColor: '#ccffff'
      },
      baseClass: {
        class1: 'textClass1',
        class2: 'textClass2',
        class3: 'textClass3'
      }
    }
  },
  computed: {
    classObj: {
      get: function () {
        return {textClass1: this.num1 > 3, textClass2: this.num2 > 8}
      }
    },
    styleObj: function () {
      return {'color': 'red', fontSize: this.num2 > 12 ? '30px' : '14px'}
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
  .textClass1 {
    color: red !important;
  }
  .textClass2 {
    font-size: 20px;
    font-weight: 600;
    background-color: antiquewhite;
  }
  .textClass3 {
    color: green !important;
  }
</style>
