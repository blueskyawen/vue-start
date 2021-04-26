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
          <vue-tinymce-demo v-if="curTab === 'VueTinymce'"></vue-tinymce-demo>
          <vue-quil-editor-demo
            v-else-if="curTab === 'quill'"
            :mytitle="title"
          ></vue-quil-editor-demo>
          <tinymce-vue-demo v-if="curTab === 'TinymceVue'"></tinymce-vue-demo>
          <wang-editor-demo v-else-if="curTab === 'wangEditor'"></wang-editor-demo>
          <mavon-editor-demo
            v-else-if="curTab === 'mavonEditor'"
          ></mavon-editor-demo>
          <vue-markdown v-else-if="curTab === 'vueMarkdown'"></vue-markdown>
          <tinymce-vue-demo-adv v-if="curTab === 'TinymceVueDemoAdv'"></tinymce-vue-demo-adv>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import VueTuiEditorDemo from "./VueTuiEditorDemo.vue";
import mavonEditorDemo from "./mavonEditor.vue";
import VueQuilEditorDemo from "./vueQuilEditorDemo.vue";
import VueTinymceDemo from "./VueTinymceDemo.vue";
import TinymceVueDemo from "./TinymceVueDemo.vue";
import TinymceVueDemoAdv from "./TinymceVueDemoAdv.vue";
import WangEditorDemo from './WangEditorDemo.vue';
import vueMarkdown from './VueMarkdown.vue';

export default {
  name: "editor",
  data() {
    return {
      tabItems: [
        { label: "mavonEditor", value: "mavonEditor", selected: false },
        { label: "VueTuiEditor", value: "tui", selected: false },
        // { label: "VueTinymce", value: "VueTinymce", selected: false },
        { label: "TinymceVue", value: "TinymceVue", selected: false },
        { label: "wangEditor", value: "wangEditor", selected: false },
        { label: "vueQuillEditor", value: "quill", selected: false },
        // { label: "TinymceVuef付费高级特性", value: "TinymceVueDemoAdv", selected: false },
        // { label: "vueMarkdown", value: "vueMarkdown", selected: false },
      ],
      curTab: "mavonEditor",
    };
  },
  components: {
    VueTuiEditorDemo,
    mavonEditorDemo,
    VueQuilEditorDemo,
    VueTinymceDemo,
    TinymceVueDemo,
    WangEditorDemo,
    vueMarkdown,
    TinymceVueDemoAdv
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
.tabShow-enter-to,
.tabShow-leave {
  opacity: 1;
  margin-left: 0;
}
.tabShow-enter-active {
  transition: all 1s linear;
}
</style>
