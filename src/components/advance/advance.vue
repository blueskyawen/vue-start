<template>
  <div class="advance">
    <div class="vc-tabs">
      <div class="vc-tab-items">
        <div class="vc-tab-item" v-for="tabItem in tabItems" :key="tabItem.value"
             :class="{'tab-actived': tabItem.value === curTab}" @click="selectTab(tabItem)">
          {{tabItem.label}}</div>
      </div>
      <div class="vc-tab-content">
        <transition mode="in-out">
          <component v-bind:is="curCompt"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import componentd from './component'
import directived from './directive'
import filterd from './filter'
import heros from './heros/heros'

export default {
  name: 'advance',
  data () {
    return {
      tabItems: [
        {label: '基础组件设计', value: 'component', comp: 'componentd'},
        {label: '基础指令设计', value: 'directive', comp: 'directived'},
        {label: '基础过滤器设计', value: 'filter', comp: 'filterd'},
        {label: '英雄指南', value: 'heros', comp: 'heros'}
      ],
      curTab: 'component',
      curCompt: 'componentd'
    }
  },
  components: {componentd, directived, filterd, heros},
  methods: {
    selectTab: function (item) {
      this.curTab = item.value
      this.curCompt = item.comp
    }
  }
}
</script>

<style scoped>
  .advance {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .vc-tabs {
    width: 100%;
  }
  .vc-tabs .vc-tab-items {
    width: inherit;
    border-bottom: solid 1px #ccc;
  }
  .vc-tabs .vc-tab-items .vc-tab-item {
    display: inline-block;
    color: #666;
    font-size: 14px;
    padding: 15px 30px;
    text-decoration: none;
  }
  .vc-tabs .vc-tab-items .vc-tab-item:hover {
    cursor: pointer;
    background: #f2f2f2;
  }
  .vc-tabs .vc-tab-items .vc-tab-item.tab-actived {
    border-bottom: solid 4px #00cc99;
    margin-bottom: -3px;
    color: #000;
  }
  .vc-tabs .vc-tab-content {
    width: inherit;
    padding: 20px;
  }
  .v-enter-active, .v-leave-active {
    transition: opacity .5s ease;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
  }
</style>
