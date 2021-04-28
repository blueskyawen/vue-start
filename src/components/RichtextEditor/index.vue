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
          <ckeditor-5-classical v-if="curTab === 'classical'"></ckeditor-5-classical>
          <ckeditor-5-doc v-if="curTab === 'doc'"></ckeditor-5-doc>
          <ckeditor-5-doc-2 v-if="curTab === 'doc2'"></ckeditor-5-doc-2>
          <vue-tinymce-demo v-if="curTab === 'VueTinymce'"></vue-tinymce-demo>
          <vue-quil-editor-demo
            v-else-if="curTab === 'quill'"
            :mytitle="title"
          ></vue-quil-editor-demo>
          <tinymce-vue-demo v-if="curTab === 'TinymceVue'"></tinymce-vue-demo>
          <wang-editor-demo v-else-if="curTab === 'wangEditor'"></wang-editor-demo>
          <tinymce-vue-demo-adv v-if="curTab === 'TinymceVueDemoAdv'"></tinymce-vue-demo-adv>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor5Classical from './CKEditor5Classical.vue'
import CKEditor5Doc from './CKEditor5Doc.vue'
import CKEditor5Doc2 from './CKEditor5Doc2.vue'
import VueQuilEditorDemo from "../MarkdownEditor/vueQuilEditorDemo.vue";
import VueTinymceDemo from "../MarkdownEditor/VueTinymceDemo.vue";
import TinymceVueDemo from "../MarkdownEditor/TinymceVueDemo.vue";
import TinymceVueDemoAdv from "../MarkdownEditor/TinymceVueDemoAdv.vue";
import WangEditorDemo from '../MarkdownEditor/WangEditorDemo.vue';
export default {
  name: "ckeditor5",
  data() {
    return {
      tabItems: [
        { label: "文档模式(ckeditor5)", value: "doc2", selected: false },
        // { label: "文档模式2(ckeditor5)", value: "doc", selected: false },
        // { label: "VueTinymce", value: "VueTinymce", selected: false },
        { label: "TinymceVue", value: "TinymceVue", selected: false },
        { label: "wangEditor", value: "wangEditor", selected: false },
        { label: "vueQuillEditor", value: "quill", selected: false },
        { label: "经典模式(ckeditor5)", value: "classical", selected: false },
        // { label: "TinymceVue付费高级特性", value: "TinymceVueDemoAdv", selected: false },
      ],
      curTab: "doc2",
    };
  },
  components: {
    'ckeditor-5-classical': CKEditor5Classical,
    'ckeditor-5-doc': CKEditor5Doc,
    'ckeditor-5-doc-2': CKEditor5Doc2,
    VueQuilEditorDemo,
    VueTinymceDemo,
    TinymceVueDemo,
    WangEditorDemo,
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
