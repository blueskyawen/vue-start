<template>
  <div class="Basic">
    <div class="vc-tabs">
      <div class="vc-tab-items">
        <div
          class="vc-tab-item"
          v-for="tabItem in tabItems"
          :key="tabItem.value"
          :class="{ 'tab-actived': tabItem.value === curTab }"
          @click="selectTab(tabItem.value)"
        >
          {{ tabItem.label }}
        </div>
      </div>
      <div class="vc-tab-content">
        <transition
          name="tabShow"
          appear
          appear-class="tabShow-enter"
          appear-to-class="tabShow-enter-to"
          appear-active-class="tabShow-enter-active"
        >
          <vue-tui-editor-demo v-if="curTab === 'tui'"></vue-tui-editor-demo>
          <mavon-editor-demo
            v-else-if="curTab === 'mavonEditor'"
          ></mavon-editor-demo>
          <vue-markdown v-else-if="curTab === 'vueMarkdown'"></vue-markdown>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import VueTuiEditorDemo from "./VueTuiEditorDemo.vue";
import mavonEditorDemo from "./mavonEditor.vue";
import vueMarkdown from './VueMarkdown.vue';

export default {
  name: "editor",
  data() {
    return {
      tabItems: [
        { label: "mavonEditor", value: "mavonEditor", selected: false },
        { label: "VueTuiEditor", value: "tui", selected: false },
        // { label: "vueMarkdown", value: "vueMarkdown", selected: false },
      ],
      curTab: "mavonEditor",
    };
  },
  components: {
    VueTuiEditorDemo,
    mavonEditorDemo,
    vueMarkdown,
  },
  methods: {
    selectTab: function (value) {
      this.curTab = value;
    },
  },
};
</script>

<style scoped>
.Basic {
  width: 100%;
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
}
.tabShow-leave-to {
  opacity: 0;
}
.tabShow-enter-to,
.tabShow-leave {
  opacity: 1;
}
.tabShow-enter-active {
  transition: all 1s linear;
}
</style>
