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
          <Tinymce v-if="curTab === 'Tinymce'"></Tinymce>
          <Tinymce v-else-if="curTab === 'quill'" :mytitle="title"></Tinymce>
          <Tinymce v-else-if="curTab === 'wangEditor'"></Tinymce>
          <Tinymce v-else-if="curTab === 'mavonEditor'"></Tinymce>
          <Tinymce v-else-if="curTab === 'UEditor'"></Tinymce>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Tinymce from './Tinymce.vue'
export default {
  name: "editor",
  data () {
    return {
      tabItems: [
        {label: 'Tinymce', value: 'Tinymce', selected: false},
        {label: 'quill', value: 'quill', selected: false},
        {label: 'wangEditor', value: 'wangEditor', selected: false},
        {label: 'mavonEditor', value: 'mavonEditor', selected: false},
        {label: 'UEditor', value: 'UEditor', selected: false},
      ],
      curTab: 'Tinymce',
    }
  },
  components: {
    Tinymce
  },
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
    color: #000;
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
