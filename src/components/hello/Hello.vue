<template>
  <div class="Hello">
    <div class="vc-tabs">
      <div class="vc-tab-items">
        <router-link class="vc-tab-item" v-for="tabItem in tabItems" :key="tabItem.value"
                     :to="tabItem.routeLink" active-class="tab-actived">
          {{tabItem.label}}</router-link>
      </div>
      <div class="vc-tab-content">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      tabItems: [
        {label: '模板', value: 'template', routeLink: 'template'},
        {label: '内置指令', value: 'innerDirective', routeLink: 'innerDirective'},
        {label: '样式绑定', value: 'styles', routeLink: 'styles'},
        {label: '表单', value: 'form', routeLink: 'form'},
        {label: '事件', value: 'event', routeLink: 'event'}
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .Hello {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .vc-tabs {
    width: 100%;
    .vc-tab-items {
      width: inherit;
      border-bottom: solid 1px #ccc;
      .vc-tab-item {
        display: inline-block;
        color: #666;
        font-size: 14px;
        padding: 15px 30px;
        text-decoration: none;
        &:hover {
          cursor: pointer;
          background: #f2f2f2;
        }
        &.tab-actived {
          border-bottom: solid 4px #00cc99;
          margin-bottom: -3px;
          color: #000;
        }
      }
    }
    .vc-tab-content {
      width: inherit;
      padding: 20px;
    }
  }
  .v-enter, .v-leave-to {
    opacity: 0;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
  }
  .v-enter-active, .v-leave-active {
    transition: all .6s linear;
  }
</style>
