<template>
  <div class="filter">
    <div class="demo-item-group">
      <h4>1. vcUppercase</h4>
      <div class="demo-item">{{message | vcLowercase}}</div>
      <div class="fenge"></div>
      <h4>2. vcUppercase</h4>
      <div class="demo-item">{{message | vcUppercase}}</div>
      <div class="fenge"></div>
      <h4>3. vcKeyValue</h4>
      <div class="demo-item">{{site | vcKeyValue}}</div>
      <div class="fenge"></div>
      <h4>4. vcSlice</h4>
      <div class="demo-item">{{message | vcSlice(2)}}</div>
      <div class="demo-item">{{message | vcSlice(2, 12)}}</div>
      <div class="demo-item">{{itemss | vcSlice(2, 6)}}</div>
      <div class="fenge"></div>
      <h4>5. vcPercent</h4>
      <div class="demo-item">{{num1 | vcPercent}}</div>
      <div class="demo-item">{{num1 | vcPercent(3)}}</div>
      <div class="fenge"></div>
      <h4>6. vcJson</h4>
      <div class="demo-item">{{site | vcJson}}</div>
      <div class="demo-item">{{site | vcJson(4)}}</div>
      <div class="demo-item">{{site | vcJson('####')}}</div>
      <div class="fenge"></div>
      <h4>7. vcDate</h4>
      <div class="demo-item">{{date | vcDate}}</div>
      <div class="fenge"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter',
  data: function () {
    return {
      message: 'Hello Vue Filter !',
      site: { name: '菜鸟教程', url: 'http://www.runoob.com' },
      itemss: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      num1: 0.3142309621,
      date: new Date()
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
    font-size: 18px;
  }
  .fenge {
    width: 100%;
    height: 3px;
    margin-bottom: 3px;
    border-bottom: dashed 1px #999;
  }
  h4 {
    color: #008000;
  }
</style>
