<template>
    <div class="demo-item-group">
        <h1>{{message}}</h1>
    </div>
</template>
<script>
// import Vue from 'vue'
export default {
  name: 'basic-async-component',
  data: function () {
    return {
      message: 'hello async-component',
      comptIsNames: ['global-compt-keep-1', 'localComptKeep2', 'localComptKeep3',
        'localComptKeep4', 'localComptKeep5'],
      curComponentName: 'localComptKeep2',
      curIfName: 'globalCompt1'
    }
  }
}
</script>
<style lang="less" scoped>
  .demo-item-group {
    display: flex;
    padding: 10px 30px;
    flex-direction: column;
    h4 {
      color: #008000;
    }
    ul {
      list-style: none;
      display: flex;
      li {
        padding: 10px 20px;
        border-radius: 2px;
        &:hover {
          border: solid 1px #ccc;
          background-color: #f2f2f2;
          cursor: pointer;
        }
        &.active {
          background-color: #008000;
          color: #fff;
        }
      }
    }
    .fenge {
      width: 100%;
      height: 3px;
      margin-bottom: 3px;
      border-bottom: dashed 1px #999;
    }
  }
</style>
