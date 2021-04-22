<template>
  <div class="CKEditor5">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "CKEditor5Classical",
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        language: "zh-cn",
        placeholder: "请输入内容...",
        height: 500,
/*         toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'Underline',
          'fontSize',
          'numberedList',
          'bulletedList',
          'blockQuote',
          '|',
          'alignment:left',
          'alignment:right',
          'alignment:center',
          'alignment:justify',
          '|',
          'imageUpload',
          'Link',
          '|',
          'undo', //撤销
          'redo',//重做
        ], */
        heading: {
          options: [
            { model: 'paragraph', title: '段落', class: 'ck-heading_paragraph' },
            { model: 'heading6', view: 'h6', title: '标题6', class: 'ck-heading_heading6' },
            { model: 'heading5', view: 'h5', title: '标题5', class: 'ck-heading_heading5' },
            { model: 'heading4', view: 'h4', title: '标题4', class: 'ck-heading_heading4' },
            { model: 'heading3', view: 'h3', title: '标题3', class: 'ck-heading_heading3' },
            { model: 'heading2', view: 'h2', title: '标题2', class: 'ck-heading_heading2' },
            { model: 'heading1', view: 'h1', title: '标题1', class: 'ck-heading_heading1' }
          ]
        },
      },
    };
  },
  components: {},
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
  padding: auto;
}
</style>
