<template>
  <div class="CKEditor5">
<!--     <ckeditor
      style="border: solid 1px #f2f2f2"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @ready="onReady"
    ></ckeditor> -->
  </div>
</template>

<script>
// import DecoupledEditor from "./AAA";
export default {
  name: "CKEditor5Doc",
  data() {
    return {
      // editor: DecoupledEditor,
      editorData: "",
      editorConfig: {
        language: "zh-cn",
        placeholder: "请输入内容...",
      },
    };
  },
  components: {},
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
  },
  destroyed() {
    this.editor.ui.getEditableElement().parentElement.empty();
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style>
.CKEditor5 {
  width: 100%;
  height: 500px;
}
.ck-editor__editable_inline {
  height: 500px !important;
}
ul {
  padding: auto !important;
}
</style>
