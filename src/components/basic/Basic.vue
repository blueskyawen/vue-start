<template>
  <div class="Basic">
    <div class="vc-tabs">
      <div class="vc-tab-items">
        <div class="vc-tab-item" v-for="tabItem in tabItems" :key="tabItem.value"
             :class="{'tab-actived': tabItem.value === curTab}" @click="selectTab(tabItem.value)">
          {{tabItem.label}}</div>
      </div>
      <div class="vc-tab-content">
        <transition name="tabShow" appear appear-class="tabShow-enter"
                    appear-to-class="tabShow-enter-to"
                    appear-active-class="tabShow-enter-active">
          <basicDirective v-if="curTab === 'directiveComp'"></basicDirective>
          <basicAnimate v-else-if="curTab === 'animate'"></basicAnimate>
          <basicExtend v-else-if="curTab === 'extend'"></basicExtend>
          <basicSetter v-else-if="curTab === 'dynmacDetect'"></basicSetter>
          <basicAxios v-else-if="curTab === 'axios'"></basicAxios>
          <div v-else>Not Found</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import basicDirective from './basic-directive'
import basicAnimate from './basic-animate'
import basicExtend from './basic-extend'
import basicSetter from './basic-setter'
import basicAxios from './basic-axios'

export default {
  name: 'Basic',
  data () {
    return {
      tabItems: [
        {label: '指令组件', value: 'directiveComp', selected: false},
        {label: '过渡&动画', value: 'animate', selected: false},
        {label: '混入', value: 'extend', selected: false},
        {label: '动态检测', value: 'dynmacDetect', selected: false},
        {label: 'Axios', value: 'axios', selected: false}
      ],
      curTab: 'directiveComp'
    }
  },
  components: { basicDirective, basicAnimate, basicExtend, basicSetter, basicAxios },
  beforeCreate: function () {
    console.log('Basic ===== beforeCreate')
  },
  created: function () {
    console.log('Basic ===== created')
  },
  beforeMount: function () {
    console.log('Basic ===== beforeMount')
  },
  mounted: function () {
    console.log('Basic ===== mounted')
    this.$nextTick(function () {
      console.log('all components mounted')
    })
  },
  beforeUpdate: function () {
    console.log('Basic ===== beforeUpdate')
  },
  updated: function () {
    console.log('Basic ===== updated')
    this.$nextTick(function () {
      console.log('all components updated')
    })
  },
  beforeDestroy: function () {
    console.log('Basic ===== beforeDestroy')
  },
  destroyed: function () {
    console.log('Basic ===== destroyed')
  },
  methods: {
    selectTab: function (value) {
      this.curTab = value
    }
  },
  computed: {
    isShowTab: function () {
      return this.curTab === 'animate'
    }
  }
}
</script>

<style scoped>
  .Basic {
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
  }
  .vc-tabs .vc-tab-content {
    width: inherit;
    padding: 20px;
  }
  .tabShow-enter {
    opacity: 0;
    margin-left: -100px;
  }
  .tabShow-leave-to {
    opacity: 0;
    margin-left: 200px;
  }
  .tabShow-enter-to, .tabShow-leave {
    opacity: 1;
    margin-left: 0;
  }
  .tabShow-enter-active {
    transition: all 1s linear;
  }
</style>
